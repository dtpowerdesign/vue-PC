<template>
  <div class="leftNav">
     <el-menu
      default-active="/"
      router
      class="el-menu-vertical-demo"
      background-color="#4d83e7"
      text-color="#fff"
      active-background-color="#409EFF"
      :default-openeds="['recent', 'friend', 'group']">
      <el-submenu index="recent">
        <template slot="title">
          <i class="icon iconfont icon-zuijinlaifang"></i>
          <span class="fontBig">最近消息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/chat/apply">申请消息</el-menu-item>
          <el-menu-item index="/chat/contact">最近联系人</el-menu-item>
        </el-menu-item-group>
      </el-submenu>      
      <el-submenu index="friend">
        <template slot="title">
          <i class="icon iconfont icon-gerenziliao"></i>
          <span class="fontBig">好友管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/chat/add">添加好友</el-menu-item>
          <!-- <el-menu-item index="/chat/apply">申请列表</el-menu-item> -->
          <el-menu-item index="/chat/friendList">好友列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="group">
        <template slot="title">
          <i class="icon iconfont icon-msnui-users"></i>
          <span class="fontBig">群组管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/chat/createGroup">创建群</el-menu-item>
          <el-menu-item index="/chat/addGroup">添加群</el-menu-item>
          <!-- <el-menu-item index="/chat/applyGroup">群申请列表</el-menu-item> -->
          <el-menu-item index="/chat/groupList">群列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>      
    </el-menu>
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

.icon{
    color:#fff;
    margin-left:-1.5rem;
    font-size:1.5rem;
}
span{
  font-size:1rem;
}
.fontBig{
  font-size:1.3rem;
  font-weight:100;
}
</style>
