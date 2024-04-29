import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import basicSsl from "@vitejs/plugin-basic-ssl"
import { viteVConsole } from "vite-plugin-vconsole"
import { resolve } from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    viteVConsole({
      entry: resolve("src/main.tsx"),
      enabled: true,
      config: {
        maxLogNumber: 1000,
      },
    }),
  ],
  server: {
    https: {},
  },
})
