import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/views/badgesComponent.vue',  // 入口文件为 default.vue
      name: 'JinxBadgeVue3',  // 设置组件库名称
      fileName: (format) => `jinx-badge-vue3.${format}.js`,  // 输出文件名
    },
    rollupOptions: {
      external: ['vue'],  // 将 vue 标记为外部依赖
      output: [
        {
          format: 'es',  // ES Module 格式
          dir: 'dist/esm',  // 输出目录 (ESM)
          entryFileNames: '[name].esm.js',  // 默认 esm 文件名
          chunkFileNames: '[name].esm.js',  // 异步 chunk 文件名
        },
        {
          format: 'cjs',  // CommonJS 格式
          dir: 'dist/cjs',  // 输出目录 (CJS)
          entryFileNames: '[name].cjs.js',  // cjs 文件名
          chunkFileNames: '[name].cjs.js',  // 异步 chunk 文件名
        },
      ],
    },
    cssCodeSplit: true,  // 启用样式拆分
  },
});
