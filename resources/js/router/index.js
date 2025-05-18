import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '../pages/AuthPage.vue';

const routes = [
    { 
        path: '/', 
        component: AuthPage 
    },
    { 
        path: '/auth', 
        component: AuthPage 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;