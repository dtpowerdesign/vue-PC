<template>
  <div class="comindex">
   <el-row>
     <el-col :span="3" id="left">
       <logo></logo>
       <comleftNav></comleftNav>
     </el-col>
     <el-col :span="21" :offset="3"  id="right">
        <Info style="background-color:white" ref="Info"></Info>
       	<router-view></router-view>
     </el-col>
   </el-row>
  </div>
</template>

<script>
import comleftNav from '@/components/public/comleftNav'
import logo from '@/components/public/logo'
import Info from '@/components/public/Info'
export default {
  components: {comleftNav, logo, Info},
  data () {
    return {}
  },
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#left{
  background-color:#4d83e7;
  position:fixed;
  z-index: 0;
}
.comleftNav{
  margin-top:5rem;
}

</style>
