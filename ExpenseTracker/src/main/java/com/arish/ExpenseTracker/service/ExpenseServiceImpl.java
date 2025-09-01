package com.arish.ExpenseTracker.service;


import com.arish.ExpenseTracker.model.Expense;
import com.arish.ExpenseTracker.model.User;
import com.arish.ExpenseTracker.repo.ExpenseRepository;
import com.arish.ExpenseTracker.repo.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private final ExpenseRepository expenseRepository;

    @Autowired
    private final UserRepository userRepository;

    @Override
    public Expense addExpense(Expense expense, org.springframework.security.core.userdetails.User principal) {
        User user = userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Attach user to expense
        expense.setUser(user);

        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getExpensesForUser(@AuthenticationPrincipal org.springframework.security.core.userdetails.User principal) {

        User user = userRepository.findByUsername(principal.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return expenseRepository.findByUser(user);
    }


    @Override
    public Expense updateExpense(Long id, Expense expense, User user) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Expense not found with id: " + id));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Not allowed to update this expense");
        }

        existing.setDescription(expense.getDescription());
        existing.setAmount(expense.getAmount());
        existing.setDate(expense.getDate());
        existing.setCategory(expense.getCategory());

        return expenseRepository.save(existing);
    }

    @Override
    public void deleteExpense(Long id, User user) {
        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Expense not found with id: " + id));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Not allowed to delete this expense");
        }

        expenseRepository.delete(existing);
    }
}

