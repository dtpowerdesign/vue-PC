<template>
  <div>
   <el-row>
     <el-col :span="3" class="left">
       <logo></logo>
       <leftNav></leftNav>
     </el-col>
     <el-col :span="21" :offset="3" style="background-color:#ebeef5;" class="right">
        <Info style="background-color:white"></Info>
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
    var ld = document.getElementsByClassName('left')[0]
    var rd = document.getElementsByClassName('right')[0]
    var H = document.body.clientHeight
    ld.style.height = H + 'px'
    rd.style.height = H + 'px'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left{
  background-color:#4d83e7;
  height:100%;
  position:fixed;
}
.leftNav{
  margin-top:5rem;
}

</style>
