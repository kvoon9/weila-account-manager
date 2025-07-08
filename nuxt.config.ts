import type { NuxtPage } from 'nuxt/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'arco-design-nuxt-module',
    '@pinia/nuxt',
  ],

  ssr: false,

  imports: {
    dirs: [
      './composables',
      './shared',
      './utils',
    ],
  },

  devtools: { enabled: true },

  app: {
    cdnURL: './',
  },

  css: [
    '@unocss/reset/tailwind.css',
    './styles/global.css',
  ],

  router: {
    options: {
      hashMode: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    typedPages: true,
    clientNodeCompat: true,
  },

  compatibilityDate: '2025-07-02',

  nitro: {
    preset: 'static',
    routeRules: {
      // '/**': {
      // prerender: false,
      // headers: {
      //   'Cross-Origin-Embedder-Policy': 'require-corp',
      //   'Cross-Origin-Opener-Policy': 'same-origin',
      // },
      // },

      '/proxy/**': {
        proxy: {
          to: 'https://demo.weila.hk/v1/**',
        },
        cors: true,
      },
    },
    sourceMap: false,
  },

  vite: {
    base: './',
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      // NOTE: 此处 proxy 配置并不符合 nuxt 的最佳实践(SSG 模式下无法正常工作)
      // 考虑到 weila 的 v2 接口现只支持 https 协议，而 routeRules 中无法忽略证书，故在此配置代理
      proxy: {
        '/proxy2': {
          target: 'https://demo.weila.hk',
          changeOrigin: true,
          secure: false, // 忽略 SSL 证书
          rewrite: path => path.replace(/^\/proxy2/, 'v2'),
        },
      },
    },
  },

  hooks: {
    'prerender:routes': function ({ routes }) {
      routes.clear() // Do not generate any routes (except the defaults)
    },
    'pages:extend': function (pages) {
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove: NuxtPage[] = []
        for (const page of pages) {
          if (page.file && pattern.test(page.file)) {
            pagesToRemove.push(page)
          }
          else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }

      removePagesMatching(/\.ts$/, pages)
      removePagesMatching(/components/, pages)
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  unocss: {
    nuxtLayers: true,
  },
})
