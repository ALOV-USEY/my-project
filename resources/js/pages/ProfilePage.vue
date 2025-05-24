<template>
  <div class="profile-page">
    <header class="profile-header">
      <div class="container">
        <div class="breadcrumbs">
          <router-link to="/">Главная</router-link> / 
          <span>Профиль</span>
        </div>
      </div>
    </header>
    
    <div class="container">
      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="profile-card">
            <div class="profile-avatar-container">
              <img :src="user.avatar" alt="Аватар пользователя" class="profile-avatar">
              <button class="avatar-edit-btn">
                <i class="fas fa-camera"></i>
              </button>
            </div>
            
            <h2 class="profile-name">{{ user.fullName }}</h2>
            <p class="profile-email">{{ user.email }}</p>
            
            <div class="profile-stats">
              <div class="stat">
                <span class="stat-value">{{ user.enrolledCourses.length }}</span>
                <span class="stat-label">Курсов</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ user.completedCourses }}</span>
                <span class="stat-label">Завершено</span>
              </div>
              <div class="stat">
                <span class="stat-value">{{ getTotalCertificates() }}</span>
                <span class="stat-label">Сертификаты</span>
              </div>
            </div>
            
            <div class="profile-menu">
              <div 
                v-for="(menuItem, index) in menuItems" 
                :key="index" 
                class="menu-item" 
                :class="{ active: activeTab === menuItem.id }"
                @click="setActiveTab(menuItem.id)"
              >
                <i :class="['fas', menuItem.icon]"></i>
                <span>{{ menuItem.title }}</span>
              </div>
            </div>
            
            <button class="btn btn-outline btn-block">
              <i class="fas fa-sign-out-alt"></i> Выйти
            </button>
          </div>
        </div>
        
        <div class="profile-main">
          <!-- Мои курсы -->
          <div v-if="activeTab === 'courses'" class="tab-content">
            <div class="tab-header">
              <h2>Мои курсы</h2>
              <div class="tab-filters">
                <div class="filter-options">
                  <span 
                    v-for="(filter, index) in courseFilters" 
                    :key="index" 
                    :class="['filter-option', { active: currentCourseFilter === filter.id }]"
                    @click="currentCourseFilter = filter.id"
                  >
                    {{ filter.title }}
                  </span>
                </div>
                <div class="search-box">
                  <i class="fas fa-search"></i>
                  <input type="text" placeholder="Поиск курсов" v-model="courseSearchQuery">
                </div>
              </div>
            </div>
            
            <div class="courses-list">
              <div v-if="filteredCourses.length === 0" class="empty-state">
                <i class="fas fa-book-open"></i>
                <p>У вас пока нет курсов</p>
                <router-link to="/courses" class="btn btn-primary">Найти курсы</router-link>
              </div>
              
              <div v-for="(course, index) in filteredCourses" :key="index" class="course-card">
                <div class="course-image">
                  <img :src="course.image" alt="Course preview">
                  <div v-if="course.status === 'in-progress'" class="course-badge in-progress">В процессе</div>
                  <div v-else-if="course.status === 'completed'" class="course-badge completed">Завершён</div>
                </div>
                
                <div class="course-info">
                  <h3 class="course-title">{{ course.title }}</h3>
                  <div class="course-meta">
                    <span class="author">{{ course.author }}</span>
                    <span class="progress">
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
                      </div>
                      <span class="progress-text">{{ course.progress }}%</span>
                    </span>
                  </div>
                  
                  <div class="course-actions">
                    <router-link :to="'/course/' + course.id" class="btn btn-primary">Продолжить</router-link>
                    <button v-if="course.status === 'completed' && course.certificateAvailable" class="btn btn-outline">
                      <i class="fas fa-certificate"></i> Сертификат
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Избранное -->
          <div v-if="activeTab === 'favorites'" class="tab-content">
            <div class="tab-header">
              <h2>Избранное</h2>
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Поиск в избранном" v-model="favoritesSearchQuery">
              </div>
            </div>
            
            <div class="favorites-list">
              <div v-if="filteredFavorites.length === 0" class="empty-state">
                <i class="fas fa-heart"></i>
                <p>В избранном пока ничего нет</p>
                <router-link to="/courses" class="btn btn-primary">Найти курсы</router-link>
              </div>
              
              <div v-for="(course, index) in filteredFavorites" :key="index" class="favorite-card">
                <div class="favorite-image">
                  <img :src="course.image" alt="Course preview">
                </div>
                
                <div class="favorite-info">
                  <h3 class="favorite-title">{{ course.title }}</h3>
                  <div class="favorite-meta">
                    <span class="author">{{ course.author }}</span>
                    <span class="rating">
                      <i class="fas fa-star"></i> {{ course.rating }}
                    </span>
                    <span class="students">
                      <i class="fas fa-user"></i> {{ course.studentsCount }}
                    </span>
                  </div>
                  
                  <div class="favorite-price">
                    <span class="current-price">{{ course.price }} ₽</span>
                    <span v-if="course.originalPrice" class="original-price">{{ course.originalPrice }} ₽</span>
                  </div>
                  
                  <div class="favorite-actions">
                    <router-link :to="'/course/' + course.id" class="btn btn-primary">Подробнее</router-link>
                    <button class="btn btn-outline" @click="removeFromFavorites(course.id)">
                      <i class="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Сертификаты -->
          <div v-if="activeTab === 'certificates'" class="tab-content">
            <div class="tab-header">
              <h2>Мои сертификаты</h2>
            </div>
            
            <div class="certificates-list">
              <div v-if="user.certificates.length === 0" class="empty-state">
                <i class="fas fa-certificate"></i>
                <p>У вас пока нет сертификатов</p>
                <p class="empty-state-subtitle">Завершите курс, чтобы получить сертификат</p>
              </div>
              
              <div v-for="(certificate, index) in user.certificates" :key="index" class="certificate-card">
                <div class="certificate-preview">
                  <img src="/resources/images/certificate-template.jpg" alt="Certificate preview">
                  <div class="certificate-overlay">
                    <button class="btn btn-primary">
                      <i class="fas fa-download"></i> Скачать
                    </button>
                  </div>
                </div>
                
                <div class="certificate-info">
                  <h3 class="certificate-title">{{ certificate.courseTitle }}</h3>
                  <p class="certificate-date">Получен: {{ certificate.issueDate }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Настройки -->
          <div v-if="activeTab === 'settings'" class="tab-content">
            <div class="tab-header">
              <h2>Настройки профиля</h2>
            </div>
            
            <form class="settings-form" @submit.prevent="saveProfile">
              <div class="form-section">
                <h3>Личные данные</h3>
                
                <div class="form-group">
                  <label for="firstName">Имя</label>
                  <input type="text" id="firstName" v-model="profileForm.firstName" required>
                </div>
                
                <div class="form-group">
                  <label for="lastName">Фамилия</label>
                  <input type="text" id="lastName" v-model="profileForm.lastName" required>
                </div>
                
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="profileForm.email" required>
                </div>
                
                <div class="form-group">
                  <label for="phone">Телефон</label>
                  <input type="tel" id="phone" v-model="profileForm.phone">
                </div>
              </div>
              
              <div class="form-section">
                <h3>Безопасность</h3>
                
                <div class="form-group">
                  <label for="currentPassword">Текущий пароль</label>
                  <input type="password" id="currentPassword" v-model="profileForm.currentPassword">
                </div>
                
                <div class="form-group">
                  <label for="newPassword">Новый пароль</label>
                  <input type="password" id="newPassword" v-model="profileForm.newPassword">
                </div>
                
                <div class="form-group">
                  <label for="confirmPassword">Подтвердите пароль</label>
                  <input type="password" id="confirmPassword" v-model="profileForm.confirmPassword">
                </div>
              </div>
              
              <div class="form-section">
                <h3>Уведомления</h3>
                
                <div class="form-check">
                  <input type="checkbox" id="emailNotifications" v-model="profileForm.emailNotifications">
                  <label for="emailNotifications">Получать уведомления по email</label>
                </div>
                
                <div class="form-check">
                  <input type="checkbox" id="courseUpdates" v-model="profileForm.courseUpdates">
                  <label for="courseUpdates">Уведомления об обновлениях курсов</label>
                </div>
                
                <div class="form-check">
                  <input type="checkbox" id="promotions" v-model="profileForm.promotions">
                  <label for="promotions">Акции и специальные предложения</label>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Сохранить изменения</button>
                <button type="button" class="btn btn-outline">Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      activeTab: 'courses',
      currentCourseFilter: 'all',
      courseSearchQuery: '',
      favoritesSearchQuery: '',
      user: {
        id: 1,
        fullName: 'Анна Смирнова',
        firstName: 'Анна',
        lastName: 'Смирнова',
        email: 'anna.smirnova@example.com',
        phone: '+7 (900) 123-45-67',
        avatar: '/resources/images/user-avatar.jpg',
        completedCourses: 3,
        enrolledCourses: [
          {
            id: 1,
            title: 'Полное руководство по Vue.js',
            author: 'Иван Петров',
            image: '/resources/images/course1-image.jpg',
            progress: 78,
            status: 'in-progress',
            certificateAvailable: false
          },
          {
            id: 2,
            title: 'JavaScript для начинающих',
            author: 'Мария Иванова',
            image: '/resources/images/course2-image.jpg',
            progress: 100,
            status: 'completed',
            certificateAvailable: true
          },
          {
            id: 3,
            title: 'HTML и CSS: основы веб-разработки',
            author: 'Александр Соколов',
            image: '/resources/images/course3-image.jpg',
            progress: 100,
            status: 'completed',
            certificateAvailable: true
          },
          {
            id: 4,
            title: 'React для профессионалов',
            author: 'Елена Васильева',
            image: '/resources/images/course4-image.jpg',
            progress: 100,
            status: 'completed',
            certificateAvailable: true
          }
        ],
        favorites: [
          {
            id: 5,
            title: 'Продвинутый TypeScript',
            author: 'Сергей Новиков',
            image: '/resources/images/course5-image.jpg',
            rating: 4.9,
            studentsCount: 1850,
            price: '4 990',
            originalPrice: '6 990'
          },
          {
            id: 6,
            title: 'Node.js: от основ до продакшена',
            author: 'Дмитрий Козлов',
            image: '/resources/images/course6-image.jpg',
            rating: 4.7,
            studentsCount: 2340,
            price: '5 490',
            originalPrice: null
          }
        ],
        certificates: [
          {
            id: 1,
            courseId: 2,
            courseTitle: 'JavaScript для начинающих',
            issueDate: '10.03.2025'
          },
          {
            id: 2,
            courseId: 3,
            courseTitle: 'HTML и CSS: основы веб-разработки',
            issueDate: '25.01.2025'
          },
          {
            id: 3,
            courseId: 4,
            courseTitle: 'React для профессионалов',
            issueDate: '15.04.2025'
          }
        ]
      },
      menuItems: [
        { id: 'courses', title: 'Мои курсы', icon: 'fa-graduation-cap' },
        { id: 'favorites', title: 'Избранное', icon: 'fa-heart' },
        { id: 'certificates', title: 'Сертификаты', icon: 'fa-certificate' },
        { id: 'settings', title: 'Настройки', icon: 'fa-cog' }
      ],
      courseFilters: [
        { id: 'all', title: 'Все' },
        { id: 'in-progress', title: 'В процессе' },
        { id: 'completed', title: 'Завершённые' }
      ],
      profileForm: {
        firstName: 'Анна',
        lastName: 'Смирнова',
        email: 'anna.smirnova@example.com',
        phone: '+7 (900) 123-45-67',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        emailNotifications: true,
        courseUpdates: true,
        promotions: false
      }
    };
  },
  computed: {
    filteredCourses() {
      let filtered = this.user.enrolledCourses;
      
      // Фильтрация по статусу
      if (this.currentCourseFilter !== 'all') {
        filtered = filtered.filter(course => course.status === this.currentCourseFilter);
      }
      
      // Поиск по названию
      if (this.courseSearchQuery.trim()) {
        const query = this.courseSearchQuery.toLowerCase();
        filtered = filtered.filter(
          course => course.title.toLowerCase().includes(query) || 
                   course.author.toLowerCase().includes(query)
        );
      }
      
      return filtered;
    },
    filteredFavorites() {
      if (!this.favoritesSearchQuery.trim()) {
        return this.user.favorites;
      }
      
      const query = this.favoritesSearchQuery.toLowerCase();
      return this.user.favorites.filter(
        course => course.title.toLowerCase().includes(query) || 
                 course.author.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
    getTotalCertificates() {
      return this.user.certificates.length;
    },
    removeFromFavorites(courseId) {
      this.user.favorites = this.user.favorites.filter(course => course.id !== courseId);
      // В реальном приложении здесь был бы запрос к API
    },
    saveProfile() {
      // Здесь была бы валидация и отправка формы на сервер
      alert('Профиль успешно обновлен');
      
      // Обновляем данные пользователя
      this.user.firstName = this.profileForm.firstName;
      this.user.lastName = this.profileForm.lastName;
      this.user.fullName = `${this.profileForm.firstName} ${this.profileForm.lastName}`;
      this.user.email = this.profileForm.email;
      this.user.phone = this.profileForm.phone;
      
      // Сброс полей пароля
      this.profileForm.currentPassword = '';
      this.profileForm.newPassword = '';
      this.profileForm.confirmPassword = '';
    }
  }
};
</script>

<style scoped>
.profile-page {
  font-family: 'Roboto', sans-serif;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-header {
  background-color: #f5f7fa;
  padding: 30px 0;
  margin-bottom: 30px;
}

.breadcrumbs {
  margin-bottom: 20px;
  font-size: 14px;
}

.breadcrumbs a {
  color: #4a90e2;
  text-decoration: none;
}

.profile-content {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
}

/* Sidebar */
.profile-sidebar {
  position: sticky;
  top: 20px;
}

.profile-card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
}

.profile-avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #4a90e2;
  border: 3px solid #fff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.profile-name {
  text-align: center;
  margin: 0 0 5px 0;
  font-size: 22px;
}

.profile-email {
  text-align: center;
  margin: 0 0 20px 0;
  color: #666;
  font-size: 14px;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e4e8;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #4a90e2;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.profile-menu {
  margin-bottom: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: #f0f7ff;
}

.menu-item.active {
  background-color: #e6f0fd;
  color: #4a90e2;
}

.menu-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #4a90e2;
  color: #4a90e2;
}

.btn-primary:hover {
  background-color: #3a7bc8;
}

.btn-outline:hover {
  background-color: #f0f7ff;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn i {
  margin-right: 8px;
}

/* Main Content */
.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tab-header h2 {
  margin: 0;
  font-size: 24px;
}

.tab-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-options {
  display: flex;
  gap: 10px;
}

.filter-option {
  padding: 6px 15px;
  border-radius: 20px;
  background-color: #f0f0f0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-option.active {
  background-color: #4a90e2;
  color: white;
}

.search-box {
  position: relative;
}

.search-box i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.search-box input {
  padding: 8px 10px 8px 35px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  width: 250px;
}

/* Courses List */
.courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.course-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.course-image {
  position: relative;
  height: 160px;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.in-progress {
  background-color: #ffc107;
  color: #fff;
}

.completed {
  background-color: #4caf50;
  color: #fff;
}

.course-info {
  padding: 15px;
}

.course-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  line-height: 1.3;
}

.course-meta {
  margin-bottom: 15px;
}

.author {
  display: block;
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.progress {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex-grow: 1;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #4a90e2;
}

.progress-text {
  font-size: 14px;
  color: #666;
}

.course-actions {
  display: flex;
  gap: 10px;
}

/* Favorites List */
.favorites-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.favorite-card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.favorite-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-3px);
}

.favorite-image {
  height: 160px;
}

.favorite-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.favorite-info {
  padding: 15px;
}

.favorite-title {
  margin: 0 0 10px 0;
  font-size: 18px;
  line-height: 1.3;
}

.favorite-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.favorite-meta i {
  color: #ffc107;
  margin-right: 5px;
}

.favorite-price {
  margin-bottom: 15px;
}

.current-price {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.favorite-actions {
  display: flex;
  gap: 10px;
}

/* Certificates List */
.certificates-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.certificate-card {
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.certificate-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.certificate-preview {
  position: relative;
}

.certificate-preview img {
  width: 100%;
  display: block;
}

.certificate-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.certificate-card:hover .certificate-overlay {
  opacity: 1;
}

.certificate-info {
  padding: 15px;
}

.certificate-title {
  margin: 0 0 5px 0;
  font-size: 16px;
}

.certificate-date {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* Settings Form */
.form-section {
  margin-bottom: 30px;
}

.form-section h3 {
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e1e4e8;
  margin-top: 0;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-check input[type="checkbox"] {
  margin-right: 10px;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.empty-state i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 15px;
}

.empty-state p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.empty-state-subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .profile-content {
    grid-template-columns: 1fr 2fr;
  }
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }
  
  .profile-sidebar {
    position: static;
  }
  
  .tab-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .courses-list,
  .favorites-list,
  .certificates-list {
    grid-template-columns: 1fr;
  }
}
</style>style scoped>