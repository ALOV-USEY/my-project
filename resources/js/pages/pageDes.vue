<template>
  <div class="search-container">
    <!-- Шапка страницы -->
    <header class="search-header">
      <h1>Поиск онлайн-курсов</h1>
      <p>Найдите идеальный курс среди тысяч предложений от ведущих образовательных платформ</p>
    </header>
    
    <!-- Основная секция поиска -->
    <div class="search-content">
      <!-- Фильтры слева -->
      <aside class="filters-sidebar">
        <div class="filter-section">
          <h3>Категории</h3>
          <div class="filter-options">
            <div v-for="category in categories" :key="category.id" class="filter-option">
              <input 
                type="checkbox" 
                :id="`category-${category.id}`" 
                :value="category.id" 
                v-model="selectedCategories"
              />
              <label :for="`category-${category.id}`">{{ category.name }}</label>
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h3>Платформы</h3>
          <div class="filter-options">
            <div v-for="platform in platforms" :key="platform.id" class="filter-option">
              <input 
                type="checkbox" 
                :id="`platform-${platform.id}`" 
                :value="platform.id" 
                v-model="selectedPlatforms"
              />
              <label :for="`platform-${platform.id}`">{{ platform.name }}</label>
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h3>Стоимость</h3>
          <div class="price-range">
            <div class="price-inputs">
              <div class="price-input">
                <label for="min-price">От</label>
                <input 
                  type="number" 
                  id="min-price" 
                  v-model="priceRange.min" 
                  min="0"
                />
              </div>
              <div class="price-input">
                <label for="max-price">До</label>
                <input 
                  type="number" 
                  id="max-price" 
                  v-model="priceRange.max" 
                  min="0"
                />
              </div>
            </div>
            <div class="price-slider">
              <input 
                type="range" 
                v-model="priceRange.min" 
                min="0" 
                :max="priceRange.max || 50000" 
                step="500"
              />
              <input 
                type="range" 
                v-model="priceRange.max" 
                :min="priceRange.min || 0" 
                max="50000" 
                step="500"
              />
            </div>
          </div>
          
          <div class="free-checkbox">
            <input type="checkbox" id="free-courses" v-model="onlyFreeCourses" />
            <label for="free-courses">Только бесплатные</label>
          </div>
        </div>
        
        <div class="filter-section">
          <h3>Продолжительность</h3>
          <div class="filter-options">
            <div class="filter-option">
              <input type="radio" id="duration-any" value="" v-model="selectedDuration" />
              <label for="duration-any">Любая</label>
            </div>
            <div class="filter-option">
              <input type="radio" id="duration-short" value="short" v-model="selectedDuration" />
              <label for="duration-short">Короткие (до 2 недель)</label>
            </div>
            <div class="filter-option">
              <input type="radio" id="duration-medium" value="medium" v-model="selectedDuration" />
              <label for="duration-medium">Средние (2-8 недель)</label>
            </div>
            <div class="filter-option">
              <input type="radio" id="duration-long" value="long" v-model="selectedDuration" />
              <label for="duration-long">Длинные (более 8 недель)</label>
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h3>Уровень сложности</h3>
          <div class="filter-options">
            <div class="filter-option">
              <input type="checkbox" id="level-beginner" value="beginner" v-model="selectedLevels" />
              <label for="level-beginner">Начинающий</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="level-intermediate" value="intermediate" v-model="selectedLevels" />
              <label for="level-intermediate">Средний</label>
            </div>
            <div class="filter-option">
              <input type="checkbox" id="level-advanced" value="advanced" v-model="selectedLevels" />
              <label for="level-advanced">Продвинутый</label>
            </div>
          </div>
        </div>
        
        <div class="filter-actions">
          <button class="apply-filters-btn" @click="applyFilters">Применить фильтры</button>
          <button class="reset-filters-btn" @click="resetFilters">Сбросить</button>
        </div>
      </aside>
      
      <!-- Результаты поиска справа -->
      <main class="search-results">
        <div class="search-controls">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Введите название курса или ключевое слово"
              @keyup.enter="search"
            />
            <button class="search-btn" @click="search">
              Найти
            </button>
          </div>
          
          <div class="sort-controls">
            <label for="sort-select">Сортировать по:</label>
            <select id="sort-select" v-model="sortBy" @change="applySorting">
              <option value="relevance">Релевантности</option>
              <option value="price_asc">Цене (по возрастанию)</option>
              <option value="price_desc">Цене (по убыванию)</option>
              <option value="rating">Рейтингу</option>
              <option value="newest">Новизне</option>
            </select>
          </div>
        </div>
        
        <div class="search-status">
          <p v-if="isLoading">Загрузка результатов...</p>
          <p v-else-if="!courses.length && searchPerformed">По вашему запросу ничего не найдено</p>
          <p v-else-if="courses.length && searchPerformed">Найдено {{ totalCourses }} курсов</p>
        </div>
        
        <div class="courses-grid" v-if="!isLoading && courses.length">
          <div class="course-card" v-for="course in courses" :key="course.id" @click="viewCourseDetails(course.id)">
            <div class="course-image">
              <img :src="course.imageUrl || '/placeholder-course.jpg'" :alt="course.title" />
              <div class="course-platform">{{ getPlatformName(course.platformId) }}</div>
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
              <div class="course-category">{{ getCategoryName(course.categoryId) }}</div>
              <div class="course-duration">{{ formatDuration(course.duration) }}</div>
              <div class="course-price" :class="{ 'free': course.price === 0 }">
                {{ course.price === 0 ? 'Бесплатно' : `${formatPrice(course.price)} ₽` }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="pagination" v-if="totalPages > 1">
          <button 
            class="pagination-btn" 
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            &lt; Назад
          </button>
          
          <div class="pagination-pages">
            <button 
              v-for="page in displayedPages" 
              :key="page" 
              class="page-btn" 
              :class="{ active: currentPage === page }"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            class="pagination-btn" 
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Вперед &gt;
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCoursesStore } from '@/store/courses';

export default {
  name: 'SearchPage',
  setup() {
    const router = useRouter();
    const coursesStore = useCoursesStore();
    
    // Состояние поиска и фильтрации
    const searchQuery = ref('');
    const searchPerformed = ref(false);
    const isLoading = ref(false);
    const sortBy = ref('relevance');
    const currentPage = ref(1);
    const itemsPerPage = ref(12);
    
    // Фильтры
    const selectedCategories = ref([]);
    const selectedPlatforms = ref([]);
    const priceRange = reactive({
      min: 0,
      max: 50000
    });
    const onlyFreeCourses = ref(false);
    const selectedDuration = ref('');
    const selectedLevels = ref([]);
    
    // Данные
    const categories = ref([
      { id: 1, name: 'Программирование' },
      { id: 2, name: 'Дизайн' },
      { id: 3, name: 'Маркетинг' },
      { id: 4, name: 'Бизнес' },
      { id: 5, name: 'Иностранные языки' },
      { id: 6, name: 'Наука о данных' },
      { id: 7, name: 'Искусство' },
      { id: 8, name: 'Личная эффективность' }
    ]);
    
    const platforms = ref([
      { id: 1, name: 'Coursera' },
      { id: 2, name: 'Udemy' },
      { id: 3, name: 'Stepik' },
      { id: 4, name: 'Skillbox' },
      { id: 5, name: 'Нетология' },
      { id: 6, name: 'edX' },
      { id: 7, name: 'GeekBrains' }
    ]);
    
    // Вычисляемые свойства
    const courses = computed(() => coursesStore.filteredCourses);
    const totalCourses = computed(() => coursesStore.totalCourses);
    const totalPages = computed(() => Math.ceil(totalCourses.value / itemsPerPage.value));
    
    const displayedPages = computed(() => {
      const pages = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      return pages;
    });
    
    // Методы
    const search = async () => {
      try {
        isLoading.value = true;
        searchPerformed.value = true;
        
        // Сбрасываем пагинацию на первую страницу при новом поиске
        currentPage.value = 1;
        
        await coursesStore.searchCourses({
          query: searchQuery.value,
          categories: selectedCategories.value,
          platforms: selectedPlatforms.value,
          price: onlyFreeCourses.value ? { min: 0, max: 0 } : priceRange,
          duration: selectedDuration.value,
          levels: selectedLevels.value,
          page: currentPage.value,
          limit: itemsPerPage.value,
          sort: sortBy.value
        });
      } catch (error) {
        console.error('Error during search:', error);
      } finally {
        isLoading.value = false;
      }
    };
    
    const applyFilters = () => {
      search();
    };
    
    const resetFilters = () => {
      searchQuery.value = '';
      selectedCategories.value = [];
      selectedPlatforms.value = [];
      priceRange.min = 0;
      priceRange.max = 50000;
      onlyFreeCourses.value = false;
      selectedDuration.value = '';
      selectedLevels.value = [];
      sortBy.value = 'relevance';
      
      search();
    };
    
    const applySorting = () => {
      search();
    };
    
    const changePage = (page) => {
      currentPage.value = page;
      search();
    };
    
    const viewCourseDetails = (courseId) => {
      router.push(`/courses/${courseId}`);
    };
    
    const getCategoryName = (categoryId) => {
      const category = categories.value.find(c => c.id === categoryId);
      return category ? category.name : 'Без категории';
    };
    
    const getPlatformName = (platformId) => {
      const platform = platforms.value.find(p => p.id === platformId);
      return platform ? platform.name : 'Неизвестно';
    };
    
    const formatStudentCount = (count) => {
      if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
      } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
      }
      return count;
    };
    
    const formatDuration = (duration) => {
      if (!duration) return 'Длительность не указана';
      
      if (duration.type === 'weeks') {
        return `${duration.value} ${pluralize(duration.value, ['неделя', 'недели', 'недель'])}`;
      } else if (duration.type === 'months') {
        return `${duration.value} ${pluralize(duration.value, ['месяц', 'месяца', 'месяцев'])}`;
      } else if (duration.type === 'hours') {
        return `${duration.value} ${pluralize(duration.value, ['час', 'часа', 'часов'])}`;
      }
      
      return `${duration.value} ${duration.type}`;
    };
    
    const formatPrice = (price) => {
      return new Intl.NumberFormat('ru-RU').format(price);
    };
    
    const pluralize = (count, words) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return words[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[Math.min(count % 10, 5)]];
    };
    
    // Следим за изменениями фильтра "Только бесплатные"
    