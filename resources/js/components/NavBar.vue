<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link to="/" class="navbar-brand">
        <span class="brand-text">Агрегатор курсов</span>
      </router-link>

      <div class="navbar-menu">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/courses" class="nav-link">Все курсы</router-link>
        <router-link to="/categories" class="nav-link">Категории</router-link>
        <router-link to="/platforms" class="nav-link">Платформы</router-link>
      </div>

      <div class="navbar-auth">
        <template v-if="authStore.isLoggedIn">
          <div class="user-menu">
            <span class="username">{{ authStore.userDisplayName }}</span>
            <div class="dropdown-menu">
              <router-link to="/profile" class="dropdown-item">Профиль</router-link>
              <router-link to="/favorites" class="dropdown-item">Избранное</router-link>
              <button @click="handleLogout" class="dropdown-item">Выйти</button>
            </div>
          </div>
        </template>
        <template v-else>
          <router-link to="/auth" class="auth-link">Войти</router-link>
          <router-link to="/auth?mode=register" class="auth-link register">Регистрация</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
      await authStore.logout();
      router.push('/auth');
    };

    return {
      authStore,
      handleLogout
    };
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  text-decoration: none;
  display: flex;
  align-items: center;
  
  .brand-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2563eb;
  }
}

.navbar-menu {
  display: flex;
  gap: 24px;
  
  .nav-link {
    text-decoration: none;
    color: #4b5563;
    font-weight: 500;
    padding: 8px 0;
    position: relative;
    
    &:hover {
      color: #2563eb;
    }
    
    &.router-link-active {
      color: #2563eb;
      
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: #2563eb;
      }
    }
  }
}

.navbar-auth {
  display: flex;
  align-items: center;
  gap: 16px;
  
  .auth-link {
    text-decoration: none;
    color: #4b5563;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 6px;
    
    &:hover {
      background: #f3f4f6;
    }
    
    &.register {
      background: #2563eb;
      color: white;
      
      &:hover {
        background: #1d4ed8;
      }
    }
  }
  
  .user-menu {
    position: relative;
    
    .username {
      cursor: pointer;
      padding: 8px;
      border-radius: 6px;
      
      &:hover {
        background: #f3f4f6;
      }
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 6px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      margin-top: 8px;
      display: none;
      
      .dropdown-item {
        display: block;
        padding: 8px 16px;
        text-decoration: none;
        color: #4b5563;
        
        &:hover {
          background: #f3f4f6;
        }
        
        &:first-child {
          border-radius: 6px 6px 0 0;
        }
        
        &:last-child {
          border-radius: 0 0 6px 6px;
        }
      }
    }
    
    &:hover .dropdown-menu {
      display: block;
    }
  }
}

@media (max-width: 768px) {
  .navbar-menu {
    display: none;
  }
  
  .navbar-container {
    justify-content: space-between;
  }
}
</style>