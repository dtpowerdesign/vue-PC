<template>
  <div class="uploadAchieve">
   <div class="title"><span>添加业绩<i class="icon iconfont icon-iconfontquestion"></i></span></div>
   <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="项目名称">
          <el-col :span="9">
            <el-input v-model="form.name"></el-input>
          </el-col>         
          <!-- <el-col :offset="5" :span="2">设计阶段</el-col>
          <el-col :span="8">
            <el-select v-model="form.designState" style="width:100%">
              <el-option v-for="(i, j) in designState" :key="j"  :label="i" :value="i"></el-option>
            </el-select>
          </el-col> -->
        </el-form-item>
        <el-form-item label="招标公司">
          <el-col :span="9">
            <el-input v-model="form.company"></el-input>
          </el-col>
          <el-col class="line" :offset="5" :span="2">类别</el-col>
          <el-col :span="8">
            <el-select v-model="form.categorys" placeholder="请选择类别" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in categorys" :key="j" :label="i" :value="i"></el-option>
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
        <el-form-item label="开始时间">
          <el-col :span="9">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-col>          
          <el-col :offset="5" :span="2">结束时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input  v-model="form.instruction" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目描述"></el-input>
        </el-form-item>        
        <el-form-item label="项目要求">
          <el-input  v-model="form.requirement" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目要求"></el-input>
        </el-form-item>  
   </el-form>
        <!-- <el-table :data="form.stateUnits" stripe style="margin-top:2rem">
          <el-table-column label="设计阶段">
            <template slot-scope="scope">
              <el-select v-model="scope.row.state">
                <el-option v-for="(i, j) in designState" :key="j" :label="i" :value="i"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="设计时间">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.endTime" :disabled="disabled" type="date" placeholder="选择日期"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="设计成果">
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
        <el-button type="primary" @click="addStateUnits()">增加设计阶段</el-button>  -->
        <el-button type="success" @click="confirm()">提交业绩</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      radio: '2',
      form: {
        company: '某某公司',
        name: '项目',
        sizeAndCapacitys: '',
        categorys: '',
        unit: '',
        type: [],
        voltagelevel1: '',
        voltagelevel2: 100,
        voltagelevel3: '',
        place: '',
        major: [],
        startTime: '',
        endTime: '',
        lowPrice: '暂无',
        highPrice: '暂无',
        instruction: '',
        requirement: '',
        stateUnits: [
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' }
        ]
      },
      // qualificationRequirements: { CET: '' },
      unit: ['MW', 'Kva', 'KV', `M^2`],
      major: ['计算机', '电力', '岩土', '绘测'],
      designState: ['前期', '项目建议书', '可行性研究报告', '招投标', '初步设计', '施工图设计', '竣工图编制'],
      sizeAndCapacitys: ['MW', 'KW', 'kVA'],
      categorys: ['火电', '水电', '风电', '光伏', '核电', '储能'],
      type: ['发电厂', '输电', '变电', '供配电', '建筑'],
      voltagelevel: ['KV', 'V'],
      voltagetype: ['直流', '交流'],
      character: ['单位', '公司']
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    addStateUnits () {
      this.form.stateUnits.push({ state: '未填', endTime: '未填', requireResult: '未填' })
    },
    myDelete (el) {
      this.form.stateUnits = this.form.stateUnits.filter(o => o.state !== el.state)
    },
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataOfClassKey').then((res) => {
        console.log(res.data)
        this.categorys = res.data.categorys
        this.type = res.data.types
        this.designState = res.data.designProcess
        this.unit = res.data.sizeAndCapacitys
        this.major = res.data.majors
      }).catch((err) => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '网络连接错误',
          type: 'error'
        })
      })
    },
    confirm () {
      var stateUnits = []
      this.form.stateUnits.forEach((el, index) => {
        stateUnits.push({
          'state': el.state,
          'endTime': this.$formDate.formatDate(el.endTime),
          'requireResult': el.requireResult
        })
      })
      var data = {'sourceAccount': this.cookie.get('user'),
        'tenderCompany': this.form.company,
        'name': this.form.name,
        'state': '合同终止',
        'sizeCapacityNumber': this.form.sizeAndCapacitys,
        'sizeAndCapacity': this.form.unit,
        'bidType': this.form.character,
        'type': this.form.type,
        'category': this.form.categorys,
        'voltagelevel': this.form.voltagelevel1 + '/' + this.form.voltagelevel2 + '/' + this.form.voltagelevel3,
        'major': this.form.major,
        'address': this.form.place,
        'amountOfInvestment': this.form.lowPrice + '-' + this.form.highPrice,
        'lowestPrice': this.form.lowPrice,
        'highestPrice': this.form.highPrice,
        'instruction': this.form.instruction,
        'requirement': this.form.requirement,
        'startTime': this.$formDate.formatDate(this.form.startTime),
        'endTime': this.$formDate.formatDate(this.form.endTime),
        'isJointState': 'true',
        'processRequirements': stateUnits,
        'isOnlineAchivment': 'no'}
      this.$http.post(this.$domain.domain1 + 'electric-design/addProject1', data).then((res) => {
        if (res.data.result) {
          this.$message({
            message: '添加业绩成功',
            type: 'success'
          })
          this.$router.push('/per-project/' + res.data.code + '/pandect')
        } else {
          this.$message({
            message: `添加业绩失败,原因${res.data.reason}`,
            type: 'warning'
          })
        }
      }).catch((err) => { console.log(err) })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uploadAchieve{
  padding:1rem 4rem 0 4rem;
}
.uploadAchieve>.el-form{
  box-sizing: border-box;
    width:100%;
    margin:1rem auto;
    padding: 3rem;
        -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.title{
    text-align: left;
  font-size:1.5rem;
  margin-bottom:2rem;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
</style>
