<template>
  <div>
    <div class="content">
      <el-form ref="form" :model="projectCharacteristics" label-width="80px" style="width:100%"> 
        <el-form-item label="难度系数">
          <el-col :span="9">
            <el-input v-model="projectCharacteristics.difficulty"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="大概价钱">
          <el-col :span="9">
            <el-input v-model="projectCharacteristics.price"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="skip">
      <div style="margin-left:2rem" @click="$router.push('/per/PM-new/4')"><i class="icon iconfont icon-zuo"></i><span>上一步</span></div>
      <div style="margin-right:2rem" @click="$router.push('/per/PM-new/6')"><span>下一步</span><i class="icon iconfont icon-you"></i></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step', 'form', 'projectCharacteristics'])
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['init5'])
  },
  mounted () {
    this.init5()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skip{
  margin-top:4rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:#4d83e7;
  font-weight:500;
}
.content{
  margin:3rem auto 0 auto;
  width:80%;
  display:flex;
}
</style>
