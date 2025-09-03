import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

   private baseUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getMonthlyTotal(month: number, year: number) {
    return this.http.get<number>(`${this.baseUrl}/monthly?month=${month}&year=${year}`);
  }

  getCategorySummary() {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/category`);
  }
}
