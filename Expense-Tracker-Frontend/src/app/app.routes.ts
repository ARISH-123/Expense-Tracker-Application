import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { ReportsComponent } from './components/reports/reports.component';
import { BudgetComponent } from './components/budget/budget.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';

export const routes: Routes = [
      { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'budget', component: BudgetComponent },
  {path: 'add',component: AddExpenseComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
