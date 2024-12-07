// router.ts
import {createRouter, createWebHistory} from 'vue-router';

import DashboardPage from '../pages/DashboardPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from "../pages/LoginPage.vue";
import {useAuthStore} from "@/store/authStore";


const routes = [
    {path: '/', redirect: '/dashboard'},
    {path: '/dashboard', component: DashboardPage, meta: {requiresAuth: true}},
    {path: '/register', component: RegisterPage},
    {path: '/login', component: LoginPage},
    {
        path: '/logout',
        component: {
            name: 'Logout',
            mounted() {
                const auth = useAuthStore();
                auth.logout()
                this.$router.push('/login');  // Redirect after logout
            }
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


// Need to log in / register before using dashboard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next(); // Proceed to the route
    }
});

export default router;
