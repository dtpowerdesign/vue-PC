<template>
  <div class="top">
   <div class="top-left">
     <el-tooltip content="返回上一级" placement="bottom" effect="light">
       <i class="icon iconfont icon-zuo" style="color:white;font-size:1.5rem" @click="$router.go(-1)"></i>
     </el-tooltip>
     <el-tooltip content="点我进行导航" placement="bottom" effect="light">
       <i class="icon iconfont icon-iconfontquestion" style="color:white;font-size:1.5rem;curser:pointer" onclick="introJs().setOption('showProgress', true).start();"></i>
     </el-tooltip>
     <img src="../../../static/logo.png" alt=""><span @click="window.location.href='http://39.106.34.156:8080/zs/home/'">{{msg}}</span><span>|</span><span>项目信息</span></div>
   <div class="top-right"><span>设计服务</span><span>设计师</span><span>客户端下载</span><span>App</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getHomepagedata')
      .then((res) => {
        this.msg = res.data.platformName
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
    background-color:#4d83e7;
    display:flex;
    justify-content:space-between;
}
.top span{
    cursor:pointer;
}
.top span:hover{
    color:yellow;
}
.top-left{
    width:30%;
    display:flex;
    justify-content:center;
    align-items:center;
}
.top-left>img{
    width:15%;
}
.top-left>span{
    font-size:1.5rem;
    color:white;
    margin-left:.5rem;
}
.top-right{
    color:white;
    font-size:1.2rem;
    display:flex;
    justify-content:center;
    align-items:center;
}
.top-right>span{
    margin-right:1rem;
}
</style>
