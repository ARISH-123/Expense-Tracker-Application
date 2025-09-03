import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

 private baseUrl = 'http://localhost:8080/api/expenses';

  constructor(private http: HttpClient) {}

  getExpenses() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addExpense(expense: any) {
    return this.http.post(this.baseUrl, expense);
  }

  deleteExpense(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
