import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 確保資源路徑為相對路徑，有利於 GitHub Pages 讀取
})