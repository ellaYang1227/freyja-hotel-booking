import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslint({
      include: ["src/**/*.ts", "src/**/*.vue", "src/*.ts", "src/*.vue"],
    })
  ],
  base: process.env.NODE_ENV === "production" ? "/freyja-hotel-booking/" : "/",
  resolve: {
    alias: {
      // 配置路径别名
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 每個頁面都可以使用變數
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/styles/all-custom.scss';`,
      },
    },
  }
})

