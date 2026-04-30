const express = require('express');
const router = express.Router();

// In-memory storage
let todos = [];
let nextId = 1;

// GET /todos - Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// GET /todos/:id - Get a single todo
router.get('/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST /todos - Create a new todo
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /todos/:id - Update a todo
router.put('/:id', (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  const { title, completed } = req.body;
  if (title !== undefined) todos[index].title = title.trim();
  if (completed !== undefined) todos[index].completed = completed;

  res.json(todos[index]);
});

// DELETE /todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  todos.splice(index, 1);
  res.status(204).send();
});

// Reset (used in tests)
router.resetTodos = () => {
  todos = [];
  nextId = 1;
};

module.exports = router;
