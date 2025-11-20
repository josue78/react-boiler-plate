import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  // Vite automatically loads .env files based on mode:
  // - .env.development for mode === 'development'
  // - .env.staging for mode === 'staging'
  // - .env.production for mode === 'production'
  // - .env for all modes (lowest priority)

  return {
    plugins: [react()],
    // Ensure environment variables are available in the app
    define: {
      // You can add custom defines here if needed
    },
  }
})
