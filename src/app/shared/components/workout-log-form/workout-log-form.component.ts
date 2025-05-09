import { Component, effect } from '@angular/core';
import { WorkoutLogState } from '../../states/workout-log.state';
import { Day } from '../../models/gym-plan.model';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthState } from '../../states/auth.state';
import { CommonModule } from '@angular/common';
import { WorkoutLog } from '../../models/workout-log.model';
import { WorkoutLogService } from '../../services/workout-log.service';

@Component({
    selector: 'app-workout-log-form',
    standalone: true,
    templateUrl: './workout-log-form.component.html',
    styleUrl: './workout-log-form.component.css',
    imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class WorkoutLogFormComponent {

    gymDay: Day | null = null;
    form!: FormGroup;
    userId = '';

    constructor(private router: Router,
        private fb: FormBuilder,
        private workoutLogState: WorkoutLogState,
        private authState: AuthState,
        private workoutLogService: WorkoutLogService
    ) {

        effect(() => {
            if (this.authState.isLoggedIn()) {
                this.userId = this.authState.getUserId() || '';
            }
        });

        effect(() => {

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
                    gymDay.exercises.map(ex =>
                        this.fb.group({
                            name: [ex.name],
                            sets: this.fb.array(
                                Array.from({ length: ex.nrSets }, (_, i) => this.fb.group({
                                    setNr: [i + 1],
                                    nrReps: [ex.nrReps],
                                    weight: [0],
                                    duration: [ex.duration],
                                    completed: [false]
                                }))
                            )
                        })
                    )
                )
            })
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
        sets.push(this.fb.group({
            setNr: [sets.length + 1],
            nrReps: [0],
            weight: [0],
            duration: [0]
        }));
    }

    removeSet(exIndex: number, setIndex: number) {
        const sets = this.getSets(exIndex);
        if (sets.length > 1) sets.removeAt(setIndex);
    }

    getSetsForExercise(name: string): FormGroup[] {
        return this.exercises.controls
            .filter(ctrl => ctrl.get('name')?.value === name) as FormGroup[];
    }

    submitForm() {
        const raw = this.form.value;

        const workoutLog: Omit<WorkoutLog, 'id' | 'user'> = {
            name: raw.name,
            description: raw.description,
            duration: raw.exercises.reduce((sum: number, ex: any) => sum + ex.duration, 0),
            date: raw.date,
            exercises: raw.exercises
        };

        console.log('WorkoutLog:', workoutLog);

        this.workoutLogService.createLog(this.userId, workoutLog).subscribe({
            next: (res) => {
                console.log(res);
                this.router.navigate(['/gym-plans']);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}
