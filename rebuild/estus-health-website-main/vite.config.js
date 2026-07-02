import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssr: {
    // Force these CJS packages to be bundled (not externalized) during SSR
    noExternal: ['react-helmet-async'],
  },
})
