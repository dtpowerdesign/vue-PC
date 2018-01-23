<template>
  <div class="PM-new">
   <div class="title"><span style="font-size:2rem">发布新项目</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <div class="box">
     <el-steps :active="step-1" finish-status="success" align-center style="margin-left:-4rem">
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
  background-color:#ebeef5;
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
  box-shadow: .2rem .2rem .2rem #888888;
 border-radius:.3rem;
}
.description{
  margin-top:1rem;
  text-align:left;
}
.description>span{
  margin-left:1rem;
}
</style>
