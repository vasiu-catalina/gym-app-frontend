import { computed, Injectable, signal } from '@angular/core';
import { WorkoutLog, WorkoutLogPreview } from '../models/workout-log.model';
import { Day } from '../models/gym-plan.model';

@Injectable({ providedIn: 'root' })
export class WorkoutLogState {
    private _workoutLog = signal<WorkoutLog | null>(null);
    private _workoutLogs = signal<WorkoutLogPreview[]>([]);
    private _selectedGymDay = signal<Day | null>(null);

    readonly workoutLog = computed(() => this._workoutLog());
    readonly workoutLogs = computed(() => this._workoutLogs());
    readonly selectedGymDay = computed(() => this._selectedGymDay());

    setWorkoutLog(log: WorkoutLog) {
        this._workoutLog.set(log);
    }

    setWorkoutLogs(logs: WorkoutLogPreview[]) {
        this._workoutLogs.set(logs);
    }

    clearWorkoutLog() {
        this._workoutLog.set(null);
    }

    clearWorkoutLogs() {
        this._workoutLogs.set([]);
    }

    setGymDay(day: Day) {
        this._selectedGymDay.set(day);
    }

    clearGymDay() {
        this._selectedGymDay.set(null);
    }

    setWorkoutLogDay(day: Day) {
        this.setGymDay(day);
    }

    addWorkoutLog(log: WorkoutLogPreview) {
        this._workoutLogs.set([...this._workoutLogs(), log]);
    }

    updateWorkoutLog(updatedLog: WorkoutLogPreview) {
        this._workoutLogs.set(
            this._workoutLogs().map(log => log.id === updatedLog.id ? updatedLog : log)
        );
    }

    removeWorkoutLog(logId: string) {
        this._workoutLogs.set(
            this._workoutLogs().filter(log => log.id !== logId)
        );
    }
}
