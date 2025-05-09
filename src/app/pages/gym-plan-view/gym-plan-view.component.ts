import { Component, effect, OnInit } from '@angular/core';
import { GymPlanState } from '../../shared/states/gym-plan.state';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Day, GymPlan } from '../../shared/models/gym-plan.model';
import { GymPlanService } from '../../shared/services/gym-plan.service';
import { AuthState } from '../../shared/states/auth.state';
import { CommonModule } from '@angular/common';
import { WorkoutLogState } from '../../shared/states/workout-log.state';

@Component({
  selector: 'app-gym-plan-view',
  imports: [CommonModule, RouterModule],
  templateUrl: './gym-plan-view.component.html',
  styleUrl: './gym-plan-view.component.css'
})
export class GymPlanViewComponent {

  userId = '';
  planId = '';
  gymPlan: GymPlan | null = null;

  constructor(private gymPlanState: GymPlanState,
    private authState: AuthState,
    private route: ActivatedRoute,
    private router: Router,
    private gymPlanService: GymPlanService,
    private workoutLogState: WorkoutLogState) {

    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
        this.planId = this.route.snapshot.paramMap.get('id') || '';
        if (this.planId) {
          this.fetchGymPlan();
        }
      }
    })

    effect(() => {
      this.gymPlan = this.gymPlanState.gymPlan();
      console.log(this.gymPlan);
    })
  }



  fetchGymPlan() {
    this.gymPlanService.getGymPlan(this.userId, this.planId).subscribe({
      next: (res) => {
        this.gymPlanState.setGymPlan(res.gymPlan);
      },
      error: (err) => {
        this.gymPlanState.clearGymPlan();
        console.log(err);
      }
    })
  }

  deletePlan() {
    this.gymPlanService.deleteGymPlan(this.userId, this.gymPlan!.id).subscribe({
      next: () => {
        this.gymPlanState.removeGymPlan(this.gymPlan!.id);
        this.router.navigate(['/gym-plans']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  logDay(day: Day) {
    this.workoutLogState.setGymDay(day);
    this.router.navigate([`/gym-plans/${this.gymPlan!.id}/workout-logs/create`]);
  }
}
