<template>
  <div class="horizontal-post-item">
    <v-card
    hover
    class="mx-auto h-100"
    v-if="post"
    :href="`/post/${post.slug}`"
    >
    <v-container fluid class="px-0">
    <v-row class="px-0 mx-0">
      <v-col cols="5" class="pa-0">
        <v-img
          height="100%"
          v-if="post.jetpack_featured_media_url"
          :src="post.jetpack_featured_media_url"
        >
          <v-btn
            v-if="post_category"
            class="ma-2 p-0 white--text font-weight-bold small"
            :color="stringToColour(post_category.name)"
            :href="`/posts/${post_category.slug}`"
            elevation="2"
            tile
            x-small
            v-html="post_category.name"
          >
          </v-btn>
        </v-img>
      </v-col>
      <v-col col class="py-0 px-0">
        <v-card-text class="post-meta pb-0 d-flex align-items-center justify-content-center">
          <div class="black--text font-weight-bolder flex-grow-1 ">
          {{ new Date(post.date).toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric'
          }) }}
          </div>
          <!-- <div class="pl-md-3">
            <read-time :text="post.content.rendered"/>
          </div> -->
        </v-card-text>

        <v-card-title class="post-title pt-1 pb-0">{{ post.title.rendered }}</v-card-title>

        <v-card-text class="post-excerpt pt-1">
          <div>
            This year, there are so many great Black Friday deals. So, hurry up and share them with your audience!
          </div>
        </v-card-text>

        <v-card-text class="pt-2">
          <a style="text-decoration: none;" class="primary--text font-weight-bold" :href="`/post/${post.slug}`"> READ MORE > </a>
        </v-card-text>
      </v-col>
    </v-row>
    </v-container>
  </v-card>
  </div>
</template>

<script>
import ReadTime from './ReadTime.vue';
export default {
  components:{ReadTime},
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
      categories () {
        return this.$store.state.categories.initialized ? this.$store.state.categories.items : []
      },
      post_category(){
        if(!this.post || !this.post.categories) return null;
        return this.categories.filter(c=> c.id == this.post.categories[0])[0]
      }
    },
    methods: {
      stringToColour(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 0xFF;
          colour += ('77' + value.toString(16)).substr(-2);
        }
        return colour;
      }
    }
};
</script>

<style lang="scss">
.horizontal-post-item {
}
</style>
