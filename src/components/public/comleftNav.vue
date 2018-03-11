<template>
  <div class="comleftNav">
     <el-menu
      default-active="/"
      router
      class="el-menu-vertical-demo"
      background-color="#4d83e7"
      text-color="#fff"
      active-background-color="#409EFF"
      :default-openeds="['company', 'CM', 'statistics']">
      <el-submenu index="company">
        <template slot="title">
          <i class="icon iconfont icon-gerenziliao"></i>
          <span class="fontBig">企业资料</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/com/company-comAchi">企业业绩</el-menu-item>
          <el-menu-item index="/com/company-register" data-step="2" data-intro="完善个人信息" data-position="right">企业信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
     <el-submenu index="CM">
        <template slot="title">
          <i class="icon iconfont icon-guanli"></i>
          <span class="fontBig">项目管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/com/PM-new" data-step="1" data-intro="我要发布新任务" data-position="right">发布新任务</el-menu-item>
          <el-menu-item index="/com/CM-sumary" data-step="4" data-intro="参与项目浏览" data-position="bottom">项目汇总</el-menu-item>
          <el-menu-item index="/com/CM-combo">联合体</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="statistics">
        <template slot="title">
          <i class="icon iconfont icon-tongji"></i>
          <span class="fontBig">统计信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/com/Cstatistics-time">时间统计</el-menu-item>
          <el-menu-item index="/com/Cstatistics-discuss">洽谈统计</el-menu-item>
          <el-menu-item index="/com/Cstatistics-credit">提资统计</el-menu-item>
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
