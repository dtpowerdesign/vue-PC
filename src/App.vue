<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang='scss'>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.leftNav{
  .el-submenu__title i{
    color:#fff;
}
  .el-menu-item.is-active{
    color: black;
  }
}
.PM-sumary{
  .el-table--striped .el-table__body tr.el-table__row--striped td{
  background: rgb(236, 241, 246);
}
}
.person-register{
 .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color:#cedbe7;
}
}

</style>
