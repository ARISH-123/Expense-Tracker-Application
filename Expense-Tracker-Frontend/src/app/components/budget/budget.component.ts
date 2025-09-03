import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BudgetService, BudgetStatus } from '../../services/budget.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './budget.component.html'
})
export class BudgetComponent implements OnInit {

  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  budgetAmount: number = 0;
  spentAmount: number = 0;
  remainingAmount: number = 0;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    this.loadBudgetStatus();
  }

  // Load budget and spent status
  loadBudgetStatus() {
    this.budgetService.getBudgetStatus(this.selectedMonth, this.selectedYear)
      .subscribe((status: BudgetStatus) => {
        this.budgetAmount = status.budget;
        this.spentAmount = status.spent;
        this.remainingAmount = status.remaining;
      }, err => {
        console.error('Failed to load budget status', err);
      });
  }

  // Save or update budget
  saveBudget() {
    this.budgetService.setBudget(this.budgetAmount, this.selectedMonth, this.selectedYear)
      .subscribe(() => {
        alert('Budget saved successfully!');
        this.loadBudgetStatus(); // refresh status
      }, err => {
        console.error('Failed to save budget', err);
      });
  }
}
