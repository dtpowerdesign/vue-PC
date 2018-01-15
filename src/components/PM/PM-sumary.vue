<template>
  <div class="PM-sumary">
   <div class="title"><span>项目信息<i class="icon iconfont icon-iconfontquestion"></i></span></div>
   <div class="clearfix"></div>
   <el-tabs type="border-card">
    <el-tab-pane label="项目汇总">项目汇总</el-tab-pane>
    <el-tab-pane label="发布中">
      <router-view></router-view>
      
    </el-tab-pane>
    <el-tab-pane label="投标中">投标中</el-tab-pane>
    <el-tab-pane label="洽谈中">洽谈中</el-tab-pane>
    <el-tab-pane label="投标洽谈">投标洽谈</el-tab-pane>
    <el-tab-pane label="合同执行中">合同执行中</el-tab-pane>
    <el-tab-pane label="合同终止">合同终止</el-tab-pane>
   </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PM-sumary{
  padding:4rem;

}
.title{
  font-size:2rem;
  float:left;
  margin-bottom:2rem;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.clearfix{
  clear:both;
  display:block;
  width:0;
  height:0;
}
.el-table__row--striped{
  background-color:blue;
}
</style>
