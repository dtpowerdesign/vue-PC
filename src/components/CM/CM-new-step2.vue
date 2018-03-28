<template>
  <div class="PM-new-step2">
    <div class="title"><span>项目基本信息</span><a :href="help1" class="help" >不会填?点我</a></div>
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
          <el-col class="line" :offset="5" :span="2">类别</el-col>
          <el-col :span="8">
            <el-select v-model="form.categorys" multiple placeholder="请选择类别" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in categorys" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="目标状态">
          <el-col :span="4">
            <el-select v-model="form.state"  placeholder="请选择目标状态" >
            <el-option v-for="(i,j) in states" :key="j" :label="i.label" :value="i.value"></el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">规模</el-col>
          <el-col :span="5">
            <el-input v-model="form.sizeAndCapacitys" placeholder="请输入规模的数值" type="number"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="form.unit"  placeholder="请选择单位" >
            <el-option v-for="(i,j) in unit" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="1" :span="2">设计阶段</el-col>
          <el-col :span="8">
            <el-select v-model="form.designState" style="width:100%">
              <el-option v-for="(i, j) in designState" :key="j"  :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-col :span="9">
            <el-select v-model="form.type" multiple placeholder="请选择类型" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in type" :key="j" :label="i" :value="i"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="5" :span="2">涉及专业</el-col>
          <el-col :span="8">
            <el-select v-model="form.major" multiple placeholder="请选择涉及专业" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in major" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="电压等级">
          <el-col :span="9">
            <el-select v-model="form.voltagelevel1" style="width:30%">
              <el-option v-for="(i,j) in voltagetype" :key="j" :label="i" :value="i"></el-option>
            </el-select>
            <el-input v-model="form.voltagelevel2" style="width:35%" type="number"></el-input>
            <el-select v-model="form.voltagelevel3" placeholder="请选择电压等级" style="width:30%">
              <el-option v-for="(i,j) in voltagelevel" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="5" :span="2">开始时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="项目地点">
          <el-col :span="9">
            <el-input v-model="form.place"></el-input>
          </el-col>
          <el-col :offset="5" :span="2">结束时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="title"><span>项目资质要求</span></div>
    <div class="content">
      <el-form :model="form" label-width="100px" style="width:100%">
        <el-form-item label="投标个体性质">
          <el-col :span="9">
          <el-select v-model="form.character" placeholder="请选择个体性质" style="width:100%">
            <el-option v-for="(i,j) in character" :key="j" :value="i" :label="i"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="2" :span="3">业绩要求</el-col>
          <el-col :span="4">
            <el-select v-model="form.performanceReq1" placeholder="请选择业绩要求" style="width:100%"  filterable allow-create default-first-option>
              <el-option v-for="(i,j) in performanceReq" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">数量要求</el-col>
          <el-col :span="3">
            <el-input v-model="form.performanceReq2" style="width:100%"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="工程限价">
          <el-col :span="9">
          <el-input v-model="form.lowPrice" placeholder="最低" style="width:40%;"></el-input>
          <span style="font-size:1.2rem;color:red">到</span>
          <el-input v-model="form.highPrice" placeholder="最高" style="width:40%;"></el-input>
          </el-col>
          <el-col :offset="2" :span="5">所需资质</el-col>
          <el-col :span="8">
            <el-select v-model="form.aptitude" placeholder="请选择所需资质" style="width:100%">
              <el-option v-for="(i,j) in aptitude" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="付款方式/付款比例">
          <el-col :span="9">
            <el-select v-model="form.paymentMethods" placeholder="选择" style="width:40%">
              <el-option v-for="(i,j) in paymentMethods" :key="j" :value="i" :label="i"></el-option>
            </el-select>
            <el-select v-model="form.paymentScale" placeholder="自填或选择" style="width:40%" filterable allow-create default-first-option>
              <el-option v-for="(i,j) in paymentScale" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="2" :span="5">是否接受联合投标</el-col>
          <el-col :span="8">
           <el-switch v-model="form.isAcceptJointBid" active-text="是" inactive-text="否" inactive-value="false" active-value="true"></el-switch>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">项目设计成果要求</div>
    <div class="content">
      <el-form :model="form" label-width="80px" style="width:100%">
        <el-radio v-model="radio" label="1">平台推荐</el-radio>
        <el-radio v-model="radio" label="2">自定义</el-radio>
        <el-table :data="form.stateUnits" stripe style="margin-top:2rem">
          <el-table-column label="设计阶段">
            <template slot-scope="scope">
              <el-select v-model="scope.row.state">
                <el-option v-for="(i, j) in designState" :key="j" :label="i" :value="i"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="要求时间">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.endTime" :disabled="disabled" type="date" placeholder="选择日期"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="要求成果">
            <template slot-scope="scope">
              <el-input type="textarea" autosize :disabled="disabled" v-model="scope.row.requireResult"></el-input>  
            </template>            
          </el-table-column>
          <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button type="danger" @click="myDelete(scope.row)"><i class="icon iconfont icon-cha"></i>删除设计阶段{{scope.row.state}}</el-button>
             </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addStateUnits()">增加设计阶段</el-button>
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
    ...mapState(['step', 'form', 'states', 'designState', 'type', 'categorys', 'sizeAndCapacitys', 'voltagelevel', 'voltagetype', 'major', 'unit', 'character', 'performanceReq', 'priceType', 'aptitude', 'paymentMethods', 'paymentScale'])
  },
  data () {
    return {
      help1: this.$domain.domain1 + 'electric-design/public/templets/taskbasemsg.html',
      help2: this.$domain.domain1 + 'electric-design/public/templets/projectrequriment.html',
      help3: this.$domain.domain1 + 'electric-design/public/templets/payabout.html',
      help4: this.$domain.domain1 + 'electric-design/public/templets/resultrequriment.html',
      disabled: false,
      radio: '2'
    }
  },
  methods: {
    ...mapMutations(['init2', 'addStateUnits', 'myDelete'])
  },
  mounted () {
    this.init2()
  },
  watch: {
    radio () {
      if (this.radio === '1') {
        this.disabled = true
      } else {
        this.disabled = false
      }
    }
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
.title{
  display:flex;
  justify-content:flex-start;
  width:80%;
  margin:3rem auto 0 auto;
  font-weight:400;
  font-size:1.5rem;
  border-bottom: 1px solid black;
}
.content{
  margin:3rem auto 0 auto;
  width:80%;
  display:flex;
}
</style>
