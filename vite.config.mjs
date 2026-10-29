import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: { host: '127.0.0.1', port: 3000, strictPort: true },
    preview: { host: '127.0.0.1', port: 4173, strictPort: true },
    build: { outDir: 'build', target: ['chrome111', 'edge111', 'firefox114', 'safari16.4'] },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/test-setup.js'],
    },
})
