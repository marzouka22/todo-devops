# Todo App — Mini Projet DevOps

Application de gestion de tâches (Todo List) — projet support pour la chaîne DevOps complète.

## Architecture

```
todo-app/
├── frontend/        # React + Vite
├── backend/         # Node.js + Express
├── docker/          # Dockerfiles (à compléter)
├── k8s/             # Manifests Kubernetes (à compléter)
└── .github/
    └── workflows/   # Pipelines CI/CD (à compléter)
```

## Stack technique

| Couche     | Technologie          |
|------------|----------------------|
| Frontend   | React 18 + Vite      |
| Backend    | Node.js + Express    |
| Tests      | Jest + Supertest     |
| Métriques  | Prometheus (prom-client) |

## Endpoints API

| Méthode | Route          | Description              |
|---------|----------------|--------------------------|
| GET     | /todos         | Lister toutes les tâches |
| POST    | /todos         | Créer une tâche          |
| PUT     | /todos/:id     | Modifier une tâche       |
| DELETE  | /todos/:id     | Supprimer une tâche      |
| GET     | /health        | Health check             |
| GET     | /metrics       | Métriques Prometheus     |

## Lancer le projet en local

### Backend
```bash
cd backend
npm install
npm run dev
# → http://localhost:3001
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Tests
```bash
cd backend
npm test
```
