<template>
  <div class="archive">
    <Info></Info>
   <!-- <top></top> -->
   <search data-step="1" data-intro="在此输入相关信息进行搜索" data-position="right"></search>
   <classify v-loading="loadingClassify" data-step="2" data-intro="根据条件分类筛选" data-position="top"></classify>
   <tag data-step="3" data-intro="更改条件" data-position="top"></tag>
   <mycontent data-step="4" data-intro="显示结果" data-position="bottom" v-loading="loadingContent"></mycontent>
   <bottom></bottom>
<Drag></Drag>
  </div>
</template>

<script>
import Info from '@/components/public/Info'
import top from './archive/top'
import search from './archive/search'
import classify from './archive/classify'
import tag from './archive/tag'
import mycontent from './archive/content'
import bottom from './archive/bottom'
import Drag from '@/components/public/drag'
export default {
  components: {Info, top, search, classify, tag, mycontent, bottom, Drag},
  data () {
    return {
      loadingClassify: true,
      loadingContent: true
    }
  },
  mounted () {
    // $('#archive').css('color', 'black')
    // $('#facilitator').css('color', 'black')
    // $('#puser').css('color', 'black')
    // $('#cuser').css('color', 'black')
    $('#archive').css('color', '#409EFF')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
  margin:1rem auto 0 auto;
}
.classify{
  width:80%;
  margin:1rem auto 0 auto;
}
.tag{
  width:80%;
  margin:1rem auto 0 auto;
}
.content{
  width:80%;
  margin:1rem auto 0 auto;
}
</style>
