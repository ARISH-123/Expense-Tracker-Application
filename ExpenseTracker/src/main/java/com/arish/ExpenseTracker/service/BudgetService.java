package com.arish.ExpenseTracker.service;

import com.arish.ExpenseTracker.model.Budget;
import com.arish.ExpenseTracker.model.User;
import com.arish.ExpenseTracker.repo.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private ReportService reportService;

    public Budget setBudget(User user, Double amount, int month, int year) {
        Budget budget = budgetRepository
                .findByUserIdAndMonthAndYear(user.getId(), month, year)
                .orElse(new Budget());

        budget.setUser(user);
        budget.setAmount(amount);
        budget.setMonth(month);
        budget.setYear(year);

        return budgetRepository.save(budget);
    }

    public Map<String, Object> checkBudgetStatus(User user, int month, int year) {
        Optional<Budget> budgetOpt = budgetRepository.findByUserIdAndMonthAndYear(user.getId(), month, year);
        double spent = reportService.getMonthlyTotal(user.getId(), month, year);

        Map<String, Object> result = new HashMap<>();
        result.put("spent", spent);

        if (budgetOpt.isPresent()) {
            double budgetAmount = budgetOpt.get().getAmount();
            result.put("budget", budgetAmount);
            result.put("remaining", budgetAmount - spent);
            result.put("exceeded", spent > budgetAmount);
        } else {
            result.put("budget", null);
            result.put("remaining", null);
            result.put("exceeded", false);
        }

        return result;
    }
}

