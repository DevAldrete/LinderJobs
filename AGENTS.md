# Agent Development Guidelines for LinderJobs

## Project Stack
- **Frontend**: SvelteKit + TailwindCSS (port 5173)
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL (port 8000)
- **Dev Environment**: Node.js 20, Docker

## Build/Test Commands
```bash
# Frontend
cd frontend && npm install && npm run dev
cd frontend && npm run build && npm run test

# Backend  
cd backend && docker-compose up --build
cd backend && python -m pytest tests/

# Run single test
cd backend && python -m pytest tests/test_specific.py::test_function
```

## Code Guidelines
- **No comments** unless explicitly requested
- **TypeScript**: Strict typing, explicit return types for functions
- **Python**: Type hints required, follow PEP 8
- **Imports**: Group by type (stdlib, third-party, local), absolute imports preferred
- **Naming**: camelCase (JS/TS), snake_case (Python), kebab-case (files/components)
- **Error Handling**: Use try/catch blocks, proper HTTP status codes (FastAPI)
- **Components**: Single responsibility, props typing in Svelte, composition over inheritance

No existing Cursor/Copilot rules found. Follow component-driven design for frontend and layered architecture (Presentation/Business/Persistence) for backend.