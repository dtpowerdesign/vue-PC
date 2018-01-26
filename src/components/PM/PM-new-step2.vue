<template>
  <div class="PM-new-step2">
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px" style="width:100%"> 
        <el-form-item label="招标公司">
          <el-col :span="9">
            <el-input v-model="form.company"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-col :span="9">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="目标状态">
          <el-col :span="4">
            <el-select v-model="form.state" multiple placeholder="请选择目标状态" >
            <el-option v-for="(i,j) in states" :key="j" :label="i" :value="i"></el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">规模</el-col>
          <el-col :span="4">
            <el-select v-model="form.sizeAndCapacitys" multiple placeholder="请选择规模" >
            <el-option v-for="(i,j) in sizeAndCapacitys" :key="j" :label="i" :value="i"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="6":span="1">付款</el-col>
          <el-col :span="8">
            <el-input v-model="form.money"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-col :span="4">
            <el-select v-model="form.type" multiple placeholder="请选择类型" >
            <el-option v-for="(i,j) in type" :key="j" :label="i" :value="i"></el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">类别</el-col>
          <el-col :span="4">
            <el-select v-model="form.categorys" multiple placeholder="请选择类别" >
            <el-option v-for="(i,j) in categorys" :key="j" :label="i" :value="i"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="5":span="2">涉及专业</el-col>
          <el-col :span="8">
            <el-input v-model="form.major"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="电压等级">
          <el-col :span="9">
            <el-input v-model="form.voltagelevel"></el-input>
          </el-col>
          <el-col :offset="5":span="2">开始时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="项目等级">
          <el-col :span="9">
            <el-input v-model="form.pro"></el-input>
          </el-col>
          <el-col :offset="5":span="2">结束时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="skip">
      <div style="margin-left:2rem" @click="$router.push('/per/PM-new')"><i class="icon iconfont icon-zuo"></i><span>上一步</span></div>
      <div style="margin-right:2rem" @click="$router.push('/per/PM-new/3')"><span>下一步</span><i class="icon iconfont icon-you"></i></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step', 'form', 'states', 'type', 'categorys', 'sizeAndCapacitys'])
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['init2'])
  },
  mounted () {
    this.init2()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skip{
  margin-top:1rem;
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
