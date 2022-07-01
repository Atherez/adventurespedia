<<template>
  <v-container class="pb-5">
    <v-row justify="center">
        <v-col cols="auto" md="6" lg="4">
            <div class="text-center">
                <h1 class="primary--text mt-4">{{error.statusCode === 404 ? '404' : 'Error'}}</h1>
                <h4 class="text-uppercase secondary--text mt-3">{{error.statusCode === 404 ? 'Page Not Found' : 'Internal Server Error'}}</h4>
                <p v-if="error.statusCode === 404" class="text-muted mt-3">It's looking like you may have taken a wrong turn. Don't worry... it
                    happens to the best of us. Here's a
                    little tip that might help you get back on track.</p>
                <p v-else>
                  Why not try refreshing your page? or you can contact <a href="mailto:contact@adventurespedia.com">contact@adventurespedia.com</a>
                </p>
                <nuxt-link class="btn btn-info mt-3" to="/"><i class="mdi mdi-reply"></i> Return Home</nuxt-link>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
</style>
