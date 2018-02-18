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
}
.leftNav{
  margin-top:5rem;
}

</style>
