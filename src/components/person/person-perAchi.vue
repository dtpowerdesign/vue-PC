<template>
  <div class="person-register">
   <div class="title"><span style="font-size:2rem;">个人业绩</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <div class="xxx">
   <myClassify v-loading="loadingClassify"></myClassify>
   <myTag></myTag>
   </div>
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
  margin-bottom: 2rem;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.xxx{
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.person-classify{
   background-color:white;
}
.person-tag{
  background-color:white;
}
.person-table{
  margin-top:1rem;
  background-color:white;
  padding: 1.5rem;
}
</style>
