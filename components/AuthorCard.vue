<template>
  <div class="author-card fill-height pl-md-4">
    <v-card
    class="mx-auto fill-height"
    >
     <v-container fluid>
       <v-row align="center">
         <v-col cols="12" class="my-0 py-0">
            <v-card-title class="title">
              Written by
            </v-card-title>
         </v-col>
         <v-col cols="5" align="center" class="pt-0">
           <v-avatar
              size="70px"
            >
              <img
                v-if="author"
                :alt="author.name"
                :src="author.avatar_urls['96']"
              >
            </v-avatar>
         </v-col>
         <v-col cols>
            <h3>{{author.name}}</h3>
            <div class="d-flex align-items-center"  v-if="author.yoast_head_json.schema['@graph'].filter(s=> s['@type'] == 'Person').length">
              <div class="my-auto text-caption">Follow me on</div>
              <v-btn
                icon
                class="primary--text"
                :href="author.yoast_head_json.schema['@graph'].filter(s=> s['@type'] == 'Person')[0].sameAs[0]"
                target="_blank"
                color="blue">
                <v-icon>mdi-linkedin</v-icon>
              </v-btn>
            </div>
         </v-col>
         <v-col cols="12" class="pt-0">
           <div class="text-subtitle-2 px-3">{{author.description}}</div>
         </v-col>
       </v-row>
     </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      default: () => {}
    },
  }
};
</script>

<style lang="scss">
.author-card {
  .title{
    font-size: 19px;
    line-height: 23px;
    font-weight: 600;
  }
}
</style>
