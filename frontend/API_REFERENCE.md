# Todo App API Reference

This document provides a reference for all available API endpoints in the backend.

## Base URL

The backend server runs at `http://localhost:4000/api/v1`.

---

## Authentication

### Register User

Create a new user account.

- **Endpoint**: `POST /auth/register`
- **Body**:

  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Response (201)**:

  ```json
  {
    "success": true,
    "data": {
      "_id": "64...",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
  ```

### Login User

Authenticate an existing user.

- **Endpoint**: `POST /auth/login`
- **Body**:

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Response (200)**:

  ```json
  {
    "success": true,
    "data": {
      "_id": "64...",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
  ```

- **Note**: Sets a secure `access_token` cookie.

### Get Current User (Protected)

Retrieve the profile of the logged-in user.

- **Endpoint**: `GET /auth/me`
- **Authentication**: Required (Cookie)
- **Response (200)**:

  ```json
  {
    "success": true,
    "data": {
      "_id": "64...",
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

### Logout User

Clear the authentication cookie.

- **Endpoint**: `GET /auth/logout`
- **Response (200)**:

  ```json
  {
    "success": true,
    "data": {}
  }
  ```

---

## Todos (All routes require Authentication)

### Create Todo

- **Endpoint**: `POST /todos`
- **Body**:

  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, Eggs, Bread"
  }
  ```

- **Response (201)**:

  ```json
  {
    "success": true,
    "data": {
      "title": "Buy groceries",
      "description": "Milk, Eggs, Bread",
      "completed": false,
      "user": "64...",
      "_id": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

### Get All Todos (with Pagination)

Retrieve todos for the authenticated user.

- **Endpoint**: `GET /todos`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Number of items per page (default: 10)
- **Response (200)**:

  ```json
  {
    "success": true,
    "count": 5,
    "total": 100,
    "pagination": {
      "next": { "page": 2, "limit": 5 },
      "prev": { "page": 1, "limit": 5 }
    },
    "data": [...]
  }
  ```

### Get Single Todo

- **Endpoint**: `GET /todos/:id`
- **Response (200)**:

  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

### Update Todo

- **Endpoint**: `PUT /todos/:id`
- **Body**: Any field (`title`, `description`, `completed`).

  ```json
  {
    "completed": true
  }
  ```

- **Response (200)**:

  ```json
  {
    "success": true,
    "data": { ... }
  }
  ```

### Delete Todo

- **Endpoint**: `DELETE /todos/:id`
- **Response (200)**:

  ```json
  {
    "success": true,
    "data": {}
  }
  ```

---

## Health & Status

- **Root Status**: `GET /`
- **API Status**: `GET /api`
- **Health Check**: `GET /api/health`
