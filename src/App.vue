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
#left, #right{
  height:100%
}
.leftNav{
  .el-submenu__title i{
    color:#fff;
}
  .el-menu{
    border-right:0;
  }
  .el-menu-item.is-active{
    color: black;
    font-size: 1.1rem
  }
  .el-submenu .el-menu-item{
    min-width:auto;
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
.PM-new-step2{
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:100%;
}
}
.Info{
  .el-submenu .el-menu-item{
    min-width:auto;
  }
}
.el-table td{
  text-align:left;
}
</style>
