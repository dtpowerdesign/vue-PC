<template>
  <div>
   <el-table>
       <el-table-column label="请求者账号" prop="sourceUserAccount"></el-table-column>
       <el-table-column label="请求者名称" prop="sourceUserName"></el-table-column>
       <el-table-column label="请求名称" prop="name"></el-table-column>
       <el-table-column label="请求内容" prop="body"></el-table-column>
       <el-table-column label="请求提出时间" prop="time"></el-table-column>
       <el-table-column label="要求完成时间" prop="reqtime"></el-table-column>
       <el-table-column label="实际完成时间" prop="realtime"></el-table-column>
   </el-table>
   <el-button style="width:80%" type="primary">增加请求</el-button>
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

</style>
