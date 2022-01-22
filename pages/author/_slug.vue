<template>
  <div class="author-page pa-4">
    <v-container class="py-4 px-0 px-lg-10">
      <client-only>
      <v-row v-if="current_author" justify="center" class="pb-6">
        <v-col cols="12" class="text-center text-button pb-0">
          Posts by
        </v-col>
        <v-col cols="12" class="text-center pb-0">
           <v-avatar
              size="100px"
            >
              <img
                :alt="current_author.name"
                :src="current_author.avatar_urls['96']"
              >
            </v-avatar>
        </v-col>
         <v-col cols="12" class="text-center text-button py-0">
          {{ current_author.name}}
          <span v-if="current_author.yoast_head_json.schema['@graph'].filter(s=> s['@type'] == 'Person').length">
            <a
              :href="current_author.yoast_head_json.schema['@graph'].filter(s=> s['@type'] == 'Person')[0].sameAs[0]"
              target="_blank"
              >
              <v-icon color="blue">mdi-linkedin</v-icon>
            </a>
          </span>
        </v-col>
         <v-col cols="12" md="6" class="text-center text-body-2 pt-0">
          {{ current_author.description}}
        </v-col>
      </v-row>
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
    authors () {
      return this.$store.state.authors.initialized ? this.$store.state.authors.items : []
    },
  },
  head(){
    const title = `${this.$store.state.config.site_title} | ${this.current_author.name}`;
    const description = this.current_author.description;
    return this.$seo(title, description, this.$route.path);
  },
  async asyncData({ route, error, store }) {
   const slug = route.params.slug
   const page = 1
   const per_page = 12
   try{
    let posts= [];
    if(!slug)
      throw 'Not Found';

    let current_author = store.state.authors.items.filter(c=> c.slug == slug)[0];

    if(!current_author)
      throw 'Not Found';

    let params = {
        per_page,
        page,
        author: [current_author.id]
    };

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
      current_author
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
            author: [this.current_author.id],
            per_page: this.per_page,
            page: this.page,
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
.author-page {

}
</style>
