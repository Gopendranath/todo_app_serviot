export interface User {
  _id: string
  username: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface LoginData {
  email: string
  password?: string
}

export interface RegisterData {
  username: string
  email: string
  password?: string
}

export interface Todo {
  _id: string
  title: string
  description: string
  completed: boolean
  user: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  success: boolean
  data: User
}

export interface TodoResponse {
  success: boolean
  data: Todo
}

export interface TodosResponse {
  success: boolean
  count: number
  total: number
  completed: number
  remaining: number
  pagination: {
    next?: { page: number; limit: number }
    prev?: { page: number; limit: number }
  }
  data: Todo[]
}
