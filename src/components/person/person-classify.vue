<template>
  <div class="person-classify">
   <div class="div1">
     <span class="font1">类别:</span><template v-for="i in classes"><span class="font2">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">类型:</span><template v-for="i in type"><span class="font2">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">设计阶段:</span><template v-for="i in stage"><span class="font2">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1"规模容量:</span><template v-for="i in voltage"><span class="font2">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">涉及专业:</span><template v-for="i in domain"><span class="font2">{{i}}</span></template>
   </div>
   <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classes: ['火电', '水电', '风电', '光热', '电气处理', '储能'],
      type: ['发电输电', '规划', '变电', '配电自动化', '配电', '智能', '常规'],
      stage: ['项目建议书', '可行性研究', '初步设计', '施工图设计'],
      voltage: ['MW', 'KW', 'KVA'],
      domain: ['管道', '锅炉', '电力', '计算机', '气机轮']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-classify{
    text-align:left;
}
.div1{float:left;}
.clearfix{
    clear:both;
    width:0;
    height:0;
}
.font1{
    margin-left:2rem;
}
.font2{
    color:#4d83e7;
    margin-left:0.5rem;
}
</style>
