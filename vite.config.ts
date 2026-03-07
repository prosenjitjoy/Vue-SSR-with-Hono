import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'

export default defineConfig(({ mode }) => {
  if (mode == 'dev') {
    return {
      plugins: [
        vue(),
      ],
      build: {
        rollupOptions: {
          output: {
            entryFileNames: `[name].js`,
            chunkFileNames: `[name].js`,
            assetFileNames: `[name].[ext]`,
          }
        }
      }
    }
  }

  return {
    plugins: [
      vue(),
      build(),
      devServer({
        adapter,
        entry: 'src/index.ts'
      })
    ]
  }
})
