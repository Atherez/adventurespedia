<template>
  <div class="post-page pa-4 pb-0">
    <v-container class="pt-4 pb-0 px-0 px-md-10">
      <v-row>
        <v-col cols="12">
          <h1 v-html="post.title.rendered"></h1>
          <v-row class="mt-0" align="center">
            <v-col cols="auto" color="primary">
              <v-btn
                v-if="post_category"
                class="small pa-0 font-weight-bold"
                :href="`/posts/${post_category.slug}`"
                color="primary"
                plain
                text
                tile
                v-html="post_category.name"
              >
              </v-btn>
            </v-col>
            <v-col cols="auto" class="pl-0 pl-sm-2 black--text text-subtitle-2">
              <span class="d-none d-sm-block">Updated: {{ new Date(post.modified).toLocaleDateString("en-US", {
                  year: 'numeric', month: 'long', day: 'numeric'
                })
              }}
              </span>
              <span class="d-block d-sm-none">
                {{ new Date(post.modified).toLocaleDateString("en-US", {
                  year: 'numeric', month: 'short', day: 'numeric'
                })
                }}
              </span>
            </v-col>
            <v-col cols="auto" class="pl-0 pl-sm-2 black--text text-subtitle-2 d-flex">
               <v-icon small color="grey lighten-1">mdi-clock</v-icon>
               <span class="d-none d-sm-block px-1">Reading time:</span>
              <read-time :text="post.content.rendered" :no_icon="true"/>
            </v-col>
            <v-col order="4" cols class="text-right pl-0" style="text-decoration: none">
              <ShareNetwork
                network="facebook"
                :url="currentURL"
                :title="post.title.rendered"
                :description="post.excerpt.rendered"
                :quote="post.excerpt.rendered"
              >
                <v-icon color="primary">mdi-facebook</v-icon>
              </ShareNetwork>
              <ShareNetwork
                network="twitter"
                :url="currentURL"
                :title="post.title.rendered"
                :description="post.excerpt.rendered"
                :quote="post.excerpt.rendered"
                class="ml-1"
              >
                <v-icon color="info">mdi-twitter</v-icon>
              </ShareNetwork>
            </v-col>
          </v-row>
          <v-img
            class="mt-6"
            width="100%"
            v-if="post.yoast_head_json['og_image'] && post.yoast_head_json['og_image'][0]"
            :src="post.yoast_head_json['og_image'][0].url"/>
        </v-col>
        <v-col cols="12" v-html="post.content.rendered">
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="py-5">
        <v-col cols="6">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row class="pt-5 "  v-if="post" no-gutters >
        <v-col cols="12" md="4" class="pt-0 pb-md-10">
          <author-card :author="post_author" />
        </v-col>
        <v-col cols="12" md="8" class="pt-3 pt-md-0 pb-10">
          <post-list :posts="category_posts" :title="'Related Posts'"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "@/components/Loader";
import ReadTime from '@/components/ReadTime.vue';
import PostList from '@/components/PostsList.vue';
import AuthorCard from '@/components/AuthorCard.vue';

export default {
  components: {
    Loader,
    ReadTime,
    PostList,
    AuthorCard,
  },
  computed: {
    categories () {
      return this.$store.state.categories.initialized ? this.$store.state.categories.items : []
    },
    authors () {
      return this.$store.state.authors.initialized ? this.$store.state.authors.items : []
    },
    post_category(){
      if(!this.post || !this.post.categories) return null;
      return this.categories.filter(c=> c.id == this.post.categories[0])[0]
    },
    category_posts(){
      if(this.post_category && this.$store.state.posts.category_posts)
        return this.$store.state.posts.category_posts[this.post_category.id].filter(p=> p.id != this.post.id)
      return []
    },
    post_author(){
      if(!this.post || !this.post.author) return null;
      return this.authors.filter(a=> a.id == this.post.author)[0]
    }
  },
  head(){
    const title = `${this.post.title.rendered} - ${this.$store.state.config.site_title}`;
    const description = this.post.excerpt.rendered;
    return this.$seo(title, description, this.$route.path, [
      { hid: 'og:image', name: 'og:image', content: `https:${this.post.yoast_head_json['og_image'][0].url}` },
      { hid: 'twitter:image', name: 'og:image', content: `https:${this.post.yoast_head_json['og_image'][0].url}` },
      { hid: 'og:type', name: 'og:type', content: 'article' },
    ]);
  },
  async asyncData({ route, error, store }) {
   const slug =  route.params.slug
   try{
    if(!slug)
      throw 'Not Found';
    const response = await axios.get(`${store.state.config.wp_url}/wp-json/wp/v2/posts`, {
        params: {
          slug
          }
      });
    if(!response || !response.data || !response.data.length)
      throw 'Not Found';
    return {
      post: response.data[0]
    }
    }catch(err){
      return error({statusCode: 404, message: 'not found'});
   }
  },
  data(){
    return {currentURL: ''}
  },
  mounted() {
    this.currentURL = window ? window.location.href : '';
  }
};
</script>
<style lang="scss">
.post-page {
  .share-network-facebook{
    text-decoration: none !important;
  }
  .share-network-twitter{
    text-decoration: none !important;
  }
}
</style>
