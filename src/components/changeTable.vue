<template>
  <div ref="changeTable" class="changeTable">
   <!-- <Info></Info> -->
   <!-- <div style="display:flex;justify-content:flex-left">
     <el-button @click="$router.go(-1)" type="success" style="margin-left:3rem">返回</el-button>
   </div> -->
   <el-tabs style="width:100%;box-sizing:border-box;border:1px solid #409EFF;background-color:#f5f7fa" :value="value" tab-position="left" type="border-card">
       <el-tab-pane label="项目表" name="project">
           <project></project>
       </el-tab-pane>
       <el-tab-pane label="项目表(临时态)" name="ptemp">
           <ptemp></ptemp>
       </el-tab-pane>
       <el-tab-pane label="项目表(发布中)" name="prelease">
           <prelease></prelease>
       </el-tab-pane>
       <el-tab-pane label="项目表(投标中)" name="ptoubiao">
           <ptoubiao></ptoubiao>
       </el-tab-pane>
       <!-- <el-tab-pane label="项目表(洽谈中)" name="pqiatan">
           <pqiatan></pqiatan>
       </el-tab-pane> -->
       <el-tab-pane label="项目表(投标洽谈)" name="pqiatan">
           <pqiatan></pqiatan>
       </el-tab-pane>
       <el-tab-pane label="项目表(合同执行中)" name="phtzixing">
           <phtzixing></phtzixing>
       </el-tab-pane>
       <el-tab-pane label="项目表(合同终止)" name="phtzongzhi">
           <phtzongzhi></phtzongzhi>
       </el-tab-pane>
       <el-tab-pane label="业绩表" name="achievement">
           <achievement></achievement>
       </el-tab-pane>
       <el-tab-pane label="个人用户表" name="puser">
           <puser></puser>
       </el-tab-pane>
       <el-tab-pane label="企业用户表" name="cuser">
           <cuser></cuser>
       </el-tab-pane>              
   </el-tabs>
  </div>
</template>

<script>
import Info from '@/components/public/Info'
import project from '@/components/changeTable/project'
import ptemp from '@/components/changeTable/ptemp'
import prelease from '@/components/changeTable/prelease'
import ptoubiao from '@/components/changeTable/ptoubiao'
import pqiatan from '@/components/changeTable/pqiatan'
import phtzixing from '@/components/changeTable/phtzixing'
import phtzongzhi from '@/components/changeTable/phtzongzhi'
import achievement from '@/components/changeTable/achievement'
import puser from '@/components/changeTable/puser'
import cuser from '@/components/changeTable/cuser'
export default {
  components: {Info, project, ptemp, prelease, ptoubiao, pqiatan, phtzixing, phtzongzhi, achievement, puser, cuser},
  data () {
    return {
      value: 'cuser'
    }
  },
  mounted () {
    this.value = this.$route.params.value
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.changeTable{
  height:100%;
}
</style>
