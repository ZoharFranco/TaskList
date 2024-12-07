import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import fs from 'fs';
import {fileURLToPath} from "node:url";

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    server: {
        https: {
            key: fs.readFileSync('./ssl/server.key'),  // Path to your private key
            cert: fs.readFileSync('./ssl/server.crt'),     // Path to your certificate
        },
        port: 8081, // You can change the port if needed
        proxy: {
            '/api': {
                target: 'https://localhost:3000',  // Proxy requests to your backend (Express)
                changeOrigin: true,
                secure: true,  // Set to true if your backend certificate is trusted
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
});
