<template>
  <div class="archive">
   <top></top>
   <search></search>
   <classify v-loading="loadingClassify"></classify>
   <tag></tag>
   <mycontent v-loading="loadingContent"></mycontent>
   <bottom></bottom>
  </div>
</template>

<script>
import top from './archive/top'
import search from './archive/search'
import classify from './archive/classify'
import tag from './archive/tag'
import mycontent from './archive/content'
import bottom from './archive/bottom'
export default {
  components: {top, search, classify, tag, mycontent, bottom},
  data () {
    return {
      loadingClassify: true,
      loadingContent: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  margin:5rem auto 0 auto;
}
.classify{
  width:80%;
  margin:4rem auto 0 auto;
}
.tag{
  width:80%;
  margin:4rem auto 0 auto;
}
.content{
  width:80%;
  margin:4rem auto 0 auto;
}
</style>
