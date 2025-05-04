import { computed, Injectable, signal } from '@angular/core';
import { GymPlan, GymPlanSimple } from '../models/gym-plan.model';

@Injectable({ providedIn: 'root' })
export class GymPlanState {
    private _gymPlan = signal<GymPlan | null>(null);
    private _gymPlans = signal<GymPlanSimple[]>([]);

    readonly gymPlan = computed(() => this._gymPlan());
    readonly gymPlans = computed(() => this._gymPlans());

    setGymPlan(plan: GymPlan) {
        this._gymPlan.set(plan);
    }

    setGymPlans(plans: GymPlanSimple[]) {
        this._gymPlans.set(plans);
    }

    clearGymPlan() {
        this._gymPlan.set(null);
    }

    clearGymPlans() {
        this._gymPlans.set([]);
    }

    /** Add a new plan */
    addGymPlan(plan: GymPlanSimple) {
        const current = this._gymPlans();
        this._gymPlans.set([...current, plan]);
    }

    /** Remove a plan by ID */
    removeGymPlan(id: string) {
        const filtered = this._gymPlans().filter(p => p.id !== id);
        this._gymPlans.set(filtered);
    }

    /** Update an existing plan by ID */
    updateGymPlan(updatedPlan: GymPlanSimple) {
        const updated = this._gymPlans().map(p =>
            p.id === updatedPlan.id ? updatedPlan : p
        );
        this._gymPlans.set(updated);
    }
}
