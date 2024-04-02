import path from 'path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 10000,
    setupFiles: ['./vitest-setup.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  resolve: {
    mainFields: ['module'],
  },
})
