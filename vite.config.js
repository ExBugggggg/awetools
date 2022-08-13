/// <reference types="vitest"></reference>
import { configDefaults } from 'vitest/config'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import prismjs from 'vite-plugin-prismjs'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        [
            prismjs({
                languages: ['js', 'json', 'python', 'java'],
                css: true,
                theme: 'default',
                plugins: ['line-numbers']
            })
        ]
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
