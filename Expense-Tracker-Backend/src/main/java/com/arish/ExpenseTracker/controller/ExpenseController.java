package com.arish.ExpenseTracker.controller;

import com.arish.ExpenseTracker.model.Expense;
import com.arish.ExpenseTracker.model.User;
import com.arish.ExpenseTracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:4200")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public List<Expense> getUserExpenses(@AuthenticationPrincipal org.springframework.security.core.userdetails.User principal) {
        return expenseService.getExpensesForUser(principal);
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense, @AuthenticationPrincipal org.springframework.security.core.userdetails.User principal) {
        return expenseService.addExpense(expense, principal);
    }
}
