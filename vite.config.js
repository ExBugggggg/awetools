/// <reference types="vitest"></reference>
import { configDefaults } from 'vitest/config'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': '/src',
            '@assets': '/src/assets',
            '@components': '/src/components',
            '@views': '/src/views'
        }
    },
    test: {
        exclude: [...configDefaults.exclude, 'assets/regex.js'],
        coverage: {
            reporter: ['html', 'text']   
        }
    }
})
