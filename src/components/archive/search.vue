<template>
  <div class="search">
   <el-input
    placeholder="搜索你感兴趣的项目或企业"
    v-model="search">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
    width:40%;
    text-align:center;
}
.el-icon-search{
    font-size:1.5rem;
}
</style>
