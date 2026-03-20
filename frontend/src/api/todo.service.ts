import api from "./axios"
import type { Todo, TodoResponse, TodosResponse } from "../types"

export const todoService = {
  getTodos: async (page = 1, limit = 10): Promise<TodosResponse> => {
    const response = await api.get(`/todos?page=${page}&limit=${limit}`)
    return response.data
  },

  getTodo: async (id: string): Promise<TodoResponse> => {
    const response = await api.get(`/todos/${id}`)
    return response.data
  },

  createTodo: async (data: {
    title: string
    description?: string
  }): Promise<TodoResponse> => {
    const response = await api.post("/todos", data)
    return response.data
  },

  updateTodo: async (
    id: string,
    data: Partial<Todo>
  ): Promise<TodoResponse> => {
    const response = await api.put(`/todos/${id}`, data)
    return response.data
  },

  deleteTodo: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/todos/${id}`)
    return response.data
  },
}
