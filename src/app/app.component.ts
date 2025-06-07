import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OffcanvasComponent } from "./shared/components/offcanvas/offcanvas.component";
import { AuthState } from './shared/states/auth.state';
import { UserState } from './shared/states/user.state';
import { UserService } from './shared/services/user.service';
import { GymPlanService } from './shared/services/gym-plan.service';
import { GymPlanState } from './shared/states/gym-plan.state';
import { WorkoutLogState } from './shared/states/workout-log.state';
import { WorkoutLogService } from './shared/services/workout-log.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, OffcanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gym-app-frontend';
  userId = '';

  constructor(private authState: AuthState,
    private userState: UserState,
    private userService: UserService,
    private gymPlanState: GymPlanState,
    private gymPlanService: GymPlanService,
    private workoutlogState: WorkoutLogState,
    private workoutLogService: WorkoutLogService,
  ) {

    effect(() => {

      if (this.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';

        this.fetchUser();
        this.fetchLogs();
        this.fetchGymPlans();
      }
    })
  }

  isLoggedIn() {
    return this.authState.isLoggedIn();
  }


  fetchUser() {
    this.userService.getUser(this.userId).subscribe({
      next: (res) => {
        this.userState.setUser(res.user);
        console.log(res.user)
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

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

  fetchLogs() {
    this.workoutLogService.getLogs(this.userId).subscribe({
      next: (res: any) => {
        this.workoutlogState.setWorkoutLogs(res.workoutLogs);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
