import { cloudflare } from '@cloudflare/vite-plugin'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { reactRouter } from '@react-router/dev/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    reactRouter(),
  ],
  ssr: {
    noExternal: ['@a01sa01to/ui'],
  },
})
