<template>
  <div class="CM-sumary">
   <div class="title"><span>项目信息<i class="icon iconfont icon-iconfontquestion"></i></span></div>
   <div class="clearfix"></div>
   <el-tabs type="border-card" class="CM-tab">
    <el-tab-pane label="项目汇总"><InforAll ref="InforAll"></InforAll></el-tab-pane>
    <el-tab-pane label="临时态"><Infor0 ref="Infor0"></Infor0></el-tab-pane>
    <el-tab-pane label="发布中"><Infor ref="Infor1"></Infor></el-tab-pane>
    <el-tab-pane label="投标中"><Infor2 ref="Infor2"></Infor2></el-tab-pane>
    <el-tab-pane label="洽谈中"><Infor3 ref="Infor3"></Infor3></el-tab-pane>
    <el-tab-pane label="投标洽谈"><Infor4 ref="Infor4"></Infor4></el-tab-pane>
    <el-tab-pane label="合同执行中"><Infor5 ref="Infor5"></Infor5></el-tab-pane>
    <el-tab-pane label="合同终止"><Infor6 ref="Infor6"></Infor6></el-tab-pane>
   </el-tabs>
  </div>
</template>

<script>
import Infor0 from '@/components/CM/CM-sumary-information0'
import Infor from '@/components/CM/CM-sumary-information'
import Infor2 from '@/components/CM/CM-sumary-information2'
import Infor3 from '@/components/CM/CM-sumary-information3'
import Infor4 from '@/components/CM/CM-sumary-information4'
import Infor5 from '@/components/CM/CM-sumary-information5'
import Infor6 from '@/components/CM/CM-sumary-information6'
import InforAll from '@/components/CM/CM-sumary-informationAll'
export default {
  components: {Infor0, Infor, Infor2, Infor3, Infor4, Infor5, Infor6, InforAll},
  data () {
    return {}
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$refs.InforAll.initData()
      this.$refs.Infor0.initData()
      this.$refs.Infor1.initData()
      this.$refs.Infor2.initData()
      this.$refs.Infor3.initData()
      this.$refs.Infor4.initData()
      this.$refs.Infor5.initData()
      this.$refs.Infor6.initData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.CM-sumary{
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
.CM-tab{
  border-radius:.3rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
