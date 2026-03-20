import { create } from "zustand"
import type { Todo } from "../types"
import { todoService } from "../api/todo.service"

interface TodoState {
  todos: Todo[]
  isLoading: boolean
  error: string | null
  count: number
  total: number
  completed: number
  remaining: number
  page: number
  limit: number
  fetchTodos: (page?: number, limit?: number) => Promise<void>
  addTodo: (title: string, description?: string) => Promise<void>
  updateTodo: (id: string, data: Partial<Todo>) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  isLoading: false,
  error: null,
  count: 0,
  total: 0,
  completed: 0,
  remaining: 0,
  page: 1,
  limit: 10,
  fetchTodos: async (page = 1, limit = 10) => {
    try {
      set({ isLoading: true, error: null })
      const response = await todoService.getTodos(page, limit)
      set({
        todos: response.data,
        count: response.count,
        total: response.total,
        completed: response.completed,
        remaining: response.remaining,
        page,
        limit,
        isLoading: false,
      })
    } catch {
      set({ isLoading: false, error: "Failed to fetch todos" })
    }
  },
  addTodo: async (title, description) => {
    try {
      set({ isLoading: true, error: null })
      const response = await todoService.createTodo({ title, description })
      set((state) => ({
        todos: [response.data, ...state.todos],
        isLoading: false,
      }))
    } catch {
      set({ isLoading: false, error: "Failed to add todo" })
    }
  },
  updateTodo: async (id, data) => {
    try {
      set({ isLoading: true, error: null })
      const response = await todoService.updateTodo(id, data)
      set((state) => ({
        todos: state.todos.map((t) => (t._id === id ? response.data : t)),
        isLoading: false,
      }))
    } catch {
      set({ isLoading: false, error: "Failed to update todo" })
    }
  },
  deleteTodo: async (id) => {
    try {
      set({ isLoading: true, error: null })
      await todoService.deleteTodo(id)
      set((state) => ({
        todos: state.todos.filter((t) => t._id !== id),
        isLoading: false,
      }))
    } catch {
      set({ isLoading: false, error: "Failed to delete todo" })
    }
  },
}))
