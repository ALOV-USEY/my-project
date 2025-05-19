// // resources/js/store/courses.js
// import { defineStore } from 'pinia';

// export const useCoursesStore = defineStore('courses', {
//   state: () => ({
//     courses: [],
//     categories: [
//       { id: 1, name: 'Программирование' },
//       { id: 2, name: 'Дизайн' },
//       { id: 3, name: 'Маркетинг' },
//       { id: 4, name: 'Бизнес' },
//       { id: 5, name: 'Иностранные языки' },
//       { id: 6, name: 'Наука о данных' },
//       { id: 7, name: 'Искусство' },
//       { id: 8, name: 'Личная эффективность' }
//     ],
//     platforms: [
//       { id: 1, name: 'Coursera' },
//       { id: 2, name: 'Udemy' },
//       { id: 3, name: 'Stepik' },
//       { id: 4, name: 'Skillbox' },
//       { id: 5, name: 'Нетология' },
//       { id: 6, name: 'edX' },
//       { id: 7, name: 'GeekBrains' }
//     ],
//     loading: false,
//     error: null,
//   }),
  
//   getters: {
//     getAllCourses: (state) => state.courses,
//     getAllCategories: (state) => state.categories,
//     getAllPlatforms: (state) => state.platforms,
    
//     getCourseById: (state) => (id) => {
//       return state.courses.find(course => course.id === id);
//     },
    
//     getCategoryById: (state) => (id) => {
//       return state.categories.find(category => category.id === id);
//     },
    
//     getPlatformById: (state) => (id) => {
//       return state.platforms.find(platform => platform.id === id);
//     }
//   },
  
//   actions: {
//     // В будущем здесь будут реальные API-запросы
//     async fetchCourses() {
//       this.loading = true;
//       try {
//         // Имитация запроса к API
//         await new Promise(resolve => setTimeout(resolve, 500));
        
//         // Заглушка данных курсов
//         this.courses = [
//           {
//             id: 1,
//             title: 'Основы программирования на Python',
//             platformId: 3,
//             categoryId: 1,
//             price: 0,
//             rating: 4.8,
//             studentCount: 154000,
//             imageUrl: '/images/courses/python-basics.jpg',
//             description: 'Базовый курс по программированию на Python для начинающих. Изучите основы языка, работу с данными и создание простых приложений.'
//           },
//           {
//             id: 2,
//             title: 'UX/UI дизайн: с нуля до PRO',
//             platformId: 4,
//             categoryId: 2,
//             price: 45000,
//             rating: 4.7,
//             studentCount: 32500,
//             imageUrl: '/images/courses/ux-ui-design.jpg',
//             description: 'Комплексный курс по UX/UI дизайну. Научитесь создавать красивые и удобные интерфейсы, работать с прототипами и исследовать пользователей.'
//           },
//           {
//             id: 3,
//             title: 'Маркетинг в социальных сетях',
//             platformId: 2,
//             categoryId: 3,
//             price: 12000,
//             rating: 4.6,
//             studentCount: 87300,
//             imageUrl: '/images/courses/social-marketing.jpg',
//             description: 'Полный курс по SMM. Стратегия продвижения, создание контента, работа с аудиторией и анализ эффективности рекламы.'
//           },
//           {
//             id: 4,
//             title: 'Анализ данных в Excel и Power BI',
//             platformId: 1,
//             categoryId: 6,
//             price: 8000,
//             rating: 4.9,
//             studentCount: 65800,
//             imageUrl: '/images/courses/data-analysis.jpg',
//             description: 'Научитесь анализировать данные с помощью Excel и Power BI. Формулы, сводные таблицы, визуализации и построение дашбордов.'
//           },
//           {
//             id: 5,
//             title: 'React для начинающих: полное руководство',
//             platformId: 2,
//             categoryId: 1,
//             price: 3500,
//             rating: 4.7,
//             studentCount: 1200,
//             imageUrl: '/images/courses/react-beginners.jpg',
//             description: 'Изучите React с нуля. Компоненты, хуки, роутинг, управление состоянием и создание полноценных веб-приложений.'
//           },
//           {
//             id: 6,
//             title: 'Финансовая грамотность для всех',
//             platformId: 5,
//             categoryId: 4,
//             price: 0,
//             rating: 4.5,
//             studentCount: 3500,
//             imageUrl: '/images/courses/finance.jpg',
//             description: 'Основы финансовой грамотности. Планирование бюджета, инвестиции, кредиты и защита от финансовых рисков.'
//           },
//           {
//             id: 7,
//             title: 'Промышленный дизайн от А до Я',
//             platformId: 4,
//             categoryId: 2,
//             price: 56000,
//             rating: 4.8,
//             studentCount: 750,
//             imageUrl: '/images/courses/industrial-design.jpg',
//             description: 'Полный курс по промышленному дизайну. От создания концепций до прототипирования и 3D-моделирования продуктов.'
//           },
//           {
//             id: 8,
//             title: 'Английский для IT-специалистов',
//             platformId: 3,
//             categoryId: 5,
//             price: 9900,
//             rating: 4.6,
//             studentCount: 2100,
//             imageUrl: '/images/courses/english-it.jpg',
//             description: 'Специализированный курс английского языка для работников IT-сферы. Технический словарь, общение с заказчиками и коллегами.'
//           }
//         ];
        
//         this.error = null;
//       } catch (error) {
//         this.error = 'Ошибка при загрузке курсов';
//         console.error('Ошибка при загрузке данных:', error);
//       } finally {
//         this.loading = false;
//       }
//     },
    
//     async fetchFeaturedCourses() {
//       this.loading = true;
//       try {
//         // Имитация запроса к API
//         await new Promise(resolve => setTimeout(resolve, 300));
        
//         // Получаем курсы и возвращаем популярные (первые 4)
//         if (this.courses.length === 0) {
//           await this.fetchCourses();
//         }
        
//         return this.courses.slice(0, 4);
//       } catch (error) {
//         this.error = 'Ошибка при загрузке популярных курсов';
//         console.error('Ошибка при загрузке популярных курсов:', error);
//         return [];
//       } finally {
//         this.loading = false;
//       }
//     },
    
//     async fetchNewCourses() {
//       this.loading = true;
//       try {
//         // Имитация запроса к API
//         await new Promise(resolve => setTimeout(resolve, 300));
        
//         // Получаем курсы и возвращаем новые (последние 4)
//         if (this.courses.length === 0) {
//           await this.fetchCourses();
//         }
        
//         return this.courses.slice(4, 8);
//       } catch (error) {
//         this.error = 'Ошибка при загрузке новых курсов';
//         console.error('Ошибка при загрузке новых курсов:', error);
//         return [];
//       } finally {
//         this.loading = false;
//       }
//     },
    
//     async searchCourses(query = '', filters = {}) {
//       this.loading = true;
//       try {
//         // Имитация запроса поиска
//         await new Promise(resolve => setTimeout(resolve, 700));
        
//         // Получаем все курсы
//         if (this.courses.length === 0) {
//           await this.fetchCourses();
//         }
        
//         let filteredCourses = [...this.courses];
        
//         // Фильтрация по поисковому запросу
//         if (query) {
//           filteredCourses = filteredCourses.filter(course => 
//             course.title.toLowerCase().includes(query.toLowerCase()) ||
//             this.getCategoryById(course.categoryId)?.name.toLowerCase().includes(query.toLowerCase())
//           );
//         }
        
//         // Фильтрация по категории
//         if (filters.categories && filters.categories.length) {
//           filteredCourses = filteredCourses.filter(course => 
//             filters.categories.includes(course.categoryId)
//           );
//         }
        
//         // Фильтрация по платформе
//         if (filters.platforms && filters.platforms.length) {
//           filteredCourses = filteredCourses.filter(course => 
//             filters.platforms.includes(course.platformId)
//           );
//         }
        
//         // Фильтрация по цене
//         if (filters.price) {
//           if (filters.price.min !== undefined) {
//             filteredCourses = filteredCourses.filter(course => course.price >= filters.price.min);
//           }
//           if (filters.price.max !== undefined) {
//             filteredCourses = filteredCourses.filter(course => course.price <= filters.price.max);
//           }
//           if (filters.price.free) {
//             filteredCourses = filteredCourses.filter(course => course.price === 0);
//           }
//         }
        
//         // Сортировка
//         if (filters.sort) {
//           switch (filters.sort) {
//             case 'price_asc':
//               filteredCourses.sort((a, b) => a.price - b.price);
//               break;
//             case 'price_desc':
//               filteredCourses.sort((a, b) => b.price - a.price);
//               break;
//             case 'rating':
//               filteredCourses.sort((a, b) => b.rating - a.rating);
//               break;
//             case 'popularity':
//               filteredCourses.sort((a, b) => b.studentCount - a.studentCount);
//               break;
//             case 'newest':
//               // Для демо просто сортируем по ID в обратном порядке, 
//               // в реальности здесь будет дата создания
//               filteredCourses.sort((a, b) => b.id - a.id);
//               break;
//           }
//         }
        
//         return filteredCourses;
//       } catch (error) {
//         this.error = 'Ошибка при поиске курсов';
//         console.error('Ошибка при поиске курсов:', error);
//         return [];
//       } finally {
//         this.loading = false;
//       }
//     }
//   }
// });
// resources/js/store/courses.js
// Это временный файл-заглушка для устранения ошибки импорта

export const useCoursesStore = () => {
  // Возвращаем пустой объект, так как на данный момент мы не используем хранилище
  return {};
};