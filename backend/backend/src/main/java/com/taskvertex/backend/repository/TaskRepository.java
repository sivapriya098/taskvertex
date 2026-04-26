package com.taskvertex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.taskvertex.backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserId(Long userId);

    List<Task> findByUserIdAndStatus(Long userId, Task.Status status);

    List<Task> findByUserIdAndPriority(Long userId, Task.Priority priority);

    List<Task> findByUserIdAndStatusAndPriority(Long userId, Task.Status status, Task.Priority priority);

    Optional<Task> findByIdAndUserId(Long id, Long userId);

    long countByUserIdAndStatus(Long userId, Task.Status status);  // ← add this

    @Query("SELECT COUNT(t) FROM Task t WHERE t.user.id = :userId AND t.status != 'DONE' AND t.dueDate < CURRENT_DATE")
    long countOverdueByUserId(@Param("userId") Long userId);
}