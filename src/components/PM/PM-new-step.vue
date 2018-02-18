<template>
  <div>
    <div class="content">
      <el-radio v-model="radio" label="1" class="content1">我对项目相关信息不了解</el-radio>
      <el-radio v-model="radio" label="2" class="content2">我了解项目相关信息</el-radio>
    </div>
    <div class="skip">
      <div style="margin-right:2rem" @click="next()"><span>下一步</span><i class="icon iconfont icon-you"></i></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step'])
  },
  data () {
    return {
      radio: '2'
    }
  },
  watch: {
    radio () {
      this.$store.state.radioStep1 = this.radio
      console.log(this.$store.state.radioStep1)
    }
  },
  methods: {
    next () {
      if (this.radio === '2') {
        this.$router.push('/per/PM-new/2')
      } else {
        this.$router.push('/per/PM-new/2-1')
      }
    },
    ...mapMutations(['init'])
  },
  mounted () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  display:flex;
  justify-content:center;
  align-items:center;
}
.content1, .content2{
  display:flex;
  justify-content:center;
  align-items:center;
  width:40%;
  height:20rem;
}
.content1{
  border-right:1px solid black
}
.skip{
  margin-top:1rem;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  color:#4d83e7;
  font-weight:500;
}
</style>
