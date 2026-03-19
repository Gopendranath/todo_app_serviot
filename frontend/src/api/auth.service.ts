import api from './axios';
import type { AuthResponse, User } from '../types';

export const authService = {
  register: async (data: any): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: any): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  getMe: async (): Promise<AuthResponse> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout: async (): Promise<{ success: boolean }> => {
    const response = await api.get('/auth/logout');
    return response.data;
  },
};
