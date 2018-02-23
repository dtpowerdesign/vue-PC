<template>
  <div class="company-register">
   <div class="title"><span style="font-size:2rem;margin-left:1.7rem">个人业绩</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <myClassify v-loading="loadingClassify"></myClassify>
   <myTag></myTag>
   <myTable v-loading="loadingContent"></myTable>
  </div>
</template>

<script>
import myTable from '@/components/company/company-table'
import myClassify from '@/components/company/company-classify'
import myTag from '@/components/company/company-tag'
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
.company-register{
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
.company-classify{
   background-color:white;
}
.company-tag{
  background-color:white;
  margin-top:0rem;
}
.company-table{
  margin-top:1rem;
  background-color:white;
}
</style>
