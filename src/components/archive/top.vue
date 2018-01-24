<template>
  <div class="top">
   <div class="top-left"><img src="../../../static/logo.png" alt=""><span>南瑞美思</span><span>|</span><span>项目归档</span></div>
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
    font-size:2rem;
    color:white;
    margin-left:.5rem;
}
</style>
