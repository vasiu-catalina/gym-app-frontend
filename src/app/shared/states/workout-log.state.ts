import { computed, Injectable, signal } from '@angular/core';
import { WorkoutLog } from '../models/workout-log.model';
import { Day } from '../models/gym-plan.model';

@Injectable({ providedIn: 'root' })
export class WorkoutLogState {
    private _workoutLog = signal<WorkoutLog | null>(null);
    private _selectedGymDay = signal<Day | null>(null);

    readonly workoutLog = computed(() => this._workoutLog());
    readonly selectedGymDay = computed(() => this._selectedGymDay());

    setWorkoutLog(log: WorkoutLog) {
        this._workoutLog.set(log);
    }

    clearWorkoutLog() {
        this._workoutLog.set(null);
    }


    setGymDay(day: Day) {
        this._selectedGymDay.set(day);
    }

    clearGymDay() {
        this._selectedGymDay.set(null);
    }
}
