import path from 'path'
import CracoLessPlugin from 'craco-less'
import config from './src/config'

module.exports = {
  devServer: {
    proxy: {
      [`${config.baseUrl}graphql`]: {
        target: config.apiHost,
        changeOrigin: true,
        ws: false,
        secure: false,
      },
      '/_upload': {
        target: 'http://localhost:3000',
        secure: true,
        changeOrigin: true,
      },
    },
  },
  babel: {
    plugins: [
      // 配置 babel-plugin-import
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: 'css',
        },
        'antd',
      ],
    ],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // craco 提供的插件
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
