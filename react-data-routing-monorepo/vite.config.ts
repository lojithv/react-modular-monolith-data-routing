/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@root': resolve(__dirname, 'root'),
      '@modules': resolve(__dirname, 'modules'),
      '@shared': resolve(__dirname, 'shared'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./shared/auth/__testing__/setup.ts'],
    include: ['**/__tests__/**/*.test.{ts,tsx}'],
  },
})
