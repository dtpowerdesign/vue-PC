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
.leftNav, .comleftNav, .proLeftNav{
  .el-submenu__title i{
    color:#fff;
}
  .el-menu{
    border-right:0;
  }

  .el-menu-item.is-active{
    color: yellow;
    font-size: 1.1rem;
    background-color:gray;
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
.Info, .comInfo{
  .el-submenu .el-menu-item{
    min-width:auto;
  }
}
.el-table td{
  text-align:left;
}

.archive{
.el-input--prefix .el-input__inner{
    padding-left: 3rem;
    background-color:#DCDFE6;
}
}
span{
  cursor:pointer;
}
.perregister>.el-form-item__label, .comregister>.el-form-item__label{
  font-size:1.3rem;
  font-weight:400;
  color:black;
}
</style>
