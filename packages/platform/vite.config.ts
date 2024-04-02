import path from 'path'

import DesignTokensBailuLessGlobal from '@fruits-chain/design-tokens-bailu/lib/less-global.js'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      topLevelAwait({
        promiseExportName: '__tla',
        promiseImportName: i => `__tla_${i}`,
      }),
    ],
    server: {
      proxy: {
        [`${env.REACT_APP_BASE_URL}${env.REACT_APP_GRAPHQL_PATH}`]: {
          target: env.REACT_APP_API_HOST,
          changeOrigin: true,
          ws: false,
          secure: false,
        },
        [`${env.REACT_APP_BASE_URL}esi`]: {
          target: env.REACT_APP_API_HOST,
          changeOrigin: true,
          ws: false,
          secure: false,
        },
        '/_upload': {
          target: env.REACT_APP_UPLOAD_HOST,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    logLevel: 'info',
    define: {
      'process.env': {
        REACT_APP_GRAPHQL_PATH: env.REACT_APP_GRAPHQL_PATH,
        REACT_APP_BASE_URL: env.REACT_APP_BASE_URL,
        REACT_APP_API_HOST: env.REACT_APP_API_HOST,
        RSA_PUBLIC_KEY: env.RSA_PUBLIC_KEY,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            ...DesignTokensBailuLessGlobal,
          },
        },
      },
    },
  }
})
