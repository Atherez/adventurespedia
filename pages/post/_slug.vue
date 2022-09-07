<template>
  <div class="post-page pa-4 pb-0">
    <v-container class="pt-4 pb-0 px-0 px-md-10">
      <v-row>
        <v-col cols="12">
          <h1 v-html="post.title.rendered"></h1>
          <!-- Ezoic - under_page_title - under_page_title -->
          <div id="ezoic-pub-ad-placeholder-101"> </div>
          <!-- End Ezoic - under_page_title - under_page_title -->
          <v-row class="mt-0" align="center">
            <v-col cols="auto" color="primary" class="py-0">
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
            <v-col cols="auto" class="pl-0 pl-sm-2 black--text text-subtitle-2 py-0">
              <span>
                Author: <a :href="`/author/${post_author.slug}`"  style="text-decoration: none;">
                  {{post_author.name}}
                </a>
              </span>
            </v-col>
            <v-col cols="auto" class="pl-0 pl-sm-2 black--text text-subtitle-2 py-0">
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
            <!-- <v-col cols="auto" class="pl-sm-2 black--text text-subtitle-2 d-flex py-0">
               <v-icon small color="grey lighten-1">mdi-clock</v-icon>
               <span class="d-none d-sm-block px-1">Reading time:</span>
              <read-time :text="post.content.rendered" :no_icon="true"/>
            </v-col> -->
            <v-col order="5" order-sm="4" cols class="text-left text-sm-right pl-sm-0 py-0" style="text-decoration: none">
              <div class="d-flex align-items-center d-sm-block">
              <div class="d-block d-sm-none text-overline pr-2"> Share : </div>
              <div>
              <ShareNetwork
                network="facebook"
                :url="currentURL"
                :title="format(post.title.rendered)"
                :description="format(post.excerpt.rendered)"
                :quote="format(post.title.rendered)"
              >
                <v-icon color="blue">mdi-facebook</v-icon>
              </ShareNetwork>
              <ShareNetwork
                network="twitter"
                :url="currentURL"
                :title="format(post.title.rendered)"
                :description="format(post.excerpt.rendered)"
                :quote="format(post.title.rendered)"
                class="ml-1"
              >
                <v-icon color="info">mdi-twitter</v-icon>
              </ShareNetwork>
              <ShareNetwork
                network="whatsapp"
                :url="currentURL"
                :title="format(post.title.rendered)"
                :description="format(post.excerpt.rendered)"
                :quote="format(post.title.rendered)"
                class="ml-1"
              >
                <v-icon color="green">mdi-whatsapp</v-icon>
              </ShareNetwork>
              <ShareNetwork
                network="linkedin"
                :url="currentURL"
                :title="format(post.title.rendered)"
                :description="format(post.excerpt.rendered)"
                :quote="format(post.title.rendered)"
                class="ml-1"
              >
                <v-icon color="blue">mdi-linkedin</v-icon>
              </ShareNetwork>
              <ShareNetwork
                network="pinterest"
                :url="currentURL"
                :title="format(post.title.rendered)"
                :description="format(post.excerpt.rendered)"
                :quote="format(post.title.rendered)"
                class="ml-1"
              >
                <v-icon color="red">mdi-pinterest</v-icon>
              </ShareNetwork>
              </div>
              </div>
            </v-col>
            <v-col cols="12" order="4" order-sm="5">
              <img
                width="100%"
                v-if="post.jetpack_featured_media_url"
                :src="post.jetpack_featured_media_url"/>
            </v-col>
          </v-row>
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
        <v-col cols="12" class="pt-3 pt-md-0 pb-10">
          <post-list :posts="category_posts" :title="'Recent Posts'"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <adsbygoogle />
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
import htmlToFormattedText from "html-to-formatted-text";

export default {
  components: {
    Loader,
    ReadTime,
    PostList,
    AuthorCard,
  },
  methods:{
    format(html){
      return htmlToFormattedText(html);
    }
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
      if(this.post_category && this.$store.state.posts.recent_posts)
        return this.$store.state.posts.recent_posts.filter(p=> p.id != this.post.id)
      return []
    },
    post_author(){
      if(!this.post || !this.post.author) return null;
      return this.authors.filter(a=> a.id == this.post.author)[0]
    }
  },
  head(){
    const title = `${this.post.title.rendered} - ${this.$store.state.config.site_title}`;
    const description = this.post.yoast_head_json ? this.post.yoast_head_json.description : '';
    return this.$seo(title, description, this.$route.path, [
      { hid: 'og:image', name: 'og:image', content: this.post.jetpack_featured_media_url },
      { hid: 'twitter:image', name: 'twitter:image', content: this.post.jetpack_featured_media_url },
      { hid: 'og:type', name: 'og:type', content: 'article' },
    ]);
  },
  async asyncData({ route, error, store }) {
   const slug =  route.params.slug
   try{
    if(!slug)
      throw 'Not Found';

    await store.dispatch('posts/init');
    const response = await axios.get(`${store.state.config.wp_url}/wp-json/wp/v2/posts`, {
        params: {
          slug
          }
      });
    if(!response || !response.data || !response.data.length)
      throw 'Not Found';
    const post  = response.data[0];
    return {
      post:post
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
  .share-network-whatsapp{
    text-decoration: none !important;
  }
  .share-network-linkedin{
    text-decoration: none !important;
  }
  .share-network-pinterest{
    text-decoration: none !important;
  }
  img{
    max-width: 100%
  }
  table {
    display: block;
    height: auto;
    max-height: 500px;
    max-width: 100%;
    overflow: scroll;
  }
  table td, th{
    min-width: 150px;
    padding: 5px;
    border: 1px solid black;
  }
  figure{
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .img-responsive{
    margin: auto;
    max-width: 100%; 
    display: block; 
    height: auto;
  }
}
</style>
