import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/me/', // 這裡請換成你 GitHub 儲存庫的名字
})