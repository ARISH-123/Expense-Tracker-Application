package com.arish.ExpenseTracker.controller;

import com.arish.ExpenseTracker.repo.UserRepository;
import com.arish.ExpenseTracker.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:4200")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/monthly")
    public Double getMonthlyTotal(
            @AuthenticationPrincipal User user,
            @RequestParam int month,
            @RequestParam int year
    ) {
        com.arish.ExpenseTracker.model.User user1 = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reportService.getMonthlyTotal(user1.getId(), month, year);
    }

    @GetMapping("/category")
    public Map<String, Double> getCategorySummary(@AuthenticationPrincipal User user) {
        com.arish.ExpenseTracker.model.User user1 = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reportService.getCategorySummary(user1.getId());
    }
}

