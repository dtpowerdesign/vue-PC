<template>
  <div>
   <Info></Info>
   <el-tabs style="width:50%;margin:2rem auto">
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
