<template>
  <div class="new-step1">
    <div class="content">
      <!-- <el-radio v-model="radio" label="1" class="content1" @click="$router.push('/per/PM-new/2-1')">我对项目相关信息不了解</el-radio>
      <el-radio v-model="radio" label="2" class="content2" @click="$router.push('/per/PM-new/2')">我了解项目相关信息</el-radio> -->
      <el-button class="content1" @click="$router.push('/per/PM-new/2-1')" type="primary">我对项目相关信息不了解</el-button>
      <el-button class="content2" @click="$router.push('/per/PM-new/2')" type="primary">我了解项目相关信息</el-button>
    </div>
    <!-- <div class="skip">
      <div style="margin-right:2rem" @click="next()"><span>下一步</span><i class="icon iconfont icon-you"></i></div>
    </div> -->
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
      this.next()
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
  margin-top: 2rem;
  display:flex;
  justify-content:center;
  align-items:center;
}
.content1, .content2{
  display:flex;
  justify-content:center;
  align-items:center;
  width:40%;
  font-size: 1.3rem;
  /* height:2rem; */
}
.content1{
  /* border-right:1px solid black */
}
.icon{
  font-size: 2rem;
}
.skip{
  font-size: 2rem;
  margin-top:1rem;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  color:#4d83e7;
  font-weight:500;
}
</style>
