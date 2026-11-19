
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'BulkTrack',
        short_name: 'BulkTrack',
        description: 'Personal weight and nutrition tracker',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/BulkTrack/',
        scope: '/BulkTrack/',
        icons: [
          {
            src: '/BulkTrack/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/BulkTrack/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  base: '/BulkTrack/',
  build: {
    outDir: 'dist'
  }
});
