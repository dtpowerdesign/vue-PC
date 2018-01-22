<template>
  <div class="leftNav">
     <el-menu
      default-active="/"
      router
      class="el-menu-vertical-demo"
      background-color="#4d83e7"
      text-color="#fff"
      unique-opened>
      <el-submenu index="person">
        <template slot="title">
          <i class="icon iconfont icon-gerenziliao"></i>
          <span>个人资料</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/person-perAchi">个人业绩</el-menu-item>
          <el-menu-item index="/person-register">注册信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     <el-submenu index="PM">
        <template slot="title">
          <i class="icon iconfont icon-guanli"></i>
          <span>项目管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/PM-new">发布新项目</el-menu-item>
          <el-menu-item index="/PM-sumary">项目汇总</el-menu-item>
          <el-menu-item index="/PM-combo">联合体</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="statistics">
        <template slot="title">
          <i class="icon iconfont icon-tongji"></i>
          <span>统计信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/statistics-time">时间统计</el-menu-item>
          <el-menu-item index="/statistics-discuss">洽谈统计</el-menu-item>
          <el-menu-item index="/statistics-credit">资信统计</el-menu-item>
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

</style>
