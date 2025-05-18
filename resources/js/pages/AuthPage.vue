<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Агрегатор курсов</h1>
        <p>Войдите в систему или зарегистрируйтесь</p>
      </div>
      
      <div class="auth-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'login' }]" 
          @click="activeTab = 'login'"
        >
          Вход
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'register' }]" 
          @click="activeTab = 'register'"
        >
          Регистрация
        </button>
      </div>
      
      <!-- Форма входа -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="loginForm.email" 
            required 
            placeholder="Введите email" 
          />
        </div>
        
        <div class="form-group">
          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            v-model="loginForm.password" 
            required 
            placeholder="Введите пароль" 
          />
        </div>
        
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="loginForm.remember" />
            <span>Запомнить меня</span>
          </label>
          <a href="#" class="forgot-password">Забыли пароль?</a>
        </div>
        
        <button type="submit" class="auth-btn" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
      </form>
      
      <!-- Форма регистрации -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label for="register-name">Имя</label>
          <input 
            type="text" 
            id="register-name" 
            v-model="registerForm.name" 
            required 
            placeholder="Введите имя" 
          />
        </div>
        
        <div class="form-group">
          <label for="register-email">Email</label>
          <input 
            type="email" 
            id="register-email" 
            v-model="registerForm.email" 
            required 
            placeholder="Введите email" 
          />
        </div>
        
        <div class="form-group">
          <label for="register-password">Пароль</label>
          <input 
            type="password" 
            id="register-password" 
            v-model="registerForm.password" 
            required 
            placeholder="Введите пароль" 
          />
        </div>
        
        <div class="form-group">
          <label for="register-password-confirm">Подтверждение пароля</label>
          <input 
            type="password" 
            id="register-password-confirm" 
            v-model="registerForm.passwordConfirm" 
            required 
            placeholder="Подтвердите пароль" 
          />
        </div>
        
        <button type="submit" class="auth-btn" :disabled="isLoading">
          {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

export default {
  name: 'AuthPage',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const activeTab = ref('login');
    const isLoading = ref(false);
    const errorMessage = ref('');
    
    const loginForm = reactive({
      email: '',
      password: '',
      remember: false
    });
    
    const registerForm = reactive({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    });
    
    const handleLogin = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = '';
        
        await authStore.login({
          email: loginForm.email,
          password: loginForm.password
        });
        
        // После успешной авторизации перенаправляем на главную
        router.push('/');
      } catch (error) {
        errorMessage.value = error.message || 'Ошибка при входе. Пожалуйста, проверьте данные.';
      } finally {
        isLoading.value = false;
      }
    };
    
    const handleRegister = async () => {
      try {
        // Проверка совпадения паролей
        if (registerForm.password !== registerForm.passwordConfirm) {
          errorMessage.value = 'Пароли не совпадают';
          return;
        }
        
        isLoading.value = true;
        errorMessage.value = '';
        
        await authStore.register({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password
        });
        
        // После успешной регистрации перенаправляем на главную
        router.push('/');
      } catch (error) {
        errorMessage.value = error.message || 'Ошибка при регистрации. Пожалуйста, проверьте данные.';
      } finally {
        isLoading.value = false;
      }
    };
    
    return {
      activeTab,
      loginForm,
      registerForm,
      isLoading,
      errorMessage,
      handleLogin,
      handleRegister
    };
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 450px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 28px;
    color: #333;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 16px;
  }
}

.auth-tabs {
  display: flex;
  margin-bottom: 25px;
  border-bottom: 1px solid #eee;
  
  .tab-btn {
    flex: 1;
    background: none;
    border: none;
    padding: 12px 0;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: #555;
    
    &.active {
      color: #2563eb;
      border-bottom: 2px solid #2563eb;
    }
    
    &:hover:not(.active) {
      color: #3b82f6;
    }
  }
}

.auth-form {
  .form-group {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      color: #444;
    }
    
    input {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 15px;
      transition: border 0.2s;
      
      &:focus {
        border-color: #3b82f6;
        outline: none;
      }
    }
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
    
    .remember-me {
      display: flex;
      align-items: center;
      cursor: pointer;
      
      input {
        margin-right: 8px;
      }
    }
    
    .forgot-password {
      color: #2563eb;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.auth-btn {
  width: 100%;
  padding: 12px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1d4ed8;
  }
  
  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
}

.error-message {
  margin-top: 20px;
  padding: 12px;
  background-color: #fee2e2;
  color: #b91c1c;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
}
</style>