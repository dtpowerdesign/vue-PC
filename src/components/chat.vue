<template>
  <div class="chat">
   <el-row>
     <el-col :span="3" id="left">
       <logo></logo>
       <leftChat></leftChat>
     </el-col>
     <el-col :span="21" :offset="3"  id="right">
        <Info style="background-color:white" ref="Info"></Info>
       	<router-view></router-view>
     </el-col>
   </el-row>
  </div>
</template>

<script>
import leftChat from '@/components/public/leftChat'
import logo from '@/components/public/logo'
import Info from '@/components/public/Info'
export default {
  components: {leftChat, logo, Info},
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
.leftNav{
  margin-top:5rem;
}
#right{
  background-color:#F0F4F7;
  height: 100%;
}
</style>
