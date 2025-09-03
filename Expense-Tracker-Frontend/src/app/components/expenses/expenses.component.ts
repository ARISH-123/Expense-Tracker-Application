import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ExportService } from '../../services/export.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {
  expenses: any[] = [];

  constructor(
    private expenseService: ExpenseService,
    private exportService: ExportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(res => {
      this.expenses = res;
    });
  }

  exportExpenses() {
    this.exportService.exportToExcel(this.expenses, 'Expense_Report');
  }

  addExpenses() {
  this.router.navigateByUrl('/add');
}

}
