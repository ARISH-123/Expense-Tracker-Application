import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {

  constructor(private expenseService: ExpenseService, private router: Router) {}

  message = '';
  title = '';
  amount = '';
  category = '';
  date = '';
  description = '';


  addExpense(){
    const expense = { title: this.title, amount: this.amount, category: this.category, date: this.date, description: this.description};

    this.expenseService.addExpense(expense).subscribe(
      ()=>{
        alert('Expense added successfully');
        this.loadExpenseScreen();
      },
      err=>{console.error('Failed to save expense', err);}
      
    )
  }

  loadExpenseScreen()
  {
    this.router.navigateByUrl('/expenses');
  }
}
