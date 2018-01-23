<template>
  <div class="PM-combo">
    <div class="title"><span style="font-size:2rem">联合体</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <el-tabs type="border-card">
      <el-tab-pane label="收到请求"><Rinfor></Rinfor></el-tab-pane>
      <el-tab-pane label="我的请求">
        <infor></infor>
      </el-tab-pane>
      <el-tab-pane label="投标中"><inforing></inforing></el-tab-pane>
  </el-tabs>
  </div>
  
</template>

<script>
import Rinfor from '@/components/PM/PM-combo-Rinformation.vue'
import infor from '@/components/PM/PM-combo-information.vue'
import inforing from '@/components/PM/PM-combo-inforing.vue'
export default {
  components: {Rinfor, infor, inforing},
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PM-combo{
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
</style>
