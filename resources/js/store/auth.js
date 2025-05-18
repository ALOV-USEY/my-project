import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  
  actions: {
    async login(credentials) {
      // Для тестирования просто имитируем успешный вход
      console.log('Вход с данными:', credentials);
      
      // В реальном проекте здесь был бы запрос к API
      // await api.post('/login', credentials);
      
      this.user = { 
        id: 1, 
        name: 'Тестовый пользователь', 
        email: credentials.email 
      };
      this.isAuthenticated = true;
      
      // Возвращаем промис для возможности обработки во внешнем коде
      return Promise.resolve(this.user);
    },
    
    async register(userData) {
      // Для тестирования просто имитируем успешную регистрацию
      console.log('Регистрация с данными:', userData);
      
      // В реальном проекте здесь был бы запрос к API
      // await api.post('/register', userData);
      
      this.user = { 
        id: 1, 
        name: userData.name, 
        email: userData.email 
      };
      this.isAuthenticated = true;
      
      return Promise.resolve(this.user);
    },
    
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});