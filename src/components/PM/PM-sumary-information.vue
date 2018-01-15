<template>
  <div>
    <div class="title"><span>|华北电力大学网线电缆铺设</span><el-button type="primary" @click="$router.push('/PM-sumary')">返回</el-button></div>
    <el-row style="margin-top:3rem">
      <el-col :span="8">
       <span class="font1">招标公司</span><br>
       <i class="icon iconfont icon-gongsi"></i><span class="font2">中国移动河北分部</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">项目地点</span><br>
        <i class="icon iconfont icon-didian"></i><span class="font2">华北电力大学二校区</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">发布时间</span><br>
        <i class="icon iconfont icon-riqi"></i><span class="font2">2018年2月14号</span>
      </el-col>
    </el-row>
    <el-row style="margin-top:3rem">
      <el-col :span="8">
       <span class="font1">设计院</span><br>
       <i class="icon iconfont icon-loufang"></i><span class="font2">保定市建筑公司</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">报价</span><br>
        <i class="icon iconfont icon-qian"></i><span class="font2">1,000,000元</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">成果交付</span><br>
        <i class="icon iconfont icon-zhuanhuan"></i><span class="font2">未交付</span>
      </el-col>
    </el-row>
    <el-row style="margin-top:3rem">
      <el-col :span="10" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">其他信息</span><br>
        <el-row>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">类别:电缆建设</span></el-col>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">规模容量:KM</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">类型:输电</span></el-col>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">专业要求:计算机,电力</span></el-col>
        </el-row>
      </el-col>
      <el-col :span="8" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">投标人信息</span><br>
        <p class="font1" style="text-align:left">投标人信息投标人信息投标人信息投标人信息投标人信息投标人信息投标人信息投标人信息投标人信息投标人信息</p>
      </el-col>
    </el-row>
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
.title{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.title span{
  font-size: 2rem;
  color:#409EFF;
}
.font1{
 font-size:1.1rem;
}
.font2{
  font-size: 1.5rem;
  color:#409EFF;
}
.icon{
  font-size:2rem;
  color:#F56C6C;
}
</style>
