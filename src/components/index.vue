<template>
  <div class="index">
   <el-row>
     <el-col :span="3" id="left">
       <logo></logo>
       <leftNav></leftNav>
     </el-col>
     <el-col :span="21" :offset="3"  id="right">
        <Info style="background-color:white" ref="Info"></Info>
       	<router-view></router-view>
     </el-col>
   </el-row>
   <Drag></Drag>
  </div>
</template>

<script>
import leftNav from '@/components/public/leftNav'
import logo from '@/components/public/logo'
import Info from '@/components/public/Info'
import Drag from '@/components/public/drag'
export default {
  components: {leftNav, logo, Info, Drag},
  data () {
    return {}
  },
  mounted () {
    $('#puser').css('color', '#409EFF')
    this.initData()
  },
  methods: {
    initData () {
      this.$refs.Info.initData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#left{
  background-color:#4d83e7;
  position:fixed;
  z-index: 0;
  overflow: scroll;
  overflow-x: hidden;
  /* overflow-y: hidden; */
}
.leftNav{
  margin-top:5rem;
}
#right{
  background-color:#F0F4F7;
  height: 100%;
}
</style>
