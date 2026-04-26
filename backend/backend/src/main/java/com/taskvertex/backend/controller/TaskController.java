package com.taskvertex.backend.controller;

import com.taskvertex.backend.dto.TaskRequest;
import com.taskvertex.backend.model.Task;
import com.taskvertex.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority) {

        return ResponseEntity.ok(
                taskService.getTasks(userDetails.getUsername(), status, priority));
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Long>> getSummary(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(taskService.getSummary(userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody TaskRequest request) {

        return ResponseEntity.ok(
                taskService.createTask(userDetails.getUsername(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {

        return ResponseEntity.ok(
                taskService.updateTask(userDetails.getUsername(), id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {

        taskService.deleteTask(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}