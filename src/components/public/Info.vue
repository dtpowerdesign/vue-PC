<template>
  <div class="Info">
    <div style="margin-left:2rem">
      <i class="icon iconfont icon-liebiao" @click="show()"></i>
      <span style="width:40rem;" class="nav">
        <span onclick="window.location.href='https://githubzhangshuai.github.io/staticForPro/'">平台首页</span>
        <span onclick="window.location.href='https://githubzhangshuai.github.io/staticSome/'">平台概况</span>
        <span style="color:#4d83e7">个人门户</span>
        <span onclick="window.location.href='https://githubzhangshuai.github.io/vue-PC-company/dist/index.html'">企业门户</span>
      </span>
    </div>
    <div>
      <el-menu default-active="/" router mode="horizontal" class="el-menu-vertical" menu-trigger="click" text-color="black">
        <el-submenu index="person">
        <template slot="title">
          <i class="icon iconfont icon-gerenziliao"></i><span>{{name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/person-perAchi">个人业绩</el-menu-item>
          <el-menu-item index="/person-register">注册信息</el-menu-item>
          <el-menu-item index="/">退出登录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Alpen'
    }
  },
  methods: {
    show () {
      $('.Info>div>.nav').fadeToggle(1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Info{
  display:flex;
  justify-content:space-between;
  font-size:1.5rem;
  align-items:center;
}
.icon{
  font-size:1.5rem;
}
.Info>div{
  margin-right:1rem;
}
.nav{

}
.nav>span{
  margin-left:2rem;
  cursor:pointer;
}
</style>
