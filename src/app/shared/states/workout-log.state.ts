import { Injectable, signal } from '@angular/core';
import { WorkoutLog } from '../models/workout-log.model';

@Injectable({ providedIn: 'root' })
export class WorkoutLogState {
    private _workoutLog = signal<WorkoutLog | null>(null);

    setWorkoutLog(log: WorkoutLog) {
        this._workoutLog.set(log);
    }

    getWorkoutLog(): WorkoutLog | null {
        return this._workoutLog();
    }

    clearWorkoutLog() {
        this._workoutLog.set(null);
    }
}
