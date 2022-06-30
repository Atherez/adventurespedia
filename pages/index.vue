<template>
  <div class="home-page">
    <Loader v-if="loading" />
    <div v-else>
      <div class="px-4 pt-2 pb-6 mb-6">
      <v-container class="highlighted-posts px-4" v-if="posts && posts.recent_posts">
        <v-row class="pt-0 pt-md-3" align-content="stretch">
          <v-col cols="12" md="5" class="px-0 pb-0">
            <div class="fill-height d-none d-md-block">
            <post-item-vertical :post="posts.recent_posts[0]"/>
            </div>
             <div class="d-block d-md-none">
            <post-item-vertical :post="posts.recent_posts[0]"/>
            </div>
            <div class="d-block d-md-none pt-2">
            <post-item-vertical v-if="posts.recent_posts[1]" :post="posts.recent_posts[1]"/>
            </div>
            <div class="d-block d-md-none pt-2">
            <post-item-vertical v-if="posts.recent_posts[2]" :post="posts.recent_posts[2]"/>
            </div>
          </v-col>
          <v-col cols="12" md="7" class="h-100 px-0 pl-md-2 pr-md-0 pb-0 d-none d-md-flex flex-column justify-space-between">
            <post-item-horizontal v-if="posts.recent_posts[1]" :post="posts.recent_posts[1]"/>
            <post-item-horizontal v-if="posts.recent_posts[2]" :post="posts.recent_posts[2]" class="pt-2"/>
          </v-col>
        </v-row>
      </v-container>
      </div>
      <div class="grey lighten-4 px-4 py-4 mb-0">
      <v-container v-if="posts && posts.recent_posts">
        <v-row class="py-md-4">
          <v-col cols="12" md="12" class="px-0 pb-0">
            <v-row>
              <v-col>
                <div class="section-title">RECENT posts</div>
                <v-divider class="mt-2"></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[3]" :post="posts.recent_posts[3]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[4]" :post="posts.recent_posts[4]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[5]" :post="posts.recent_posts[5]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[6]" :post="posts.recent_posts[6]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[7]" :post="posts.recent_posts[7]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[8]" :post="posts.recent_posts[8]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[9]" :post="posts.recent_posts[9]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[10]" :post="posts.recent_posts[10]"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <post-item-vertical v-if="posts.recent_posts[11]" :post="posts.recent_posts[11]"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import PostItemVertical from "@/components/PostItemVertical";
import PostItemHorizontal from "@/components/PostItemHorizontal";
import PostsList from "@/components/PostsList";
import Loader from "@/components/Loader";

export default {
  components: {
    Loader,
    PostsList,
    PostItemVertical,
    PostItemHorizontal
  },
  computed: {
    posts(){
      return this.$store.state.posts.initialized ? {
        recent_posts: this.$store.state.posts.recent_posts,
        } : {}
    },
    loading(){
      return !this.$store.state.posts.initialized
    },
  },
  async asyncData({store}) {
    await store.dispatch('posts/init');
  },
  head(){
    const title = `${this.$store.state.config.site_title} | Home`;
    const description = 'Welcome to AdventuresPedia'
    return this.$seo(title, description, this.$route.path);
  },
};
</script>
<style lang="scss">
.home-page {
  .section-title {
    text-transform: uppercase;
    font-size: 19px;
    line-height: 23px;
    font-weight: 600;
  }
}
</style>
