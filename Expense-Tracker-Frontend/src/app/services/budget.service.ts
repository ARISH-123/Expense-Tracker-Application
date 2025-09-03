import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BudgetStatus {
  budget: number;
  spent: number;
  remaining: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/api/budget';

  constructor(private http: HttpClient) {}

  // Save or update budget using query parameters
  setBudget(amount: number, month: number, year: number): Observable<any> {
    return this.http.post(`${this.baseUrl}?amount=${amount}&month=${month}&year=${year}`, {});
  }

  // Get budget status for a month/year
  getBudgetStatus(month: number, year: number): Observable<BudgetStatus> {
    return this.http.get<BudgetStatus>(`${this.baseUrl}/status?month=${month}&year=${year}`);
  }
}
