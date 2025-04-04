import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import mkcert from "vite-plugin-mkcert"
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  define: {
    __UPDATED_YEAR__: new Date().getFullYear(),
  },
  server:{
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
    }
  },
  plugins: [
    mkcert(),
    react(),
    TanStackRouterVite({
      routesDirectory: 'src/routes',
      generatedRouteTree: 'src/lib/tanstack-router/routeTree.gen.ts',
      routeFileIgnorePrefix: '.',
      semicolons: false,
      quoteStyle: 'single',
      routeTreeFileHeader: ['// biome-ignore lint: this file is auto-generated by TanStack Router'],
      routeTreeFileFooter: [],
    }),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/favicon.svg', '/apple-touch-icon.png'],
      injectRegister: 'auto',
      manifest: {
        name: 'tools',
        short_name: 'tools',
        description: 'A collection of various tools for myself',
        theme_color: '#0087ff',
        icons: [
          {
            src: 'pwa_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa_512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa_512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
      }
    }),
  ],
})
