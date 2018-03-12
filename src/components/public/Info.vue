<template>
  <div class="Info">
    <div style="margin-left:2rem">
      <i class="icon iconfont icon-liebiao" @click="show()"></i>
      <span style="width:40rem;" class="nav">
        <span onclick="window.location.href='http://39.106.34.156:8080/zs/home/'">平台首页</span>
        <span @click="$router.push('/archive')" data-step="3" data-intro="去投标" data-position="bottom" id="archive">项目信息</span>
        <span @click="$router.push('/facilitator')" data-step="6" data-intro="服务商" data-position="bottom" id="facilitator">服务商展示</span>
        <span @click="$router.push('/per')" v-if="$cookie.get('role')==='puser'" id="puser">个人门户</span>
        <span @click="$router.push('/com')" v-if="$cookie.get('role')==='cuser'" id="cuser">企业门户</span>
        <span onclick="window.location.href='http://39.106.34.156:8080/zs/preview/'">平台指南</span>
      </span>
    </div>
    <div style="display:flex;justify-content:space-around">
      <el-menu default-active="/" router mode="horizontal" class="el-menu-vertical" menu-trigger="click" text-color="black">
        <el-submenu index="person">
        <template slot="title">
          <i class="icon iconfont icon-gerenziliao"></i><span>{{name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/changeTable/project">改变表头</el-menu-item>
          <el-menu-item index="/chat">视频聊天</el-menu-item>
          <el-menu-item index="/login" @click="$cookie.set('user', '', -1);$cookie.set('token', '', -1);$cookie.set('role', '', -1);$cookie.set('name', '', -1);$cookie.set('pass', '', -1);$router.push('/login')">退出登录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      </el-menu>
      <el-menu default-active="/" router mode="horizontal" class="el-menu-vertical" menu-trigger="click" text-color="black">
        <el-submenu index="person">
        <template slot="title">
          <i class="icon iconfont icon-xiangmu" data-step="5" data-intro="参与项目详情" data-position="bottom"></i><span>我的项目</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="'/per-project/' + i.code + '/pandect'"  v-for="(i ,j) in projectList" :key="j">{{i.name}}</el-menu-item>
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
      name: this.$cookie.get('user') ? this.$cookie.get('user') : '您还未登陆哦',
      projectList: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    show () {
      $('.Info>div>.nav').fadeToggle(1000)
    },
    initData () {
      var dataForm = {'conditions': {'aboutUsers': {'searchMethod': 'values', 'values': [this.$cookie.get('user')]}}}
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectAboutUser', dataForm).then((res) => {
        this.projectList = []
        res.data.forEach((el, index) => {
          this.projectList.push({name: el.name, code: el.code})
        })
      }).catch((err) => { console.log(err) })
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
