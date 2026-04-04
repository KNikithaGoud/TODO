import React, { useEffect, useState } from "react";
import { api } from "./services/api";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const loadTodos = async () => {
    try {
      const res = await api.get("");
      // sort by newest
      const sorted = res.data.sort((a,b) => b.id - a.id);
      setTodos(sorted);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.post("", { title });
    setTitle("");
    loadTodos();
  };

  const toggle = async (todo) => {
    await api.put(`/${todo.id}`, { ...todo, completed: !todo.completed });
    loadTodos();
  };

  const remove = async (id) => {
    await api.delete(`/${id}`);
    loadTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  const saveEdit = async (todo) => {
    await api.put(`/${todo.id}`, {
      ...todo,
      title: editingText
    });
    setEditingId(null);
    setEditingText("");
    loadTodos();
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">Daily Tasks</h1>
        <form onSubmit={addTodo} className="input-group">
          <input
            className="todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        <ul className="todo-list">
          {todos.map((t) => (
            <li key={t.id} className={`todo-item ${t.completed ? "completed" : ""}`}>
              {editingId === t.id ? (
                <div className="edit-group">
                  <input
                    className="edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button className="icon-btn save" onClick={() => saveEdit(t)}>✓</button>
                    <button className="icon-btn cancel" onClick={() => setEditingId(null)}>✕</button>
                  </div>
                </div>
              ) : (
                <>
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={t.completed} 
                      onChange={() => toggle(t)} 
                    />
                    <span className="checkmark"></span>
                  </label>
                  <span className="todo-text" onDoubleClick={() => startEdit(t)}>
                    {t.title}
                  </span>
                  <div className="actions">
                    <button className="action-btn edit" onClick={() => startEdit(t)}>✎</button>
                    <button className="action-btn delete" onClick={() => remove(t.id)}>✕</button>
                  </div>
                </>
              )}
            </li>
          ))}
          {todos.length === 0 && <p className="empty-state">No tasks yet. Enjoy your day!</p>}
        </ul>
      </div>
    </div>
  );
}

export default App;
