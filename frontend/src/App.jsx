import { useState, useEffect } from 'react';
import './App.css';

const API_URL = '/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setError('Le titre ne peut pas être vide.');
      return;
    }
    setError('');
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    });
    if (res.ok) {
      setNewTitle('');
      fetchTodos();
    }
  };

  const toggleTodo = async (todo) => {
    await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return;
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingTitle }),
    });
    setEditingId(null);
    fetchTodos();
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <h1>📝 Todo App</h1>
        <p className="subtitle">{remaining} tâche(s) restante(s)</p>

        <form onSubmit={addTodo} className="form">
          <input
            type="text"
            placeholder="Nouvelle tâche..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn btn-add">Ajouter</button>
        </form>

        {error && <p className="error">{error}</p>}

        <ul className="todo-list">
          {todos.length === 0 && (
            <p className="empty">Aucune tâche pour le moment.</p>
          )}
          {todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
              />
              {editingId === todo.id ? (
                <>
                  <input
                    className="input edit-input"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                    autoFocus
                  />
                  <button className="btn btn-save" onClick={() => saveEdit(todo.id)}>✓</button>
                  <button className="btn btn-cancel" onClick={() => setEditingId(null)}>✕</button>
                </>
              ) : (
                <>
                  <span className="todo-title">{todo.title}</span>
                  <button className="btn btn-edit" onClick={() => startEdit(todo)}>✏️</button>
                  <button className="btn btn-delete" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
