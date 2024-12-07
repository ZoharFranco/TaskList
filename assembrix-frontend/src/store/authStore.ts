import {defineStore} from 'pinia';
import {User} from "@/models/user";
import {axiosInstance} from "@/router/axiosInstance";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null, // Initialize from localStorage
        user: localStorage.getItem('username') | null,
    }),
    actions: {
        async login(credentials: { username: string; password: string }) {
            try {
                const {data} = await axiosInstance.post('/login', credentials);
                this.token = data.token; // Save token from response
                localStorage.setItem('token', data.token);
                if (credentials.username) {
                    localStorage.setItem('username', credentials.username);
                }
            } catch (error) {
                alert('Login failed: username not exist or password not correct');
                throw new Error('Login failed');
            }
        },
        async register(credentials: { username: string; password: string }) {
            try {
                await axiosInstance.post('/register', credentials);
                alert('Registration success');
            } catch (error) {
                alert('Registration failed:', error);
                throw new Error('Registration failed');
            }
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token'); // Clear localStorage
            console.log('Logged out, token cleared.');
        },
    },
});
