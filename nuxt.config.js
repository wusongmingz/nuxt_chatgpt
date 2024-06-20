// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        proxy: {
          '/api': {
            target: 'http://47.93.14.224:8081',
            changeOrigin: true,
            pathRewrite: {
              '^/api/': ''
            }
          }
        }
    },
    ssr: false,
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_BASE_URL,
        },
    },
    imports: {
        dirs: ['stores'],
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@kevinmarrec/nuxt-pwa',
        'nuxt-icon',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@element-plus/nuxt',
        
    ],
    css: [
        {
            src: '~/node_modules/highlight.js/styles/base16/dracula.css',
            lang: 'css',
        },
    ],
    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    pwa: {
        icon: {
            source: './public/icon.png',
            maskablePadding: 0,
        },
        meta: {
            name: 'AI',
            description: 'Multiple AI Web Chat Client',
            theme_color: '#7733ff',
            mobileAppIOS: true,
            nativeUI: true,
        },
        manifest: {
            name: 'AI',
            description: 'Multiple AI Web Chat Client',
            background_color: '#7733ff',
            lang: 'en',
            useWebmanifestExtension: false,
        },
    },
});
