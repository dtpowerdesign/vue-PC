<template>
  <div>
   <!-- <Info></Info> -->
   <div style="display:flex;justify-content:flex-left">
     <el-button @click="$router.go(-1)" type="success" style="margin-left:3rem">返回</el-button>
   </div>
   <el-tabs style="width:50%;margin:2rem auto;padding:1rem;border:1px solid #409EFF">
       <el-tab-pane label="项目表">
           <project></project>
       </el-tab-pane>
       <el-tab-pane label="业绩表">
           <achievement></achievement>
       </el-tab-pane>
   </el-tabs>
  </div>
</template>

<script>
import Info from '@/components/public/Info'
import project from '@/components/changeTable/project'
import achievement from '@/components/changeTable/achievement'
export default {
  components: {Info, project, achievement},
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
