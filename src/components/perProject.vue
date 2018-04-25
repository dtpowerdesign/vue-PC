<template>
  <div class="index">
   <el-row>
     <el-col :span="3" id="left">
       <logo></logo>
       <proLeftNav></proLeftNav>
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
import proLeftNav from '@/components/public/proLeftNav'
import logo from '@/components/public/logo'
import Info from '@/components/public/Info'
import Drag from '@/components/public/drag'
export default {
  components: {proLeftNav, logo, Info, Drag},
  data () {
    return {}
  },
  mounted () {
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
}
.proLeftNav{
  margin-top:5rem;
}

</style>
