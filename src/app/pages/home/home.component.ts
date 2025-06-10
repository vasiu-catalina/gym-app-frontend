import { Component } from '@angular/core';
import { CalendarComponent } from "../../shared/components/calendar/calendar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MeasurementChartComponent } from "../../shared/components/measurement-chart/measurement-chart.component";

@Component({
  selector: 'app-home',
  imports: [CalendarComponent, RouterModule, CommonModule, MeasurementChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
