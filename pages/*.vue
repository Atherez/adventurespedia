<script lang="ts">
export default {
  async asyncData({error}) {
    return error({statusCode: 404, message: 'not found'});
  }
}
</script>
