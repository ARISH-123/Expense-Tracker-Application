package com.arish.ExpenseTracker.service;

import com.arish.ExpenseTracker.model.Expense;
import com.arish.ExpenseTracker.repo.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private ExpenseRepository expenseRepository;

    public Double getMonthlyTotal(Long userId, int month, int year) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return expenseRepository.findByUserAndDateRange(userId, start, end)
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }

    public Map<String, Double> getCategorySummary(Long userId) {
        List<Object[]> results = expenseRepository.findTotalAmountByCategory(userId);
        Map<String, Double> summary = new HashMap<>();
        for (Object[] row : results) {
            summary.put((String) row[0], (Double) row[1]);
        }
        return summary;
    }
}
