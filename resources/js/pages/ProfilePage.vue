<template>
  <div class="profile-container">
    <!-- Шапка профиля -->
    <section class="profile-header">
      <div class="profile-avatar">
        <img src="/images/avatar-placeholder.jpg" alt="Аватар пользователя" />
      </div>
      <div class="profile-info">
        <h1>Иван Иванов</h1>
        <p class="profile-email">user@example.com</p>
        <p class="profile-joined">На платформе с января 2025</p>
      </div>
      <button class="edit-profile-btn">Редактировать профиль</button>
    </section>
    
    <!-- Статистика пользователя -->
    <section class="user-stats">
      <div class="stat-card">
        <div class="stat-value">12</div>
        <div class="stat-label">Избранных курсов</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">5</div>
        <div class="stat-label">Записанных курсов</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">3</div>
        <div class="stat-label">Завершенных курсов</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">4.8</div>
        <div class="stat-label">Средний рейтинг</div>
      </div>
    </section>
    
    <!-- Вкладки с контентом -->
    <section class="profile-tabs">
      <div class="tabs-header">
        <div 
          class="tab-item" 
          :class="{ 'active': activeTab === 'enrolled' }"
          @click="activeTab = 'enrolled'"
        >
          Записанные курсы
        </div>
        <div 
          class="tab-item" 
          :class="{ 'active': activeTab === 'favorites' }"
          @click="activeTab = 'favorites'"
        >
          Избранное
        </div>
        <div 
          class="tab-item" 
          :class="{ 'active': activeTab === 'history' }"
          @click="activeTab = 'history'"
        >
          История просмотров
        </div>
        <div 
          class="tab-item" 
          :class="{ 'active': activeTab === 'settings' }"
          @click="activeTab = 'settings'"
        >
          Настройки
        </div>
      </div>
      
      <!-- Содержимое вкладок -->
      <div class="tabs-content">
        <!-- Записанные курсы -->
        <div v-if="activeTab === 'enrolled'" class="tab-content">
          <h2>Записанные курсы</h2>
          
          <div class="courses-grid">
            <div v-for="course in enrolledCourses" :key="course.id" class="course-card">
              <div class="course-image">
                <img :src="course.imageUrl || '/placeholder-course.jpg'" :alt="course.title" />
                <div class="course-platform">{{ course.platform }}</div>
                <div class="course-progress">
                  <div class="progress-bar" :style="{ width: `${course.progress}%` }"></div>
                </div>
              </div>
              <div class="course-info">
                <h3 class="course-title">{{ course.title }}</h3>
                <div class="course-meta">
                  <span class="course-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-value">{{ course.rating }}</span>
                  </span>
                  <span class="course-students">{{ formatStudentCount(course.studentCount) }} студентов</span>
                </div>
                <div class="course-category">{{ course.category }}</div>
                <div class="course-progress-info">
                  <span>Прогресс: {{ course.progress }}%</span>
                  <span>{{ course.completedLessons }}/{{ course.totalLessons }} уроков</span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="enrolledCourses.length === 0" class="empty-state">
            <div class="empty-icon">📚</div>
            <h3>У вас пока нет записанных курсов</h3>
            <p>Найдите интересующие вас курсы и начните обучение</p>
            <button class="browse-courses-btn" @click="browseCourses">Найти курсы</button>
          </div>
        </div>
        
        <!-- Избранное -->
        <div v-if="activeTab === 'favorites'" class="tab-content">
          <h2>Избранные курсы</h2>
          
          <div class="courses-grid">
            <div v-for="course in favoriteCourses" :key="course.id" class="course-card">
              <div class="course-image">
                <img :src="course.imageUrl || '/placeholder-course.jpg'" :alt="course.title" />
                <div class="course-platform">{{ course.platform }}</div>
                <div class="favorite-badge">★</div>
              </div>
              <div class="course-info">
                <h3 class="course-title">{{ course.title }}</h3>
                <div class="course-meta">
                  <span class="course-rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-value">{{ course.rating }}</span>
                  </span>
                  <span class="course-students">{{ formatStudentCount(course.studentCount) }} студентов</span>
                </div>
                <div class="course-category">{{ course.category }}</div>
                <div class="course-price" :class="{ 'free': course.price === 0 }">
                  {{ course.price === 0 ? 'Бесплатно' : `${formatPrice(course.price)} ₽` }}
                </div>
                <button class="remove-favorite-btn" @click="removeFavorite(course.id)">
                  Удалить из избранного
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="favoriteCourses.length === 0" class="empty-state">
            <div class="empty-icon">❤️</div>
            <h3>У вас пока нет избранных курсов</h3>
            <p>Добавляйте интересные курсы в избранное, чтобы не потерять их</p>
            <button class="browse-courses-btn" @click="browseCourses">Найти курсы</button>
          </div>
        </div>
        
        <!-- История просмотров -->
        <div v-if="activeTab === 'history'" class="tab-content">
          <h2>История просмотров</h2>
          
          <div class="history-list">
            <div v-for="(course, index) in viewHistory" :key="index" class="history-item">
              <div class="history-image">
                <img :src="course.imageUrl || '/placeholder-course.jpg'" :alt="course.title" />
              </div>
              <div class="history-info">
                <h3>{{ course.title }}</h3>
                <div class="history-meta">
                  <span class="history-platform">{{ course.platform }}</span>
                  <span class="history-category">{{ course.category }}</span>
                </div>
                <div class="history-date">Просмотрено: {{ course.viewedAt }}</div>
              </div>
              <div class="history-actions">
                <button class="view-course-btn" @click="viewCourse(course.id)">Открыть</button>
                <button class="add-favorite-btn" v-if="!course.isFavorite" @click="addToFavorites(course.id)">
                  В избранное
                </button>
              </div>
            </div>
          </div>
          
          <div v-if="viewHistory.length === 0" class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>История просмотров пуста</h3>
            <p>Здесь будут отображаться просмотренные вами курсы</p>
            <button class="browse-courses-btn" @click="browseCourses">Найти курсы</button>
          </div>
        </div>
        
        <!-- Настройки профиля -->
        <div v-if="activeTab === 'settings'" class="tab-content">
          <h2>Настройки профиля</h2>
          
          <div class="settings-form">
            <div class="form-section">
              <h3>Личная информация</h3>
              
              <div class="form-group">
                <label for="name">ФИО</label>
                <input type="text" id="name" v-model="userSettings.name" placeholder="Ваше полное имя">
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="userSettings.email" placeholder="ваш@email.com">
              </div>
              
              <div class="form-group">
                <label for="phone">Телефон</label>
                <input type="tel" id="phone" v-model="userSettings.phone" placeholder="+7 (XXX) XXX-XX-XX">
              </div>
            </div>
            
            <div class="form-section">
              <h3>Настройки уведомлений</h3>
              
              <div class="checkbox-group">
                <input type="checkbox" id="email_notifications" v-model="userSettings.notifications.email">
                <label for="email_notifications">Уведомления по email</label>
              </div>
              
              <div class="checkbox-group">
                <input type="checkbox" id="new_courses" v-model="userSettings.notifications.newCourses">
                <label for="new_courses">Новые курсы по интересам</label>
              </div>
              
              <div class="checkbox-group">
                <input type="checkbox" id="discounts" v-model="userSettings.notifications.discounts">
                <label for="discounts">Скидки и акции</label>
              </div>
              
              <div class="checkbox-group">
                <input type="checkbox" id="reminders" v-model="userSettings.notifications.reminders">
                <label for="reminders">Напоминания о курсах</label>
              </div>
            </div>
            
            <div class="form-section">
              <h3>Пароль</h3>
              
              <div class="form-group">
                <label for="current_password">Текущий пароль</label>
                <input type="password" id="current_password" v-model="userSettings.currentPassword" placeholder="Введите текущий пароль">
              </div>
              
              <div class="form-group">
                <label for="new_password">Новый пароль</label>
                <input type="password" id="new_password" v-model="userSettings.newPassword" placeholder="Введите новый пароль">
              </div>
              
              <div class="form-group">
                <label for="confirm_password">Подтверждение пароля</label>
                <input type="password" id="confirm_password" v-model="userSettings.confirmPassword" placeholder="Подтвердите новый пароль">
              </div>
            </div>
            
            <div class="form-actions">
              <button class="save-settings-btn" @click="saveSettings">Сохранить изменения</button>
              <button class="cancel-btn" @click="resetSettings">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'ProfilePage',
  setup() {
    const router = useRouter();
    const activeTab = ref('enrolled');
    
    // Моковые данные для записанных курсов
    const enrolledCourses = ref([
      {
        id: 1,
        title: 'Основы программирования на Python',
        platform: 'Stepik',
        category: 'Программирование',
        rating: 4.8,
        studentCount: 154000,
        imageUrl: '/images/courses/python-basics.jpg',
        progress: 75,
        completedLessons: 15,
        totalLessons: 20
      },
      {
        id: 2,
        title: 'UX/UI дизайн: с нуля до PRO',
        platform: 'Skillbox',
        category: 'Дизайн',
        rating: 4.7,
        studentCount: 32500,
        imageUrl: '/images/courses/ux-ui-design.jpg',
        progress: 40,
        completedLessons: 8,
        totalLessons: 20
      },
      {
        id: 3,
        title: 'Анализ данных в Excel и Power BI',
        platform: 'Coursera',
        category: 'Наука о данных',
        rating: 4.9,
        studentCount: 65800,
        imageUrl: '/images/courses/data-analysis.jpg',
        progress: 10,
        completedLessons: 2,
        totalLessons: 18
      }
    ]);
    
    // Моковые данные для избранных курсов
    const favoriteCourses = ref([
      {
        id: 4,
        title: 'React для начинающих: полное руководство',
        platform: 'Udemy',
        category: 'Программирование',
        price: 3500,
        rating: 4.7,
        studentCount: 1200,
        imageUrl: '/images/courses/react-beginners.jpg'
      },
      {
        id: 5,
        title: 'Финансовая грамотность для всех',
        platform: 'Нетология',
        category: 'Бизнес',
        price: 0,
        rating: 4.5,
        studentCount: 3500,
        imageUrl: '/images/courses/finance.jpg'
      },
      {
        id: 6,
        title: 'Промышленный дизайн от А до Я',
        platform: 'Skillbox',
        category: 'Дизайн',
        price: 56000,
        rating: 4.8,
        studentCount: 750,
        imageUrl: '/images/courses/industrial-design.jpg'
      },
      {
        id: 7,
        title: 'Английский для IT-специалистов',
        platform: 'Stepik',
        category: 'Иностранные языки',
        price: 9900,
        rating: 4.6,
        studentCount: 2100,
        imageUrl: '/images/courses/english-it.jpg'
      }
    ]);
    
    // Моковые данные для истории просмотров
    const viewHistory = ref([
      {
        id: 8,
        title: 'Мастер-класс по digital-маркетингу',
        platform: 'Нетология',
        category: 'Маркетинг',
        imageUrl: '/images/courses/digital-marketing.jpg',
        viewedAt: '20 мая 2025, 10:15',
        isFavorite: false
      },
      {
        id: 7,
        title: 'Английский для IT-специалистов',
        platform: 'Stepik',
        category: 'Иностранные языки',
        imageUrl: '/images/courses/english-it.jpg',
        viewedAt: '19 мая 2025, 18:30',
        isFavorite: true
      },
      {
        id: 9,
        title: 'Основы JavaScript и веб-разработки',
        platform: 'GeekBrains',
        category: 'Программирование',
        imageUrl: '/images/courses/javascript-basics.jpg',
        viewedAt: '18 мая 2025, 14:20',
        isFavorite: false
      },
      {
        id: 10,
        title: 'Фотография для начинающих',
        platform: 'Udemy',
        category: 'Искусство',
        imageUrl: '/images/courses/photography.jpg',
        viewedAt: '15 мая 2025, 20:45',
        isFavorite: false
      }
    ]);
    
    // Настройки пользователя
    const userSettings = reactive({
      name: 'Иван Иванов',
      email: 'user@example.com',
      phone: '+7 (999) 123-45-67',
      notifications: {
        email: true,
        newCourses: true,
        discounts: true,
        reminders: false
      },
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // Сохранение исходных настроек для функции отмены
    const originalSettings = { 
      name: userSettings.name,
      email: userSettings.email,
      phone: userSettings.phone,
      notifications: { ...userSettings.notifications }
    };
    
    // Функции для работы с данными
    const formatStudentCount = (count) => {
      if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
      } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
      }
      return count;
    };
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU').format(price);
    };
    
    // Функции для управления избранным
    const removeFavorite = (courseId) => {
      favoriteCourses.value = favoriteCourses.value.filter(course => course.id !== courseId);
      console.log(`Курс ${courseId} удален из избранного`);
    };
    
    const addToFavorites = (courseId) => {
      const courseToAdd = viewHistory.value.find(course => course.id === courseId);
      if (courseToAdd) {
        courseToAdd.isFavorite = true;
        console.log(`Курс ${courseId} добавлен в избранное`);
        // Здесь логика добавления в избранное
      }
    };
    
    // Функции для навигации
    const viewCourse = (courseId) => {
      console.log(`Переход к курсу ${courseId}`);
      // router.push(`/courses/${courseId}`);
    };
    
    const browseCourses = () => {
      console.log('Переход к странице поиска курсов');
      router.push('/');
    };
    
    // Функции для настроек профиля
    const saveSettings = () => {
      // Проверка паролей
      if (userSettings.newPassword && 
          userSettings.newPassword !== userSettings.confirmPassword) {
        alert('Пароли не совпадают');
        return;
      }
      
      console.log('Настройки сохранены', userSettings);
      alert('Настройки профиля успешно сохранены');
      
      // Сброс полей пароля
      userSettings.currentPassword = '';
      userSettings.newPassword = '';
      userSettings.confirmPassword = '';
      
      // Обновление оригинальных настроек
      originalSettings.name = userSettings.name;
      originalSettings.email = userSettings.email;
      originalSettings.phone = userSettings.phone;
      originalSettings.notifications = { ...userSettings.notifications };
    };
    
    const resetSettings = () => {
      // Восстановление настроек из оригинала
      userSettings.name = originalSettings.name;
      userSettings.email = originalSettings.email;
      userSettings.phone = originalSettings.phone;
      userSettings.notifications = { ...originalSettings.notifications };
      
      // Сброс полей пароля
      userSettings.currentPassword = '';
      userSettings.newPassword = '';
      userSettings.confirmPassword = '';
      
      console.log('Настройки сброшены');
    };
    
    onMounted(() => {
      console.log('ProfilePage mounted');
      // Здесь при необходимости можно загрузить реальные данные пользователя
    });
    
    return {
      activeTab,
      enrolledCourses,
      favoriteCourses,
      viewHistory,
      userSettings,
      formatStudentCount,
      formatPrice,
      removeFavorite,
      addToFavorites,
      viewCourse,
      browseCourses,
      saveSettings,
      resetSettings
    };
  }
};
</script>

<style lang="scss" scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 30px;
  
  .profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 30px;
    border: 4px solid #3b82f6;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .profile-info {
    flex: 1;
    
    h1 {
      font-size: 28px;
      margin-bottom: 5px;
      color: #1f2937;
    }
    
    .profile-email {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 8px;
    }
    
    .profile-joined {
      font-size: 14px;
      color: #9ca3af;
    }
  }
  
  .edit-profile-btn {
    padding: 10px 20px;
    background: transparent;
    color: #3b82f6;
    border: 1px solid #3b82f6;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background: #3b82f6;
      color: white;
    }
  }
}

.user-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  
  .stat-card {
    padding: 20px;
    background: #f9fafb;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #e5e7eb;
    
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 14px;
      color: #4b5563;
    }
  }
}

.profile-tabs {
  margin-bottom: 60px;
  
  .tabs-header {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 30px;
    
    .tab-item {
      padding: 15px 25px;
      font-size: 16px;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        color: #2563eb;
      }
      
      &.active {
        color: #2563eb;
        font-weight: 500;
        border-bottom: 2px solid #2563eb;
      }
    }
  }
  
  .tab-content {
    h2 {
      font-size: 22px;
      color: #1f2937;
      margin-bottom: 25px;
    }
  }
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
  
  .course-card {
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .course-image {
      position: relative;
      height: 160px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .course-platform {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 4px;
      }
      
      .favorite-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #f59e0b;
        color: white;
        padding: 4px 8px;
        font-size: 14px;
        border-radius: 4px;
      }
      
      .course-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: rgba(0, 0, 0, 0.3);
        
        .progress-bar {
          height: 100%;
          background: #10b981;
        }
      }
    }
    
    .course-info {
      padding: 15px;
      
      .course-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
        color: #1f2937;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 44px;
      }
      
      .course-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
        
        .course-rating {
          display: flex;
          align-items: center;
          
          .stars {
            color: #f59e0b;
            margin-right: 5px;
          }
          
          .rating-value {
            color: #4b5563;
          }
        }
        
        .course-students {
          color: #6b7280;
        }
      }
      
      .course-category {
        color: #4b5563;
        font-size: 14px;
        margin-bottom: 8px;
      }
      
      .course-price {
        font-weight: 600;
        font-size: 16px;
        color: #111827;
        margin-bottom: 12px;
        
        &.free {
          color: #059669;
        }
      }
      
      .course-progress-info {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #6b7280;
        margin-top: 12px;
      }
      
      .remove-favorite-btn {
        margin-top: 10px;
        width: 100%;
        padding: 8px;
        background: transparent;
        border: 1px solid #ef4444;
        color: #ef4444;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
          background: #ef4444;
          color: white;
        }
      }
    }
  }
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  .history-item {
    display: flex;
    background: #f9fafb;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    
    .history-image {
      width: 100px;
      height: 100px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .history-info {
      flex: 1;
      padding: 15px;
      
      h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #1f2937;
      }
      
      .history-meta {
        display: flex;
        gap: 15px;
        font-size: 14px;
        margin-bottom: 8px;
        
        .history-platform {
          color: #4b5563;
        }
        
        .history-category {
          color: #6b7280;
        }
      }
      
      .history-date {
        font-size: 14px;
        color: #9ca3af;
      }
    }
    
    .history-actions {
      display: flex;
      flex