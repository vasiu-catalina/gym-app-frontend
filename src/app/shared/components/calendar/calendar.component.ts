import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutLogState } from '../../states/workout-log.state';
import { WorkoutLogService } from '../../services/workout-log.service';
import { WorkoutLog, WorkoutLogPreview } from '../../models/workout-log.model';
import { AuthState } from '../../states/auth.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  workoutLogs: WorkoutLogPreview[] = [];
  currentDate = signal(new Date());
  daysInMonth = signal<Date[]>([]);
  selectedDate = signal<Date | null>(null);

  selectedWorkoutLog: WorkoutLogPreview | null = null;

  constructor(
    private authState: AuthState,
    private workoutlogState: WorkoutLogState,
    private workoutLogService: WorkoutLogService,) {

    effect(() => {
      if (this.authState.isLoggedIn()) {
        this.workoutLogs = this.workoutlogState.workoutLogs();
      }
    })
    this.generateCalendar();
  }

  generateCalendar() {
    const days: Date[] = [];
    const firstDay = new Date(this.currentDate().getFullYear(), this.currentDate().getMonth(), 1);
    const dayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

    const emptyCells = (dayOfWeek + 6) % 7; // Shift so Monday is index 0, Sunday is 6

    // Fill in empty placeholders
    for (let i = 0; i < emptyCells; i++) {
      days.push(null as any); // placeholder for alignment
    }

    // Fill in actual days
    const date = new Date(firstDay);
    while (date.getMonth() === this.currentDate().getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    this.daysInMonth.set(days);
  }


  selectDate(date: Date) {
    this.selectedDate.set(date);

    this.getWorkoutLog();
  }

  prevMonth() {
    const d = new Date(this.currentDate());
    d.setMonth(d.getMonth() - 1);
    this.currentDate.set(d);
    this.generateCalendar();
  }

  nextMonth() {
    const d = new Date(this.currentDate());
    d.setMonth(d.getMonth() + 1);
    this.currentDate.set(d);
    this.generateCalendar();
  }



  getWorkoutLog() {
    const selected = this.selectedDate();
    if (!selected) return;
    this.selectedWorkoutLog = this.isWorkoutLogForDate(selected)
  }


  isWorkoutLogForDate(date: Date): WorkoutLogPreview | null {
    for (let w of this.workoutLogs) {
      const logDate = new Date(w.date);

      const isSameDate =
        date.getFullYear() === logDate.getFullYear() &&
        date.getMonth() === logDate.getMonth() &&
        date.getDate() === logDate.getDate();

      if (isSameDate) {
        return w;
      }
    }

    return null;
  }


  isPast(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

}
