<template>
  <div>
   <el-row>
     <el-col :span="4" class="left">
       <logo></logo>
       <leftNav></leftNav>
     </el-col>
     <el-col :span="20">
       <Info></Info>
       	<router-view></router-view>
     </el-col>
   </el-row>
  </div>
</template>

<script>
import leftNav from '@/components/public/leftNav'
import logo from '@/components/public/logo'
import Info from '@/components/public/Info'
export default {
  components: {leftNav, logo, Info},
  data () {
    return {}
  },
  mounted () {
    var dd = document.getElementsByClassName('left')[0]
    var H = document.body.clientHeight
    dd.style.height = H + 'px'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left{
  background-color:#4d83e7;
  height:100%;
}
.leftNav{
  margin-top:10rem;
}
</style>
