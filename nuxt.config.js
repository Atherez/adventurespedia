import colors from 'vuetify/es5/util/colors';
const axios = require('axios');


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "AdventuresPedia",
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'google-translate',
        name: 'google',
        content: 'notranslate',
      },
      {
        hid: 'title',
        name: 'title',
        content: 'AdventuresPedia'
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'AdventuresPedia',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'All content related to travel!',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Flights, Travel, Passport, Visa, Travel Guide'
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'index,follow',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: `AdventuresPedia`,
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
        'All content related to travel!',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'AdventuresPedia'
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://blog.travelpayouts.com/en/wp-content/themes/theme/images/header-logo.svg',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: `AdventuresPedia`,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'All content related to travel!',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://blog.travelpayouts.com/en/wp-content/themes/theme/images/header-logo.svg'
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico?v=2',
      },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap'
      // },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://fonts.googleapis.com/css2?family=Merriweather&display=swap'
      // },
      {}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/seo',
    { src: '~/plugins/vee-validate', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'vue-social-sharing/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    ['nuxt-mail', {
      message: {
        to: 'contact@adventurespedia.com',
      },
      smtp: {
        host: 'smtpout.secureserver.net',
        port: 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        },
      },
    }],
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_ID || ''
    }],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-3421792765391771' || ''
    }],
    ['@fengsi/nuxt-axios-cache', { 
      /* module options */
      cacheNodeTtl: 3600,
      cacheNodeLimit: 300,
      clearCacheRoutePath: '/_/nuxt-cache' // Clear cache route, request method is DELETE
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light:{
          primary: '#eb640e'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  sitemap: {
    routes: async () => {
      // Initiate axios
      const wp_url = 'https://blog.adventurespedia.com';
      const routes = ['/about', '/privacy-policy', '/terms-and-conditions', '/contact-us', '/',];

      // all the posts
      let response = await axios.get(`${wp_url}/index.php/wp-json/wp/v2/posts`, {
        params: {
          per_page: 100
        }
      });
      if(response && response.data){
        const blogPosts = response.data;
        for (let pi= 0; pi < blogPosts.length; pi+= 1) {
          routes.push(`/post/${blogPosts[pi].slug}`)
        }
      }

      // all the categories
      response = await axios.get(`${wp_url}/index.php/wp-json/wp/v2/categories`);
      if(response && response.data){
        const categories = response.data ? response.data.filter(c=>c.slug != 'uncategorized'):[]
        for (let pi= 0; pi < categories.length; pi+= 1) {
          routes.push(`/posts/${categories[pi].slug}`)
        }
      }

      return routes;
    },
    path: '/sitemap.xml',
    gzip: true,
    generate: false,
    server:{
      host: '0.0.0.0'
    }
  },
  robots: {
      UserAgent: '*',
      Sitemap: (req) => `https://www.adventurespedia.com/sitemap.xml`
  },
  serverMiddleware: [
  ],
}

