import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The CommCard PWA is copied into public/commcard as a static standalone app,
// so it ships in the same deploy and is reachable at /commcard/.
export default defineConfig({
  plugins: [react()],
})
