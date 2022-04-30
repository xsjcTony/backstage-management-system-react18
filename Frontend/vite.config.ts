import eslintPlugin from '@nabla/vite-plugin-eslint'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'


export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({ formatter: 'stylish' }),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style`
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' }
    ]
  }
})
