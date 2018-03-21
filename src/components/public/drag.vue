<template>
   <div class="dragDiv" v-drag>
     <el-tooltip class="item" effect="light" content="返回" placement="right">
     <i class="icon iconfont icon-fanhui" style="color:#E6A23C;font-size:4rem" @click.stop="$router.go(-1)"></i>
     </el-tooltip>     
     <br/>
     <el-tooltip class="item" effect="light" content="及时聊天" placement="right">
     <i class="icon iconfont icon-conversation_icon" style="color:#E6A23C;font-size:4rem" @click.stop="$router.push('/chat/contact')"></i>
     </el-tooltip>
     <br/>
     <el-tooltip class="item" effect="light" content="设置" placement="right">
     <i class="icon iconfont icon-iconfonticonfontjixieqimo" style="color:#E6A23C;font-size:4rem" @click.stop="$router.push('/changeTable/project')"></i>
     </el-tooltip>
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
.dragDiv{
  position:absolute;
  z-index: 9998;
  background-image: url(/static/dragBGC.png);
  background-origin: center center;
  background-size: 100% 100%;
  top:10%;
  left:90%;
    /* -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover; */
    background-repeat: no-repeat;
  padding:1rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.dragDiv>i{
  cursor: pointer;
}
</style>
