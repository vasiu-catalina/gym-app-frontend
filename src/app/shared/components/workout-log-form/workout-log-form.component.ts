import { Component, effect } from '@angular/core';
import { WorkoutLogState } from '../../states/workout-log.state';
import { Day } from '../../models/gym-plan.model';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthState } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { WorkoutLog } from '../../models/workout-log.model';
import { WorkoutLogService } from '../../services/workout-log.service';

@Component({
    selector: 'app-workout-log-form',
    standalone: true,
    templateUrl: './workout-log-form.component.html',
    styleUrl: './workout-log-form.component.css',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class WorkoutLogFormComponent {
    gymDay: Day | null = null;
    form!: FormGroup;
    userId = '';

    isEditMode = false;
    logId: string | null = null;
    existingWorkout: WorkoutLog | null = null;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private workoutLogState: WorkoutLogState,
        private authState: AuthState,
        private workoutLogService: WorkoutLogService,
        private route: ActivatedRoute
    ) {
        effect(() => {
            if (this.authState.isLoggedIn()) {
                this.userId = this.authState.getUserId() || '';
            }
        });

        effect(() => {
            this.logId = this.route.snapshot.paramMap.get('id');
            if (this.logId) {
                this.isEditMode = true;
                this.workoutLogService.getLog(this.userId, this.logId).subscribe({
                    next: (res: any) => {
                        this.existingWorkout = res.workoutLog;
                        this.setByExistingWorkout();
                    },
                    error: (err) => {
                        console.error('Failed to fetch workout log:', err);
                        this.router.navigate(['/workout-logs']);
                    }
                });
            } else {
                this.setByGymDay();
            }
        });
    }

    setByGymDay() {
        const gymDay = this.workoutLogState.selectedGymDay();

        if (!gymDay) {
            this.router.navigate(['/gym-plans']);
            return;
        }

        this.gymDay = gymDay;

        this.form = this.fb.group({
            name: [gymDay.name],
            description: [gymDay.description],
            date: [new Date()],
            exercises: this.fb.array(
                gymDay.exercises.map((ex) =>
                    this.fb.group({
                        name: [ex.name],
                        sets: this.fb.array(
                            Array.from({ length: ex.nrSets }, (_, i) =>
                                this.fb.group({
                                    setNr: [i + 1],
                                    nrReps: [ex.nrReps],
                                    weight: [0],
                                    duration: [ex.duration],
                                    completed: [false],
                                })
                            )
                        ),
                    })
                )
            ),
        });
    }

    setByExistingWorkout() {
        const workout = this.existingWorkout!;
        this.form = this.fb.group({
            name: [workout.name],
            description: [workout.description],
            date: [new Date(workout.date)],
            exercises: this.fb.array(
                workout.exercises.map((ex) =>
                    this.fb.group({
                        name: [ex.name],
                        sets: this.fb.array(
                            ex.sets.map((set, i) =>
                                this.fb.group({
                                    setNr: [i + 1],
                                    nrReps: [set.nrReps],
                                    weight: [set.weight],
                                    duration: [set.duration],
                                    completed: [set.completed],
                                })
                            )
                        ),
                    })
                )
            ),
        });
    }

    get exercises(): FormArray {
        return this.form.get('exercises') as FormArray;
    }

    getSets(exIndex: number): FormArray {
        return this.exercises.at(exIndex).get('sets') as FormArray;
    }

    addSet(exIndex: number) {
        const sets = this.getSets(exIndex);
        sets.push(
            this.fb.group({
                setNr: [sets.length + 1],
                nrReps: [0],
                weight: [0],
                duration: [0],
                completed: [false],
            })
        );
    }

    removeSet(exIndex: number, setIndex: number) {
        const sets = this.getSets(exIndex);
        if (sets.length > 1) sets.removeAt(setIndex);
    }

    getSetsForExercise(name: string): FormGroup[] {
        return this.exercises.controls.filter(
            (ctrl) => ctrl.get('name')?.value === name
        ) as FormGroup[];
    }

    submitForm() {
        const raw = this.form.value;

        const workoutLog: Omit<WorkoutLog, 'id' | 'user'> = {
            name: raw.name,
            description: raw.description,
            duration: raw.exercises.reduce((sum: number, ex: any) => {
                return (
                    sum +
                    ex.sets.reduce((setSum: number, set: any) => setSum + (set.duration || 0), 0)
                );
            }, 0),
            date: raw.date,
            exercises: raw.exercises,
        };

        if (this.isEditMode && this.logId) {
            this.workoutLogService.updateLog(this.userId, this.logId, workoutLog).subscribe({
                next: (res) => {
                    console.log('Updated:', res);
                    this.router.navigate(['/workout-logs']);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            this.workoutLogService.createLog(this.userId, workoutLog).subscribe({
                next: (res) => {
                    console.log('Created:', res);
                    this.router.navigate(['/gym-plans']);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }



    deleteWorkoutLog() {
        if (!this.isEditMode || !this.logId) return;

        this.workoutLogService.deleteLog(this.userId, this.logId).subscribe({
            next: () => {
                console.log('Workout log deleted');
                this.router.navigate(['/workout-logs']);
            },
            error: err => {
                console.error('Failed to delete workout log:', err);
            }
        });
    }

}
