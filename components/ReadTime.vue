<template>
  <span>
    <v-icon small color="grey lighten-1" v-if="!no_icon">mdi-clock</v-icon> {{timeToRead}} min.
  </span>
</template>

<script>
function readingTime(text) {
  const wpm = 225
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wpm)
}

export default {
  data() {
    return {
      timeToRead: undefined,
    }
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    no_icon:{
      type: Boolean,
      required: false
    }
  },
  mounted() {
    this.timeToRead = readingTime(this.text)
  },
}
</script>
