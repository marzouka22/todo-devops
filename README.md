# Todo App — Mini Projet DevOps

[![CI](https://github.com/marzouka22/todo-devops/actions/workflows/ci.yml/badge.svg)](https://github.com/marzouka22/todo-devops/actions)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Kubernetes](https://img.shields.io/badge/k8s-deployed-326ce5)
![SonarCloud](https://img.shields.io/badge/sonarcloud-analyzed-orange)

Application de gestion de tâches (Todo List) industrialisée via une chaîne DevOps complète.

## Stack technique

- **Frontend** : React 18 + Vite + Nginx
- **Backend** : Node.js + Express
- **Stockage** : In-memory
- **CI/CD** : GitHub Actions + ArgoCD
- **Sécurité** : Trivy + npm audit + SonarCloud
- **Monitoring** : Prometheus + Grafana
- **Orchestration** : Kubernetes (Minikube)

## Architecture
git push → GitHub Actions (CI)
→ lint + tests + SonarQube + Trivy
→ Docker build + push
→ update k8s manifests
→ ArgoCD sync automatique
→ Kubernetes (Minikube)
→ Prometheus + Grafana

## Structure du projet
todo-devops/
├── backend/        ← Node.js + Express + tests Jest
├── frontend/       ← React + Vite + Nginx
├── docker/         ← docker-compose.yml
├── k8s/            ← manifests Kubernetes
├── .github/        ← pipeline CI/CD
└── monitoring/     ← Prometheus + Grafana

## Démarrage local

```bash
# Backend
cd backend && npm install && npm start

# Frontend
cd frontend && npm install && npm run dev
```

## Démarrage Docker

```bash
cd docker && docker compose up --build
# Frontend → http://localhost:8080
# Backend  → http://localhost:3001/todos
```

## Pipeline CI/CD

Voir `.github/workflows/ci.yml`

- Lint (ESLint)
- Tests (Jest + coverage)
- Analyse qualité (SonarCloud)
- Scan sécurité (Trivy + npm audit)
- Build + push Docker
- Déploiement automatique via ArgoCD

## Auteur

Salim Marzouka — IT Business School
