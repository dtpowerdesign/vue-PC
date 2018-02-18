<template>
  <div class="comInfo">
    <div style="margin-left:2rem">
      <i class="icon iconfont icon-liebiao" @click="show()"></i>
      <span style="width:40rem;" class="nav">
        <span onclick="window.location.href='http://39.106.34.156:8080/zs/home/'">平台首页</span>
        <span onclick="window.location.href='http://39.106.34.156:8080/zs/preview/'">平台概况</span>
        <span @click="$router.push('/per')">个人门户</span>
        <span style="color:#4d83e7" @click="$router.push('/com')">企业门户</span>
        <span @click="$router.push('/archive')">项目归档</span>
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
          <el-menu-item   @click="$cookie.set('user', '', -1);$cookie.set('role', '', -1);$cookie.set('name', '', -1);$cookie.set('pass', '', -1);$router.push('/login')">退出登录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </el-menu>
      <el-menu default-active="/" router mode="horizontal" class="el-menu-vertical" menu-trigger="click" text-color="black">
        <el-submenu index="person">
        <template slot="title">
          <i class="icon iconfont icon-gerenziliao"></i>我的项目</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/per/person-perAchi">个人业绩</el-menu-item>
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
      $('.comInfo>div>.nav').fadeToggle(1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comInfo{
  display:flex;
  justify-content:space-between;
  font-size:1.5rem;
  align-items:center;
}
.icon{
  font-size:1.5rem;
}
.comInfo>div{
  margin-right:1rem;
}
.nav{

}
.nav>span{
  margin-left:2rem;
  cursor:pointer;
}
</style>
