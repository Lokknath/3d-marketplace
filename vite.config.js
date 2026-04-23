import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/3d-marketplace/',
  plugins: [react()],
  resolve: {
    dedupe: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
