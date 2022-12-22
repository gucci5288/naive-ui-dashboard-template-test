import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import Checker from 'vite-plugin-checker'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_PUBLIC_URL } = env
  const isDev = mode === 'development'

  return defineConfig({
    plugins: [
      vueJsx(),
      WindiCSS(),
      vue(),
      tsconfigPaths(),
      visualizer({ open: false }),

      Components({
        dts: './src/components.d.ts',
        resolvers: [IconsResolver({})],
      }),
      Icons({}),

      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue\??/, // .vue
        ],
        dts: './src/auto-import.d.ts',
        imports: ['vue', 'pinia', '@vueuse/core'],
      }),
      Checker({
        typescript: true,
        enableBuild: true,
      }),
    ],

    resolve: {
      alias: {
        'node-fetch': 'isomorphic-fetch',
      },
    },

    build: {
      chunkSizeWarningLimit: 2500,
      target: 'esnext',
      brotliSize: false,

      // sourcemap: true,
      rollupOptions: {
        output: {
          chunkFileNames: `js/[name]-[hash].js`,
          entryFileNames: `js/[name]-[hash].js`,
        },
      },
    },
    optimizeDeps: {
      exclude: [],
    },

    define: {
      __DEV__: isDev,
      __VUE_OPTIONS_API__: false,
    },
    base: !isDev ? VITE_APP_PUBLIC_URL || '' : '',

    server: {
      // https: true,
      port: 9191,
    },
    esbuild: {
      jsxFactory: 'h',
      jsxInject: 'import {h,Fragment} from "vue"',
      jsxFragment: 'Fragment',
    },
  })
}
