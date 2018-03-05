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
.cell{
  text-align: center;
}

// 导航栏展开宽度
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
    // margin: 0.3rem auto;
  }
  .el-menu-item-group__title{
    padding: 0;
  }
}

// 修改默认表头颜色
.el-table th{
  background: #E7F0FF;
}

// 修改默认表身颜色
.el-table td{
  background: #F9F9F9;
}

// 修改默认偶数行表身颜色
  .el-table--striped .el-table__body tr.el-table__row--striped td{
  background: #E7F0FF;
}

// 解决固定列两端会有竖向滚动条
.el-table__fixed, .el-table__fixed-right{
  overflow-y: hidden;
}

// 修改选项卡的默认内边距
.el-tabs--border-card>.el-tabs__content{
  padding: 1.1rem 1.5rem;
}

//穿梭框的选择框位置(头)
.el-transfer-panel .el-transfer-panel__header .el-checkbox{
  margin-left: -20%;
}
//穿梭框的选择框位置(身)
.el-transfer-panel__item .el-checkbox__input{
   left: 10%;
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
