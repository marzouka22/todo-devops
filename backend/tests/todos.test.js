const request = require('supertest');
const app = require('../src/index');
const todosRouter = require('../src/routes/todos');

beforeEach(() => {
  todosRouter.resetTodos();
});

describe('GET /todos', () => {
  it('should return an empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe('POST /todos', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'Test todo' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test todo');
    expect(res.body.completed).toBe(false);
    expect(res.body.id).toBeDefined();
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('PUT /todos/:id', () => {
  it('should update a todo', async () => {
    const created = await request(app)
      .post('/todos')
      .send({ title: 'Old title' });
    const res = await request(app)
      .put(`/todos/${created.body.id}`)
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should return 404 for unknown id', async () => {
    const res = await request(app).put('/todos/999').send({ completed: true });
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', async () => {
    const created = await request(app)
      .post('/todos')
      .send({ title: 'To delete' });
    const res = await request(app).delete(`/todos/${created.body.id}`);
    expect(res.statusCode).toBe(204);
  });

  it('should return 404 for unknown id', async () => {
    const res = await request(app).delete('/todos/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /health', () => {
  it('should return ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
