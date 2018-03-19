<template>
  <div class="bottom">
   <div class="div1"><img src="../../../static/logo-buleBGC.png" alt=""><span>{{msg}}</span></div>
   <ul class="ul1">
      <li>
        <span class="ul1-title">关于平台</span>
        <ul class="ul2">
          <li>关于我们</li>
          <li>平台需知</li>
          <li>安全声明</li>
          <li>其他</li>
        </ul>
      </li>
      <li>
        <span class="ul1-title">个人门户</span>
        <ul class="ul2">
          <li>注册个人账号</li>
          <li>平台门户</li>
        </ul>
      </li>
      <li>
        <span class="ul1-title">企业门户</span>
        <ul class="ul2">
          <li>注册企业账号</li>
          <li>发布指南</li>
        </ul>
      </li>
      <li>
        <span class="ul1-title">二维码</span>
        <img src="../../../static/erweima.png" alt="" style="width:80%;margin-top:1rem;">
      </li>
      <li style="clear:both;width:0;height:0"></li>
   </ul>
   <div style="clear:both"></div>
   <div class="copy"><p>版权所有&copy;</p></div>
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
    // console.log(this.$root.$children[0].$children[0].$children[0].$children[1].$children[1].$children[0].$children[1].$children[0])
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
.bottom{
    background-color:#4d83e7;
    width:100%;
}
.div1{
    width:20%;
display:flex;
align-items:center;
margin-top:2rem;
margin-left:14%;
}
.div1>img{
    width:10%;
}
.div1>span{
    color:white;
    font-size:1.5rem;
}
ul li{
    list-style-type:none;
    cursor:pointer;
}
.ul1{
    width:80%;
    margin:3rem auto 0 auto;
    display:flex;
    justify-content:space-between;
}
.ul1>li{
    width:20%;
}
.ul1-title{
    color:white;
    font-size:1.5rem;
}
.ul2{
    margin-top:2rem;
}
.ul2>li{
    color:white;
    margin-top:0.5rem;
}
.ul2>li:hover{
    color:yellow;
}
.copy{
    width:100%;
    height:4rem;
    background-color:#2b4867;
    display:flex;
    align-items:center;
}
.copy>p{
    text-align:left;
    margin-left:13%;
    color:white;
    font-size:1.5rem;
}
</style>
