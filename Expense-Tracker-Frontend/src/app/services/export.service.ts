import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
//@ts-ignore
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  
  exportToExcel(data: any[], fileName: string): void {
    // Convert JSON data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create workbook and add worksheet
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Expenses': worksheet },
      SheetNames: ['Expenses']
    };

    // Save workbook
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, `${fileName}.xlsx`);
  }
}
