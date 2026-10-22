export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    css: ['~/assets/css/global.css'],
    components: false,
    typescript: {
        strict: true,
    },
    runtimeConfig: {
        public: {
            siteUrl: 'https://osnovano.ru',
        },
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Основано',
            titleTemplate: '%s — Основано',
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: '',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
                },
            ],
        },
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },
    },
    vite: {
        vueJsx: {
            mergeProps: true,
        },
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ['/', '/projects', '/privacy', '/personal-data', '/cookies'],
        },
        storage: {
            inquiries: {
                driver: 'fs',
                base: './.data/inquiries',
            },
        },
    },
})
