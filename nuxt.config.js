import colors from 'vuetify/es5/util/colors';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Swati's Blog",
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
        content: `Swati's Blog`,
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: `Swati's Blog`,
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
        content: `Swati's Blog`,
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
        content: `Swati's Blog`,
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
        content: `Swati's Blog`,
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
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/seo',
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
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

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
  }
}
