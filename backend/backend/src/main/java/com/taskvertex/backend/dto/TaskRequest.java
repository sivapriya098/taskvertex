package com.taskvertex.backend.dto;

import com.taskvertex.backend.model.Task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private Task.Status status;

    @NotNull
    private Task.Priority priority;

    private LocalDate dueDate;
}