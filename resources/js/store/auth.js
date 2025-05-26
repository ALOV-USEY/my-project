import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isGuest: false
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !state.isGuest,
    hasAccess: (state) => state.isAuthenticated || state.isGuest,
    userDisplayName: (state) => state.user?.name || 'Гость'
  },

  actions: {
    async login(credentials) {
      // Заглушка для тестирования
      this.user = {
        id: 1,
        name: 'Test User',
        email: credentials.email
      };
      this.isAuthenticated = true;
      this.isGuest = false;
      return true;
    },

    async loginAsGuest() {
      this.user = {
        id: 0,
        name: 'Гость',
        email: 'guest@example.com'
      };
      this.isAuthenticated = true;
      this.isGuest = true;
      return true;
    },

    async logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.isGuest = false;
    },

    async checkAuth() {
      // Заглушка для проверки авторизации
      return this.isAuthenticated;
    }
  }
});