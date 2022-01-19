<template>
  <v-app>
    <v-app-bar app :color="'white'" elevation="0">
      <v-container class="px-0">
        <v-row align="center" justify="space-between" class="py-4">
          <v-col cols="auto">
            <a href="/">
              <v-img
                :lazy-src="$store.state.config.site_logo"
                max-height="120"
                max-width="200"
                :src="$store.state.config.site_logo"
              ></v-img>
            </a>
          </v-col>
          <v-col cols class="d-none d-md-block">
            <v-btn
              class="ma-1 font-weight-bold "
              nuxt
              text
              v-for="item of menu_items"
              :key="item.slug"
              :href="`/posts/${item.slug}`"
              :color="`/posts/${item.slug}` == $route.path?'primary':'dark'"
            >
              <span v-if="!item.children" v-html="item.name"></span>
              <v-menu
                v-else
                bottom
                offset-y
                open-on-hover
              >
                <template v-slot:activator="{ on, attrs }">
                  <a
                    v-bind="attrs"
                    v-on="on"
                    style="text-decoration:none; color: inherit;"
                    class="font-weight-bold "
                    :href="`/posts/${item.slug}`"
                    :color="`/posts/${item.slug}` == $route.path?'primary':'dark'"
                  >
                    <span v-html="item.name"></span>
                  </a>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(item2, index) in item.children"
                    :key="index"
                    :href="`/posts/${item2.slug}`"
                    :color="`/posts/${item2.slug}` == $route.path?'primary':'dark'"
                  >
                    <v-list-item-title v-html="item2.name"></v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <div class="d-none d-md-block">
              <v-btn color="primary" depressed href="#join-newsletter">
                Join Newsletter
              </v-btn>
            </div>
            <v-btn icon class="my-auto d-block d-md-none" @click.stop="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters class="d-none d-md-block bg-white">
          <v-col>
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-divider class="d-block d-md-none"></v-divider>
      <v-container fluid class="px-0 pb-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" :right="true" temporary fixed class="grey darken-4 darken-4">
      <div class="fill-height d-flex flex-column justify-space-between">
        <v-list>
          <v-list-item
            v-for="(item, i) in menu_items"
            :key="i"
            link
            :href="`/posts/${item.slug}`"
            :class="item.children?'px-0':''"
          >
            <v-list-item-content :class="item.children?'py-0':''">
              <v-list-item-title v-if="!item.children" class="white--text font-weight-bold text-button">
                <span v-html="item.name"></span>
              </v-list-item-title>
              <v-list v-else class="py-0 my-0">
                <v-list-item
                  link
                  :href="`/posts/${item.slug}`">
                  <v-list-item-content>
                    <v-list-item-title class="white--text font-weight-bold text-button">
                      <span v-html="item.name"></span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                    v-for="(sub_item, j) in item.children"
                    :key="j"
                    link
                    :href="`/posts/${sub_item.slug}`"
                  >
                  <v-list-item-content>
                    <v-list-item-title class="white--text pl-5 text-button">
                      <span v-html="sub_item.name"></span>
                    </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
              </v-list>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            :href="`/about`">
            <v-list-item-content>
              <v-list-item-title class="white--text font-weight-bold text-button">
                <span>About Us</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div class="px-4 pb-4">
          <v-btn id="callback-topnav" color="primary" block href="#join-newsletter">
            Join Newsletter
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>
    <template>
  <v-footer
    color="blue-grey darken-4"
  >
    <v-row
      justify="start"
      no-gutters
      class="pt-2"
    >
      <v-col cols="12" md="6">
        <v-btn
          text
          rounded
          disabled
          class="pl-0 my-0">
          <span class="grey--text">Quick Links</span>
        </v-btn>
        <div
          v-for="link in links"
          :key="link.url"
        >
          <v-btn
            color="white"
            text
            link
            class="px-0 my-0"
            :href="link.url"
          >
            {{ link.text }}
          </v-btn>
        </div>
      </v-col>
      <v-col cols class="pt-2 pt-md-3 fill-height my-auto">
          <div class="text-subtitle-2 grey--text">
            WANT TO GET LATEST UPDATES WHENEVER WE POST A NEW BLOG?
          </div>
          <div class="d-flex align-items-center mt-2" id="join-newsletter">
            <div class="flex-grow-1">
              <v-text-field
                label="Your email"
                solo
                dark
                hide-details
                type="email"
                flat
                dense
              >
              </v-text-field>
            </div>
            <div class="px-2">
              <v-btn color="primary">
                Subscribe
              </v-btn>
            </div>
          </div>
          <div class="mt-2 text-subtitle-2 grey--text">
            By clicking you agree to <a class="text-subtitle-2" href="/privacy-policy">The Privacy Policy </a>
          </div>
      </v-col>
      <v-col
        class="py-4 text-center grey--text"
        cols="12"
      >
        <span>&copy; {{ new Date().getFullYear() }}</span> — Travel Payouts
      </v-col>
    </v-row>
  </v-footer>
</template>
  </v-app>
</template>

<script>
export default {
  computed: {
    menu_items () {
      return this.$store.state.categories.initialized?  this.$store.state.categories.items : []
    },
  },
  data() {
    return {
      links:[
        {text: 'About', url: '/about'},
        {text: 'Contact Us', url: '/contact-us'},
        {text: 'Terms and Conditions', url: '/terms-and-conditions'},
        {text: 'Privacy Policy', url: '/privacy-policy'},
      ],
      drawer: false,
      fixed: false,
      title: 'Vuetify.js',
    };
  },
  watch: {
  },
  async created() {
  },
  methods: {
  },
};
</script>
