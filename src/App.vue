<template>
  <div id="app">
    <router-view/>
      <div style="height: 0; overflow: hidden;">
      <div id="appKey">{{appKey}}</div>
      <div id="token">{{token}}</div>
      <div id="navi">{{navi}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      navi: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$startInit(this.$cookie.get('user'), {token: this.$cookie.get('token')})
    })
    this.$one.$on('hasApply', (message) => {
      if (this.$route.path !== '/chat/apply') {
        this.$notify.info({
          title: `申请消息`,
          dangerouslyUseHTMLString: true,
          message: `<p style="color:#409EFF;cursor:pointer">${message.content.content}</p>`,
          onClick: () => { this.$router.push('/chat/apply') },
          duration: 0,
          position: 'top-right'
        })
      }
    })
    this.$one.$on('has', (message) => {
      console.log('111')
      if (this.$route.path !== '/chat/contact') {
        if (JSON.parse(message.content.extra).type === 'normal') {
          this.$notify.info({
            title: `聊天消息`,
            message: `来自${JSON.parse(message.content.extra).otherName}的私聊信息`,
            onClick: () => {
              this.$router.push('/chat/contact')
            },
            duration: 0,
            position: 'bottom-right'
          })
        }
        if (JSON.parse(message.content.extra).type === 'group') {
          this.$notify.info({
            title: `聊天消息`,
            message: `来自${JSON.parse(message.content.extra).otherName}的群信息`,
            onClick: () => {
              this.$router.push('/chat/contact')
            },
            duration: 0,
            position: 'bottom-right'
          })
        }
      }
    })
  },
  computed: {
    token () {
      return this.$cookie.get('token')
    },
    appKey () {
      return this.$appKey.appKey
    }
  }
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
a,a:hover{
  color:#409EFF;
  cursor: pointer;
    text-decoration: none;
}
a:hover{

}
#left, #right{
  height:100%
}
.cell{
  text-align: center;
}
.changeTable .el-tabs{
  height: 100%;
}

// 表单之间下边距
.el-form-item {
    margin-bottom: 8px;
}

//修改MessageBox 弹框默认样式
.el-message-box__btns{
  display: flex;
  justify-content:center;
  .el-button--default{
    background-color: #409EFF;
    color: white;
}
}
//垂直方向下拉框高度
.el-menu--popup-bottom-start{
   max-height: 30rem;
   max-width: 20rem;
    overflow: scroll;

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
  // margin-left: -20%;
}
//穿梭框的选择框位置(身)
.el-transfer-panel__item .el-checkbox__input{
   
}
//穿梭框的宽
.el-transfer-panel{
  width: 40%
}
//穿梭框的高
.el-transfer-panel__body{
  height: 500px;
}
.el-transfer-panel__list{
  height: 100%;
}
// 穿梭框头部
.el-transfer-panel .el-transfer-panel__header{
  // background-color: #606266;
}
// 穿梭框头部的字
.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label{
  text-align: center;
  // color:white;
}
// 穿梭框头部的 x/y
.el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label span{
  // color:white;
  text-align: right;
}
// 穿梭框身体的背景
.el-transfer-panel__list{
  // background-color: #409EFF;
  text-align: left;
}
// 穿梭框身体字的颜色
.el-checkbox__label span{
  // color: white;
}
// tag的x号
 .el-icon-close{
color:white!important;
}


.PM-new-step2{
.el-radio__label{
  font-size: 1.5rem;
}
.el-radio__inner{
  width:1.5rem;
  height: 1.5rem;
}
}

//  修改changeTable里的tabs默认样式
.changeTable{
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  font-size: 1.5rem;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background-color: #409EFF;
  color:white;
}
.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left{
  margin: -1px 0 .5rem -1px;
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

.archive, .facilitator{
.el-input--suffix .el-input__inner{
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
