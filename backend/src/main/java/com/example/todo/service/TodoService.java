package com.example.todo.service;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public Todo create(Todo todo) {
        return repo.save(todo);
    }

    public List<Todo> getAll(Boolean completed) {
        if (completed == null) return repo.findAll();
        return repo.findByCompleted(completed);
    }

    public Todo update(Long id, Todo updated) {
        Todo todo = repo.findById(id).orElseThrow();
        todo.setTitle(updated.getTitle());
        todo.setDescription(updated.getDescription());
        todo.setCompleted(updated.isCompleted());
        return repo.save(todo);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}