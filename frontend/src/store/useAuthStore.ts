import { create } from "zustand"
import type { User } from "../types"
import { authService } from "../api/auth.service"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  checkAuth: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await authService.getMe()
      set({ user: response.data, isAuthenticated: true, isLoading: false })
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },
  logout: async () => {
    try {
      await authService.logout()
      set({ user: null, isAuthenticated: false })
    } catch (error: unknown) {
      console.error("Logout failed", error)
    }
  },
}))
