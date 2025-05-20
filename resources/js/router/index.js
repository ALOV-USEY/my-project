import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '../pages/AuthPage.vue';
import HomePage from '../pages/HomePage.vue';
import CourseDetailPage from '../pages/CourseDetail.vue';
//import ProfilePage from '../pages/ProfilePage.vue';
//import FavoritesPage from '../pages/FavoritesPage.vue';
//import SearchPage from '../pages/SearchPage.vue';
import { useAuthStore } from '../store/auth';

const routes = [
    {
        path: '/',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    {
        path: '/auth',
        component: AuthPage,
        meta: { guest: true }
    },
    {
         path: '/courses',
         component: CourseDetailPage,
         meta: { guest: true }
    },
     {
         path: '/profile',
         component: ProfilePage,
         meta: { guest: true }
     },
    // {
    //     path: '/favorites',
    //     component: FavoritesPage,
    //     meta: { requiresAuth: true }
    // },
    // {
    //     path: '/search',
    //     component: SearchPage,
    //     meta: { requiresAuth: true }
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Защита маршрутов
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isGuestRoute = to.matched.some(record => record.meta.guest);

    if (requiresAuth && !authStore.isAuthenticated) {
        next('/auth');
    } else if (isGuestRoute && authStore.isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router;