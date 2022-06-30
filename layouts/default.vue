<template>
  <v-app>
    <v-app-bar app :color="'white'" elevation="0">
      <v-container class="px-0">
        <v-row align="center" justify="space-between" class="py-4">
          <v-col cols="auto">
            <a href="/">
              <img
                lazy-src="~/assets/images/logo-nav.png"
                width="180"
                src='~/assets/images/logo-nav.png'
              />
            </a>
          </v-col>
          <v-col cols class="d-none d-md-block mt-2">
            <v-btn
              class="ma-1 font-weight-bold"
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
              <v-btn color="primary" depressed class="text--white" href="#join-newsletter">
                Join Newsletter
              </v-btn>
            </div>
            <v-btn icon class="my-auto d-block d-md-none" @click.stop="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
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
          <v-list-item link :href="'/'">
             <v-list-item-content class="py-0 white--text font-weight-bold text-button">
               Home
             </v-list-item-content >
          </v-list-item>
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
          <v-btn id="callback-topnav" color="primary" block :href="$store.state.config.mailchimp_form" target="_blank">
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
          <div>
      <validation-observer
      v-slot="{ invalid }"
      ref="subscribe"
      tag="form"
      @submit.prevent="!invalid">
      <v-container fluid class="pl-0 pb-0">
        <v-row align="center" no-gutters>
          <v-col cols>
            <validation-provider
              rules="required|email"
              :bails="false"
              tag="div"
              name="Email"
              v-slot="{ errors }"
              >

              <v-text-field
                  id="join-newsletter"
                  label="Your email"
                  solo
                  dark
                  hide-details
                  type="email"
                  flat
                  dense
                  v-model="form.email"
                >
                </v-text-field>
            </validation-provider>
          </v-col>
          <v-col cols="12" sm="auto">
            <div class="pt-2 pl-0 pl-sm-2 pt-sm-0 pr-2">
                <v-btn color="primary" type="submit" :disabled="invalid || processing" :href="$store.state.config.mailchimp_form" target="_blank">
                Join Newsletter
                </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="mt-2 text-subtitle-2 grey--text">
        By clicking you agree to <a class="text-subtitle-2" href="/privacy-policy">The Privacy Policy </a>
      </div>
    </validation-observer>
          </div>
      </v-col>
      <v-col
        class="py-4 text-center grey--text"
        cols="12"
      >
      <div>
            AdventuresPedia is reader-supported. When you buy through links on our site, we may earn an affiliate commission.
          </div>
        <span>&copy; {{ new Date().getFullYear() }}</span> — AdventuresPedia
      </v-col>
    </v-row>
     <v-snackbar
      v-model="snackbar"
    >
      {{ snackbar_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-footer>
</template>
  </v-app>
</template>

<script>
import axios from "axios";
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
      form: {
        email: ''
      },
      cachedForm: {},
      invalid: false,
      snackbar_text: '',
      processing: false,
      snackbar: false
    };
  },
  watch: {
  },
  async created() {
  },
  methods: {
  },
  mounted(){
    this.cachedForm = {...this.form}
  }
};
</script>
<style>
#app {
   font-family: "Nunito Sans", Arial;
   font-size: 1.1em;
   line-height: 1.5;
}
h1,h2,h3,h4,h5,h6 {
  font-family: "Pathway Gothic One", Arial !important;
  font-size: 2em;
  line-height: 1.5;
}
.post-title {
  font-family: "Pathway Gothic One", Arial !important;
  font-size: 1.75em;
}

.post-excerpt {
  font-family: "Nunito Sans", Arial !important;
  font-size: 1.1em;
  line-height: 1.5;
}
header, footer{
  font-family: "Roboto" !important;
}
</style>
