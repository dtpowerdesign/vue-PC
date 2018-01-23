<template>
  <div class="PM-sumary">
   <div class="title"><span>项目信息<i class="icon iconfont icon-iconfontquestion"></i></span></div>
   <div class="clearfix"></div>
   <el-tabs type="border-card" class="PM-tab">
    <el-tab-pane label="项目汇总"><InforAll></InforAll></el-tab-pane>
    <el-tab-pane label="发布中">
      <Infor></Infor>
    </el-tab-pane>
    <el-tab-pane label="投标中"><Infor2></Infor2></el-tab-pane>
    <el-tab-pane label="洽谈中"><Infor3></Infor3></el-tab-pane>
    <el-tab-pane label="投标洽谈"><Infor4></Infor4></el-tab-pane>
    <el-tab-pane label="合同执行中"><Infor5></Infor5></el-tab-pane>
    <el-tab-pane label="合同终止"><Infor6></Infor6></el-tab-pane>
   </el-tabs>
  </div>
</template>

<script>
import Infor from '@/components/PM/PM-sumary-information'
import Infor2 from '@/components/PM/PM-sumary-information2'
import Infor3 from '@/components/PM/PM-sumary-information3'
import Infor4 from '@/components/PM/PM-sumary-information4'
import Infor5 from '@/components/PM/PM-sumary-information5'
import Infor6 from '@/components/PM/PM-sumary-information6'
import InforAll from '@/components/PM/PM-sumary-informationAll'
export default {
  components: {Infor, Infor2, Infor3, Infor4, Infor5, Infor6, InforAll},
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PM-sumary{
  padding:1rem 4rem 0 4rem;

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
.PM-tab{
  border-radius:.3rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
