<template>
  <div class="PM-new">
   <div class="title"><span style="font-size:1.5rem">发布新任务</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <div class="box">
     <el-steps :active="step-1" process-status="finish" finish-status="success" align-center style="margin-left:-8rem;margin-right:-8rem">
       <el-step v-for="(i, j) in stepName" :key="j" :title="i" ></el-step>
     </el-steps>
     <div class="description"><span>{{description[step-1]}}</span></div>
     <router-view></router-view>
   </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState} from 'vuex'
export default {
  store,
  data () {
    return {}
  },
  computed: {
    ...mapState(['steps', 'stepName', 'step', 'description'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PM-new{
  width:90%;
  margin: 1rem auto 0 auto;
  /* background-color: #F0F4F7; */
  overflow: hidden;
}
.title{
  text-align:left;
  margin-bottom:2rem;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.box{
  background-color:white;
  padding-top:2rem;
  padding-bottom:4rem;
 -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
 border-radius:.3rem;
}
.description{
  margin-top:1rem;
  margin-left: 4rem;
  text-align:left;
}
.description>span{
  margin-left:1rem;
}
span{
  cursor:pointer;
}
</style>
