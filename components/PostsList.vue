<template>
  <div class="post-list fill-height pl-md-4">
    <v-card
    class="mx-auto fill-height"
    >
    <v-card-title class="title">
      {{ title }}
    </v-card-title>
    <v-card-text v-for="(post,index) of posts" :key="post.slug">
      <a :href="`/post/${post.slug}`" style="text-decoration: none; color: inherit;">
        <div class="d-flex align-items-center">
          <v-icon small color="blue" class="smaller">
            mdi-circle
          </v-icon>
          <div class="pl-2 title-small" v-html="post.title.rendered">
          </div>
        </div>
        <div class="px-1" v-html="post.excerpt.rendered">
        </div>
      </a>
      <v-divider v-if="index != (posts.length - 1)" class="mb-0 mt-4 py-0"></v-divider>
    </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Title'
    }
  }
};
</script>

<style lang="scss" scoped>
.post-list {
  .title{
    font-size: 19px;
    line-height: 23px;
    font-weight: 600;
  }
  .title-small{
    font-size: 15px;
    line-height: 23px;
    font-weight: 600;
    color: black;
  }
}
</style>
