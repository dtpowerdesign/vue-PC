<template>
  <div class="alter">
    <div class="title0"><span style="font-size:2rem">修改项目信息</span><i class="icon iconfont icon-iconfontquestion" style="font-size:2rem"></i></div>
    <div class="data" v-if="form.dataOrProject==='data'">
    <div class="title"><span>任务基本信息</span><a :href="help1" class="help">不会填?点我</a></div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px" style="width:100%"> 
        <el-form-item label="项目名称">
          <el-col :span="9">
            <el-input v-model="form.name"></el-input>
          </el-col>         
          <el-col :offset="5" :span="5">是否接受联合投标</el-col>
          <el-col :span="5">
           <el-switch v-model="form.isAcceptJointBid" active-text="是" inactive-text="否" inactive-value="false" active-value="true"></el-switch>
          </el-col>              
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
        <el-form-item label="关于投标">
          <el-col :span="9">
            <el-select v-model="form.state"  placeholder="请选择" style="width:100%">
            <el-option v-for="(i,j) in states" :key="j" :label="i.label" :value="i.value"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="5" :span="2">设计阶段</el-col>
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
        <el-form-item label="开始时间">
          <el-col :span="9">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>          
          <el-col :offset="5" :span="2">开始时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input  v-model="form.instruction" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目描述"></el-input>
        </el-form-item>        
        <el-form-item label="项目要求">
          <el-input  v-model="form.requirement" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目要求"></el-input>
        </el-form-item>                
      </el-form>
    </div>      
    <div class="title">付款相关<a :href="help3" class="help">不会填?点我</a></div>
    <div class="content">
      <el-form :model="form" label-width="180px" style="width:100%">
        <el-form-item label="付款方式/付款比例">
          <el-col :span="8" style="display:flex;justify-content:space-between">
            <el-select v-model="form.paymentMethods" placeholder="选择" style="width:40%">
              <el-option v-for="(i,j) in paymentMethods" :key="j" :value="i" :label="i"></el-option>
            </el-select>
            <el-select v-model="form.paymentScale" placeholder="自填或选择" style="width:40%" filterable allow-create default-first-option>
              <el-option v-for="(i,j) in paymentScale" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="form.hasInvoice" active-text="有发票" inactive-text="无发票" active-value="yes" inactive-value="no"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="付款描述">
          <el-input v-model="form.payDiscible" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入付款描述"></el-input>
        </el-form-item>
      </el-form>
    </div>
    </div>    
    <div class="Project" v-else>
    <div class="title"><span>项目基本信息</span></div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px" style="width:100%"> 
        <el-form-item label="招标公司">
          <el-col :span="9">
            <el-input v-model="form.company"></el-input>
          </el-col>
          <el-col :offset="5" :span="5">是否接受联合投标</el-col>
          <el-col :span="5">
           <el-switch v-model="form.isAcceptJointBid" active-text="是" inactive-text="否" inactive-value="false" active-value="true"></el-switch>
          </el-col>          
        </el-form-item>
        <el-form-item label="项目名称">
          <el-col :span="9">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col class="line" :offset="5" :span="2">类别</el-col>
          <el-col :span="8">
            <el-select v-model="form.categorys" placeholder="请选择类别" style="width:100%" filterable allow-create default-first-option>
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
       <el-form-item label="工程限价">
          <el-col :span="9">
          <el-input v-model="form.lowPrice" placeholder="最低" style="width:40%;"></el-input>
          <span style="font-size:1.2rem;color:red">到</span>
          <el-input v-model="form.highPrice" placeholder="最高" style="width:40%;"></el-input>
          </el-col>
       </el-form-item>        
        <el-form-item label="项目描述">
          <el-input  v-model="form.instruction" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目描述"></el-input>
        </el-form-item>        
        <el-form-item label="项目要求">
          <el-input  v-model="form.requirement" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目要求"></el-input>
        </el-form-item>          
        <el-button @click="confirm()" style="width:100%" type="success">保存修改</el-button>
      </el-form>
    </div>
    <div class="title"><span>项目资质要求</span></div>
    <div class="content">
      <el-form :model="form" label-width="140px" style="width:100%">
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
        <el-form-item label="所需资质">
          <el-col :span="8">
            <el-input v-model="form.aptitude" placeholder="请选择所需资质" style="width:100%"></el-input>
          </el-col>
        </el-form-item>
        <el-button @click="confirm()" style="width:100%" type="success">保存修改</el-button>
      </el-form>
    </div>
    <div class="title"><span>付款相关</span></div>
    <div class="content">
     <el-form :model="form" label-width="180px" style="width:100%">
        <el-form-item label="付款方式/付款比例">
          <el-col :span="8" style="display:flex;justify-content:space-between">
            <el-select v-model="form.paymentMethods" placeholder="选择" style="width:40%">
              <el-option v-for="(i,j) in paymentMethods" :key="j" :value="i" :label="i"></el-option>
            </el-select>
            <el-select v-model="form.paymentScale" placeholder="自填或选择" style="width:40%" filterable allow-create default-first-option>
              <el-option v-for="(i,j) in paymentScale" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-switch v-model="form.hasInvoice" active-text="有发票" inactive-text="无发票" active-value="yes" inactive-value="no"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="付款描述">
          <el-input v-model="form.payDiscible" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入付款描述"></el-input>
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
        <el-button type="primary" @click="addStateUnits()" style="width:100%">增加设计阶段</el-button>
      </el-form>
    </div>
    </div>
    <el-button @click="confirm()" style="width:100%" type="success">保存修改</el-button>
  </div>
</template>

<script>
import store from '@/vuex/perProject'
import {mapState} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['id'])
  },
  data () {
    return {
      disabled: false,
      radio: '2',
      form: {
        dataOrProject: '',
        company: '某某公司',
        name: '项目',
        state: '',
        sizeAndCapacitys: '',
        categorys: '',
        unit: '',
        type: [],
        voltagelevel1: '',
        voltagelevel2: 100,
        voltagelevel3: '',
        place: '',
        major: [],
        designState: '',
        startTime: '',
        endTime: '',
        character: '',
        performanceReq1: '',
        performanceReq2: '',
        lowPrice: '暂无',
        highPrice: '暂无',
        priceType: '',
        aptitude: '',
        paymentMethods: '',
        paymentScale: '',
        isAcceptJointBid: 'true',
        instruction: '',
        requirement: '',
        payDiscible: '',
        projectNowState: '',
        hasInvoice: 'no',
        stateUnits: [
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' },
      { state: '未填', endTime: '未填', requireResult: '未填' }
        ]
      },
      // qualificationRequirements: { CET: '' },
      projectCharacteristics: { difficulty: '', price: '' },
      unit: ['MW', 'Kva', 'KV', `M^2`],
      existingData: { detail: '' },
      states: [{ 'value': '发布中', 'label': '发布完不立即招标' }, { 'value': '投标中', 'label': '发布完直接招标' }],
      major: ['计算机', '电力', '岩土', '绘测'],
      designState: ['前期', '项目建议书', '可行性研究报告', '招投标', '初步设计', '施工图设计', '竣工图编制'],
      sizeAndCapacitys: ['MW', 'KW', 'kVA'],
      categorys: ['火电', '水电', '风电', '光伏', '核电', '储能'],
      type: ['发电厂', '输电', '变电', '供配电', '建筑'],
      voltagelevel: ['KV', 'V'],
      voltagetype: ['直流', '交流'],
      character: ['单位', '公司'],
      performanceReq: ['同类型同规模', '同类型'],
      priceType: ['最低', '最高'],
      aptitude: ['高资质', '低资质'],
      paymentMethods: ['一次性付款', '分阶段付款'],
      paymentScale: ['1:1', '2:1', '3:1'],
      projectNowStates: ['未开始', '项目建议书', '可研已定', '初设已定', '施工图已定', '竣工图已定']
    }
  },
  updated () {
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
    //   var stateUnits = []
    //   this.form.stateUnits.forEach((el, index) => {
    //     stateUnits.push({
    //       'state': el.state,
    //       'endTime': this.$formDate.formatDate(el.endTime),
    //       'requireResult': el.requireResult
    //     })
    //   })
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': this.id})
      .then((res) => {
        console.log(res.data)
        this.form.company = res.data.tenderCompany
        this.form.dataOrProject = res.data.dataOrProject
        this.form.name = res.data.name
        this.form.categorys = res.data.category
        this.form.sizeAndCapacitys = res.data.sizeCapacityNumber
        this.form.unit = res.data.sizeAndCapacity
        this.form.character = res.data.bidType
        this.form.type = res.data.type
        this.form.voltagelevel1 = res.data.voltagelevel.split('/')[0]
        this.form.voltagelevel2 = res.data.voltagelevel.split('/')[1]
        this.form.voltagelevel3 = res.data.voltagelevel.split('/')[2]
        this.form.major = res.data.major
        this.form.place = res.data.address
        this.form.performanceReq1 = res.data.performanceRequirements.split('/数量要求:')[0]
        this.form.performanceReq2 = res.data.performanceRequirements.split('/数量要求:')[1]
        this.form.designState = res.data.designProcess
        this.form.lowPrice = res.data.lowestPrice
        this.form.highPrice = res.data.highPrice
        this.form.instruction = res.data.instruction
        this.form.requirement = res.data.requirement
        this.form.payDiscible = res.data.payDiscible
        this.form.projectNowState = res.data.projectNowState
        this.form.hasInvoice = res.data.hasInvoice
        this.form.aptitude = res.data.qualificationRequirements[0]
        this.form.startTime = [].concat((res.data.startTime.year + 1900), (res.data.startTime.month + 1), res.data.startTime.date).join('/')
        this.form.endTime = [].concat((res.data.endTime.year + 1900), (res.data.endTime.month + 1), res.data.endTime.date).join('/')
        this.form.paymentMethods = res.data.payMethod.split('/')[0]
        this.form.paymentScale = res.data.payMethod.split('/')[1]
        this.form.isAcceptJointBid = res.data.isAcceptJointBid
        this.form.stateUnits = res.data.processRequirements
      }).catch((err) => {
        console.log(err)
      })
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
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataOfClassKey')
      .then((res) => {
        this.paymentScale = res.data.payScale
        this.projectNowStates = res.data.projectNowState
      }).catch((err) => {
        console.log(err)
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
        'state': this.form.state,
        'sizeCapacityNumber': this.form.sizeAndCapacitys,
        'sizeAndCapacity': this.form.unit,
        'bidType': this.form.character,
        'type': this.form.type,
        'category': this.form.categorys,
        'voltagelevel': this.form.voltagelevel1 + '/' + this.form.voltagelevel2 + '/' + this.form.voltagelevel3,
        'major': this.form.major,
        'address': this.form.place,
        'performanceRequirements': this.form.performanceReq1 + '/数量要求:' + this.form.performanceReq2,
        'designProcess': this.form.designState,
        'amountOfInvestment': this.form.lowPrice + '-' + this.form.highPrice,
        'lowestPrice': this.form.lowPrice,
        'highestPrice': this.form.highPrice,
        'instruction': this.form.instruction,
        'requirement': this.form.requirement,
        'payDiscible': this.form.payDiscible,
        'projectNowState': this.form.projectNowState,
        'hasInvoice': this.form.hasInvoice,
        'qualificationRequirements': [this.form.aptitude],
        'startTime': this.$formDate.formatDate(this.form.startTime),
        'endTime': this.$formDate.formatDate(this.form.endTime),
        'payMethod': this.form.paymentMethods + '/' + this.form.paymentScale,
        'isAcceptJointBid': this.form.isAcceptJointBid,
        'isJointState': 'true',
        'processRequirements': stateUnits}
      this.$http.post(this.$domain.domain1 + 'electric-design/updateProjectByProjectCode', {'code': this.id, 'data': data}).then((res) => {
        if (res.data.result) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: `修改失败,原因${res.data.reason}`,
            type: 'warning'
          })
        }
      }).catch((err) => { console.log(err) })
    }
  },
  mounted () {
    this.initData()
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
.alter{
      width:90%;
  margin:1rem auto;
}
.title0{
  border-bottom:1px solid black;
  text-align:left;
}
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
  width:100%;
  margin:3rem auto 0 auto;
  font-weight:400;
  font-size:1.5rem;
  border-bottom: 1px solid black;
}
.content{
  margin:3rem auto 0 auto;
  width:100%;
  display:flex;
}
</style>
