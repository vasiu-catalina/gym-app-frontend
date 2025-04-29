import { Injectable, signal } from '@angular/core';
import { GymPlan } from '../models/gym-plan.model';

@Injectable({ providedIn: 'root' })
export class GymPlanState {
    private _gymPlan = signal<GymPlan | null>(null);

    setGymPlan(plan: GymPlan) {
        this._gymPlan.set(plan);
    }

    getGymPlan(): GymPlan | null {
        return this._gymPlan();
    }

    clearGymPlan() {
        this._gymPlan.set(null);
    }
}
