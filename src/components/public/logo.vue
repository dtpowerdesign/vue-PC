<template>
  <div>
   <img src="../../../static/logo-buleBGC.png" alt="">
   <span>{{msg}}</span>
   <el-tooltip content="点我进行导航" placement="bottom" effect="light">
     <i class="icon iconfont icon-iconfontquestion" style="color:white;font-size:1.5rem;curser:pointer" onclick="introJs().setOption('showProgress', true).start();"></i>
   </el-tooltip>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '南瑞美思'
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
div{
  display:flex;
  align-items:center;
  justify-content:center;
}
span{
    font-size:1.5rem;
    color:#fff;
}
img{
    width:15%;
    display:inline-block;
}
</style>
