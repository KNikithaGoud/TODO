import React, { useEffect, useState } from "react";
import { api } from "./services/api";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const loadTodos = async () => {
    const res = await api.get();
    setTodos(res.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title) return;
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
    <div style={{ padding: 20 }}>
      <h2>Todo App</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id} style={{ marginTop: 10 }}>
            {editingId === t.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(t)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    cursor: "pointer",
                    marginRight: 10
                  }}
                  onClick={() => toggle(t)}
                >
                  {t.title}
                </span>
                <button onClick={() => startEdit(t)}>Edit</button>
                <button onClick={() => remove(t.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
