<template>
  <div class="archive">
   <top></top>
   <search></search>
   <classify></classify>
   <tag></tag>
  </div>
</template>

<script>
import top from './archive/top'
import search from './archive/search'
import classify from './archive/classify'
import tag from './archive/tag'
export default {
  components: {top, search, classify, tag},
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  margin:5rem auto 0 auto;
}
</style>
