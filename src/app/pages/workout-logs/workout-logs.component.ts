import { Component, effect } from '@angular/core';
import { AuthState } from '../../shared/states/auth.state';
import { WorkoutLogService } from '../../shared/services/workout-log.service';
import { WorkoutLogState } from '../../shared/states/workout-log.state';
import { WorkoutLog, WorkoutLogPreview } from '../../shared/models/workout-log.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-workout-logs',
  imports: [CommonModule, RouterModule],
  templateUrl: './workout-logs.component.html',
  styleUrl: './workout-logs.component.css'
})
export class WorkoutLogsComponent {

  userId = '';
  workoutLogs: WorkoutLogPreview[] = [];
  selectedLogIdToDelete: string | null = null;

  constructor(private authState: AuthState,
    private workoutlogState: WorkoutLogState,
    private workoutLogService: WorkoutLogService,
    private router: Router
  ) {
    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.userId = this.authState.getUserId() || '';
      }
    })

    effect(() => {
      this.workoutLogs = this.workoutlogState.workoutLogs();
    })
  }


  selectLogToDelete(logId: string) {
    this.selectedLogIdToDelete = logId;
  }

  confirmDelete() {
    if (!this.selectedLogIdToDelete) return;

    this.workoutLogService.deleteLog(this.userId, this.selectedLogIdToDelete).subscribe({
      next: () => {
        this.workoutLogs = this.workoutLogs.filter(log => log.id !== this.selectedLogIdToDelete);
        this.selectedLogIdToDelete = null;
      },
      error: err => {
        console.error('Delete failed', err);
      }
    });
  }

  updateLog(logId: string) {
    this.router.navigate(['/workout-logs', logId, 'update']);
    console.log('Update clicked for', logId);
  }

}
