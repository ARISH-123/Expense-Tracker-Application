import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ChartType, ChartData } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  @ViewChild('pieChart') pieChart?: BaseChartDirective;

  // Pie chart (Category-wise)
  pieChartType: ChartType = 'pie';
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ 
      data: [], 
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'] 
    }]
  };

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.loadCategorySummary();
  }

  // Sanitize labels to avoid Angular errors
  private sanitizeLabel(label: string): string {
    return label.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
  }

  loadCategorySummary() {
    this.reportService.getCategorySummary().subscribe(res => {
      this.pieChartData.labels = Object.keys(res).map(this.sanitizeLabel);
      this.pieChartData.datasets[0].data = Object.values(res) as number[];
      this.pieChart?.update();
    });
  }
}
