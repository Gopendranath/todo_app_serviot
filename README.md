# Todo App (Serviot)

A full-stack Todo application built with React, TypeScript, Node.js, and MongoDB.

## Project Structure

- `backend/`: Node.js Express API with MongoDB (Mongoose).
- `frontend/`: React application built with Vite, Tailwind CSS, and shadcn/ui.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (preferred) or npm/yarn
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd todo-app-serviot
```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `MONGODB_URI` and other settings as needed.

   ```bash
   cp .env.example .env
   ```

4. Run the backend:

   ```bash
   # Development mode (with nodemon)
   pnpm run dev

   # Build and start
   pnpm run build
   pnpm run start
   ```

   The backend will be running at `http://localhost:4000`.

### 3. Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`

   ```bash
   cp .env.example .env
   ```

4. Run the frontend:

   ```bash
   pnpm run dev
   ```

   The frontend will be running at `http://localhost:5173`.

## API Documentation

- **Postman Collections**: Found in `backend/postman/`. See the [Postman README](backend/postman/README.md) for details.
- **REST Client**: You can also use the `backend/requests.http` file with the VS Code REST Client extension.
- **Frontend API Reference**: See `frontend/API_REFERENCE.md`.

## Features

- User Authentication (JWT + Cookies)
- CRUD operations for Todos
- Pagination for Todo list
- Responsive UI with Dark Mode support
- Form validation with Zod and React Hook Form
- State management with Zustand
