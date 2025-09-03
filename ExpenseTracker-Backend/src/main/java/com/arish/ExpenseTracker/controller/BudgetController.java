package com.arish.ExpenseTracker.controller;

import com.arish.ExpenseTracker.model.Budget;
import com.arish.ExpenseTracker.repo.UserRepository;
import com.arish.ExpenseTracker.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:4200")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public Budget setBudget(
            @AuthenticationPrincipal User user,
            @RequestParam Double amount,
            @RequestParam int month,
            @RequestParam int year
    ) {
        com.arish.ExpenseTracker.model.User user1 = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return budgetService.setBudget(user1, amount, month, year);
    }

    @GetMapping("/status")
    public Map<String, Object> getBudgetStatus(
            @AuthenticationPrincipal User user,
            @RequestParam int month,
            @RequestParam int year
    ) {
        com.arish.ExpenseTracker.model.User user1 = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return budgetService.checkBudgetStatus(user1, month, year);
    }
}

