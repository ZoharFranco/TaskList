import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});
