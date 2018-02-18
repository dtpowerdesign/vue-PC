<template>
  <div class="person-register">
   <div class="title"><span style="font-size:2rem;margin-left:1.7rem">个人业绩</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <myClassify v-loading="loadingClassify"></myClassify>
   <myTag></myTag>
   <myTable v-loading="loadingContent"></myTable>
  </div>
</template>

<script>
import myTable from '@/components/person/person-table'
import myClassify from '@/components/person/person-classify'
import myTag from '@/components/person/person-tag'
export default {
  components: {myTable, myClassify, myTag},
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
.person-register{
  width:90%;
  margin:1rem auto 0 auto;
}
.title{
  text-align:left;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.person-classify{
   background-color:white;
}
.person-tag{
  background-color:white;
  margin-top:0rem;
}
.person-table{
  margin-top:1rem;
  background-color:white;
}
</style>
