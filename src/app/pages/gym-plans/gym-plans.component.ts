import { Component, effect, OnInit } from '@angular/core';
import { AuthState } from '../../shared/states/auth.state';
import { GymPlanState } from '../../shared/states/gym-plan.state';
import { GymPlanService } from '../../shared/services/gym-plan.service';
import { GymPlanSimple } from '../../shared/models/gym-plan.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gym-plans',
  imports: [CommonModule, RouterModule],
  templateUrl: './gym-plans.component.html',
  styleUrls: ['./gym-plans.component.css']
})
export class GymPlansComponent implements OnInit {

  userId = '';
  gymPlans: GymPlanSimple[] = [];
  selectedPlan: GymPlanSimple | null = null;

  constructor(
    private authState: AuthState,
    private gymPlanState: GymPlanState,
    private gymPlanService: GymPlanService
  ) {
    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
        this.fetchGymPlans();
      }
    });

    effect(() => {
      this.gymPlans = this.gymPlanState.gymPlans();
    });
  }

  ngOnInit(): void { }

  fetchGymPlans() {
    this.gymPlanService.getUsersGymPlans(this.userId).subscribe({
      next: (res: any) => {
        this.gymPlanState.setGymPlans(res.gymPlans);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deletePlan() {
    if (!this.selectedPlan) return;
    this.gymPlanService.deleteGymPlan(this.userId, this.selectedPlan.id).subscribe({
      next: () => {
        this.gymPlanState.removeGymPlan(this.selectedPlan!.id);
        this.selectedPlan = null;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  editPlan(plan: GymPlanSimple) {
    console.log('Edit', plan.id);
    // Example: this.router.navigate(['/gym-plans/edit', plan.id]);
  }
}
