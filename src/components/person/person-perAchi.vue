<template>
  <div class="person-register">
   <div class="title"><span style="font-size:2rem">个人业绩</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <myClassify></myClassify>
   <myTable></myTable>
  </div>
</template>

<script>
import myTable from '@/components/person/person-table'
import myClassify from '@/components/person/person-classify'
export default {
  components: {myTable, myClassify},
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-register{
  width:90%;
  margin:2rem auto;
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
.person-table{
  margin-top:1rem;
  background-color:white;
}
</style>
