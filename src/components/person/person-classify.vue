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
      classes: [],
      type: [],
      stage: [],
      voltage: [],
      domain: []
    }
  },
  created () {
    this.$http.get('http://localhost:3030/vue-project/person-classify.php').then((res) => {
      this.classes = res.data[0].classes
      this.type = res.data[1].type
      this.stage = res.data[2].stage
      this.voltage = res.data[3].voltage
      this.domain = res.data[4].domain
    }).catch((err) => {
      console.log(err)
      this.$message({showClose: true,
        message: '网络连接错误',
        type: 'error'
      })
    })
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
