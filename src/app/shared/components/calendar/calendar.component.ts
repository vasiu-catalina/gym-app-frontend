import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  currentDate = signal(new Date());
  daysInMonth = signal<Date[]>([]);
  selectedDate = signal<Date | null>(null);

  constructor() {
    this.generateCalendar();
  }

  generateCalendar() {
    const days: Date[] = [];
    const firstDay = new Date(
      this.currentDate().getFullYear(),
      this.currentDate().getMonth(),
      1
    );
    while (firstDay.getMonth() === this.currentDate().getMonth()) {
      days.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
    }
    this.daysInMonth.set(days);
  }

  selectDate(date: Date) {
    this.selectedDate.set(date);
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
}
