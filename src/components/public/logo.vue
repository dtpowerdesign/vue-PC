<template>
  <div>
   <img src="../../../static/logo.png" alt="">
   <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '南瑞美思'
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
    width:25%;
    display:inline-block;
}
</style>
