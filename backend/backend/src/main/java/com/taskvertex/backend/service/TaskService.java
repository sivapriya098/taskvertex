package com.taskvertex.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.taskvertex.backend.dto.TaskRequest;
import com.taskvertex.backend.model.Task;
import com.taskvertex.backend.model.User;
import com.taskvertex.backend.repository.TaskRepository;
import com.taskvertex.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Task> getTasks(String email, String status, String priority) {
        User user = getUser(email);

        if (status != null && priority != null) {
            return taskRepository.findByUserIdAndStatusAndPriority(
                    user.getId(),
                    Task.Status.valueOf(status),
                    Task.Priority.valueOf(priority));
        } else if (status != null) {
            return taskRepository.findByUserIdAndStatus(
                    user.getId(), Task.Status.valueOf(status));
        } else if (priority != null) {
            return taskRepository.findByUserIdAndPriority(
                    user.getId(), Task.Priority.valueOf(priority));
        }

        return taskRepository.findByUserId(user.getId());
    }

    public Task createTask(String email, TaskRequest request) {
        User user = getUser(email);

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .user(user)
                .build();

        return taskRepository.save(task);
    }

    public Task updateTask(String email, Long taskId, TaskRequest request) {
        User user = getUser(email);

        Task task = taskRepository.findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() -> new RuntimeException("Task not found or unauthorized"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setStatus(request.getStatus());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());

        return taskRepository.save(task);
    }

    public void deleteTask(String email, Long taskId) {
        User user = getUser(email);

        Task task = taskRepository.findByIdAndUserId(taskId, user.getId())
                .orElseThrow(() -> new RuntimeException("Task not found or unauthorized"));

        taskRepository.delete(task);
    }

    public Map<String, Long> getSummary(String email) {
        User user = getUser(email);
        Long userId = user.getId();

        long total      = taskRepository.findByUserId(userId).size();
        long todo       = taskRepository.countByUserIdAndStatus(userId, Task.Status.TODO);
        long inProgress = taskRepository.countByUserIdAndStatus(userId, Task.Status.IN_PROGRESS);
        long done       = taskRepository.countByUserIdAndStatus(userId, Task.Status.DONE);
        long overdue    = taskRepository.countOverdueByUserId(userId);  // ← add this

        Map<String, Long> summary = new HashMap<>();
        summary.put("total",      total);
        summary.put("todo",       todo);
        summary.put("inProgress", inProgress);
        summary.put("done",       done);
        summary.put("overdue",    overdue);  // ← add this
        return summary;
    }
}