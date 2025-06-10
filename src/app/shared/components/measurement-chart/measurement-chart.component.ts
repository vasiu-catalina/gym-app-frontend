import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { MeasurementType } from '../../models/measurement.model';
import { MeasurementState } from '../../states/measurement.state';
import { AuthState } from '../../states/auth.state';

interface Measurement {
  id: string;
  user: string;
  date: Date;
  unit: string;
  value: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-measurement-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './measurement-chart.component.html',
})
export class MeasurementChartComponent {
  measurementTypes = Object.values(MeasurementType);
  selectedType = MeasurementType.Weight;
  selectedRange: 'week' | 'month' | 'year' = 'month';


  measurements: Measurement[] = [];

  chartType: ChartType = 'line';

  chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{ data: [], label: '', tension: 0.5 }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Measurement Trends' }
    }
  };

  constructor(
    private authState: AuthState,
    private measurementState: MeasurementState) {
    this.filterData();
    effect(() => {
      this.measurements = this.measurementState.getMeasurements();
    });
  }

  filterData() {
    const now = new Date();
    let cutoff: Date;

    switch (this.selectedRange) {
      case 'week':
        cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        cutoff = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'year':
        cutoff = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
    }

    const filtered = this.measurements
      .filter(m => m.type === this.selectedType && new Date(m.date) >= cutoff!)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    this.chartData = {
      labels: filtered.map(m => new Date(m.date).toLocaleDateString()),
      datasets: [{
        data: filtered.map(m => m.value),
        label: this.selectedType,
        fill: true,
        tension: 0.3
      }]
    };
  }
}
