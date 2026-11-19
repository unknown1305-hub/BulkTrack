

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
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
        icons: []
      }
    })
  ],
  base: '/BulkTrack/',
  build: {
    outDir: 'dist'
  }
});
