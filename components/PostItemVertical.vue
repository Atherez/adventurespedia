<template>
  <div class="vertical-post-item fill-height" >
    <v-card
    hover
    class="mx-auto fill-height d-flex flex-column"
    v-if="post"
    :href="`/post/${post.slug}`"
  >
    <div :style="`min-height:${imageHeight}`">
        <client-only>
          <v-img
            :height="imageHeight"
            v-if="post.yoast_head_json['og_image'] && post.yoast_head_json['og_image'][0]"
            :src="post.yoast_head_json['og_image'][0].url"
          >
            <v-btn
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
        </client-only>
    </div>

    <v-card-text class="post-meta pb-0 d-flex align-items-center justify-content-center">
      <div class="black--text font-weight-bolder flex-grow-1 ">
      {{ new Date(post.date).toLocaleDateString("en-US", {
        year: 'numeric', month: 'long', day: 'numeric'
      }) }}
      </div>
      <!-- <div class="pl-3">
        <read-time :text="post.content.rendered"/>
      </div> -->
    </v-card-text>

    <v-card-title class="post-title pt-1 pb-0">{{ post.title.rendered }}</v-card-title>

    <v-card-text class="post-excerpt pt-1 flex-grow-1" v-html="post.excerpt.rendered">
    </v-card-text>

    <v-card-text class="pt-2" >
      <a style="text-decoration: none;" class="primary--text font-weight-bold" :href="`/post/${post.slug}`"> READ MORE > </a>
    </v-card-text>
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
      imageHeight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return '185px'
          case 'sm': return '185px'
          case 'md': return '240px'
          case 'lg': return '200px'
          case 'xl': return '200px'
        }
      },
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
.vertical-post-item {
}
</style>
