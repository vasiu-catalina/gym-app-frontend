import { Component } from '@angular/core';
import { CalendarComponent } from "../../shared/components/calendar/calendar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CalendarComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
