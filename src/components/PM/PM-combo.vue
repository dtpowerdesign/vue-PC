<template>
  <div class="PM-combo">
    <div class="title"><span style="font-size:2rem">联合体</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <el-tabs type="border-card" class="PM-tab" :value="value">
      <el-tab-pane label="收到请求" name="1" ref="comboo"><Rinfor></Rinfor></el-tab-pane>
      <el-tab-pane label="我的请求" name="2" ref="comboo2">
        <infor></infor>
      </el-tab-pane>
      <!-- <el-tab-pane label="投标中" name="3"><inforing></inforing></el-tab-pane> -->
  </el-tabs>
  </div>
  
</template>

<script>
import Rinfor from '@/components/PM/PM-combo-Rinformation.vue'
import infor from '@/components/PM/PM-combo-information.vue'
import inforing from '@/components/PM/PM-combo-inforing.vue'
export default {
  components: {Rinfor, infor, inforing},
  data () {
    return {
      value: ''
    }
  },
  mounted () {
    this.value = this.$route.params.value
    // console.log(this.$refs.comboo2.$children[0])
    // this.test(1)
    this.$one.$on('test', this.test)
  },
  methods: {
    test (i) {
      // alert(i)
      this.$nextTick(function () {
        console.log(this.$refs.comboo2.$children[0])
        this.$refs.comboo2.$children[0].test(i)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PM-combo{
  width:90%;
  margin: 1rem auto 0 auto;
}
.title{
  text-align:left;
  margin-bottom:2rem;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.PM-tab{
  border-radius:.3rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
