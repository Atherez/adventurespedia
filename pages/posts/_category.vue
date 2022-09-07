<template>
  <div class="posts-page pa-4">
    <v-container class="py-4 px-0 px-lg-10">
      <v-row v-if="tags.length > 1">
        <v-col cols="auto" v-for="tag of init_tags" :key="tag.id" class="px-0 ">
         <v-btn
            class="ma-2 p-0 white--text font-weight-bold small"
            :color="(!tag.id && !tags.length) || (tags.includes(tag.id))?'primary':'grey'"
            elevation="2"
            tile
            v-html="tag?tag.name:'All Posts'"
            @click="updateTag(tag.id)"
          >
          </v-btn>
        </v-col>
      </v-row>
      <client-only>
      <!-- Ezoic - under_page_title - under_page_title -->
      <div id="ezoic-pub-ad-placeholder-101"> </div>
      <!-- End Ezoic - under_page_title - under_page_title -->
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="post of posts" :key="post.slug">
          <post-item-vertical  :post="post"/>
        </v-col>
      </v-row>
      </client-only>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn
            v-if="more_posts"
            :color="loading? 'warning':'primary'"
            @click="updatePage()"
            class="mt-2"
            small
          >
          {{ loading?'Loading...':'Show More' }}
          </v-btn>
          <div v-else class="mt-2">
            Thats all we have right now!
          </div>
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
import PostItemVertical from "@/components/PostItemVertical";

export default {
  components: {
    PostItemVertical,
  },
  computed: {
     init_tags () {
      return this.$store.state.tags.initialized ? [{id:null, name:'All'}, ...(this.$store.state.tags.items)] : []
    },
  },
  head(){
    const title = `${this.$store.state.config.site_title} | ${this.current_category?this.current_category.name: 'All Posts'}`;
    const description = this.current_category?this.current_category.description : 'All the posts from our writers';
    return this.$seo(title, description, this.$route.path);
  },
  async asyncData({ route, error, store }) {
   const slug = route.params.category
   const page = 1
   const per_page = slug ? 12 : 30;
   try{
    let categories = [];
    let posts= [];
    let current_category = null
    if(slug){
      let cat = store.state.categories.items.filter(c=> c.slug == slug);
      if(!cat || !cat.length)
        throw 'Not Found';
      else
        cat = cat[0];
      categories.push(cat.id)
      current_category = cat
    } else{
      categories = store.state.categories.items.map(cat=>cat.id)
    }

    let params = {
        per_page,
        page
    };

    if(categories.length)
      params['categories'] = categories

    const response = await axios.get(`${store.state.config.wp_url}/wp-json/wp/v2/posts`, {
      params
    });
    if(response && response.data)
      posts = response.data || []
    return {
      posts: [],
      page,
      per_page,
      posts,
      more_posts: true,
      categories: categories,
      current_category
    }
    }catch(err){
      return error({statusCode: 404, message: err});
   }
  },
  data(){
    return {
      loading: false,
      tags: []
    }
  },
  methods: {
    async loadPosts(replace){
      this.loading = true;
      if(replace){
        this.more_posts = true;
        this.page = 1;
      }
      try{
        const response = await axios.get(`${store.state.config.wp_url}/wp-json/wp/v2/posts`, {
          params: {
            categories: this.categories,
            per_page: this.per_page,
            page: this.page.length,
            tags: this.tags
          }
        });
        if(response && response.data && response.data.length){
          if(replace)
            this.posts = response.data || []
          else
            this.posts = [...this.posts, ...(response.data || [])]
        }
        else
          this.more_posts = false
      }catch(err){
        this.more_posts = false
      }finally{
        this.loading = false
      }
    },
    async updateTag(id){
      if(!id)
        this.tags = []
      else{
        if(this.tags.includes(id))
          this.tags.splice(this.tags.indexOf(), 1)
        else
          this.tags.push(id)
      }
      await this.loadPosts(true)
    },
    async updatePage(){
      this.page = this.page + 1;
      await this.loadPosts()
    }
  }
};
</script>
<style lang="scss">
.posts-page {

}
</style>
