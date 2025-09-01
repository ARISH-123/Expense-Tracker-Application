package com.arish.ExpenseTracker.service;



import com.arish.ExpenseTracker.model.Expense;
import com.arish.ExpenseTracker.model.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

public interface ExpenseService {
    Expense addExpense(Expense expense, org.springframework.security.core.userdetails.User principal);
    List<Expense> getExpensesForUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User principal);
    Expense updateExpense(Long id, Expense expense, User user);
    void deleteExpense(Long id, User user);
}
