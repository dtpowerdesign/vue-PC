<template>
  <div>
    <Index></Index>
  </div>
</template>

<script>
import Index from '@/components/changeTable/template'
export default {
  components: {Index},
  data () {
    return {
      'type': 'projects',
      'otherName': 'phtzixing'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
