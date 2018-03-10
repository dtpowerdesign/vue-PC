<template>
  <div class="person-register">
    <div class="title"><span style="font-size:2rem">注册信息</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <div style="margin-top:3rem">
      <p style="text-align:left">填写真实的资料更方便大家了解你，以下信息将显示在个人资料页。</p>
      <p style="text-align:left">(请不要在资料里留电话，QQ等联系方式，会导致您的资料无法通过审核)</p>
    </div>
    <el-row style="margin-top:2rem">
      <el-col :span="11" class="shadow">
        <el-form :label-position="labelPosition" label-width="120px" :model="ruleForm">
          <el-form-item label="姓名"  prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-col :span="24">
              <el-select v-model="ruleForm.age" placeholder="请选择年龄" style="width:100%">
              <el-option v-for="item in Ages" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="工作单位全称">
            <el-input v-model="ruleForm.workUnit" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="毕业院校">
            <el-input v-model="ruleForm.graduateInstitution" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="在平台工作时间">
            <el-select v-model="ruleForm.workType" style="width:100%">
              <el-option v-for="(i, j) in workType" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>                       
          <el-form-item label="能接受的出差最长时间">
            <el-select v-model="ruleForm.acceptableTravelTime" style="width:100%" filterable allow-create default-first-option>
              <el-option v-for="(i, j) in acceptableTravelTime" :key="j" :label="i" :value="i"></el-option>             
            </el-select>
          </el-form-item>   
          <el-form-item label="电话" prop="telephone">
            <el-input v-model="ruleForm.telephone" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="我的角色">
            <el-select style="width:100%" v-model="ruleForm.job" filterable allow-create default-first-option multiple>
              <el-option v-for="(i, j) in jobs" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-form-item>          
          <el-form-item label="所在地" prop="place">
            <div style="display:flex;justify-content:space-around;margin-left:0px">
            <el-select v-model="ruleForm.prov" placeholder="请选择省份" v-on:change="getProv($event)" style="width:30%;margin-right:0.6rem;">
              <el-option v-for="item in provs" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select v-model="ruleForm.city" placeholder="请选择城市" v-on:change="getCity($event)" style="width:30%;margin-right:0.6rem;">
              <el-option v-for="item in cities" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select v-model="ruleForm.area" placeholder="请选择区域" style="width:30%">
              <el-option v-for="item in areas" :key="item" :label="item" :value="item"></el-option>
            </el-select>            
            </div>
          </el-form-item>
          <el-form-item label="可工作的地点">
              <el-radio v-model="radio" label="1">全国</el-radio>
              <el-radio v-model="radio" label="2">自定义</el-radio>
          </el-form-item>
          <el-form-item label="工作地点选择" v-if="radio==='2'" v-for="(i, j) in workingAddress" :key="j">
            <div style="display:flex;justify-content:space-around;margin-left:0px">
            <el-select v-model="i.prov" placeholder="请选择省份" v-on:change="getProv($event)" style="width:25%;margin-right:0.6rem;">
              <el-option v-for="item in provs" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select v-model="i.city" placeholder="请选择城市" v-on:change="getCity($event)" style="width:25%;margin-right:0.6rem;">
              <el-option v-for="item in cities" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select v-model="i.area" placeholder="请选择区域" style="width:25%">
              <el-option v-for="item in areas" :key="item" :label="item" :value="item"></el-option>
            </el-select>            
            <i class="icon iconfont icon-cha" @click="deleteWorkingAddress(j)"></i>
            </div>
          </el-form-item>
          <el-form-item label="添加工作地点" v-if="radio==='2'"><el-button type="info" @click="addWorkingAddress()" style="width:100%">添加工作地点</el-button></el-form-item>
          <el-form-item><el-button type="primary" @click="submit()" style="width:120%;margin-left:-120px;">保存</el-button></el-form-item>
        </el-form>
      </el-col>
      <el-col :span="11" :offset="2" class="shadow">
        <div class="uploading">
          <p style="text-align:left;font-size:1.5rem">账号完整度</p>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="complete" :status="status" style="margin-top:2rem"></el-progress>
          <p style="text-align:left;font-size:1rem;margin-top:3rem;">您目前的账号完整度较低，建议通过以下方式完善你的信息，可有效提高投标成功率</p>
          <div class="div1-style">
            <span>上传学位证明等教育背景信息</span>
            <el-upload class="upload-demo" :action='$domain.domain1 + "electric-design/uploadUsersDatas"' :data="{'userDatatype': 'education', 'sourceType': $cookie.get('role'), 'sourceName': $cookie.get('name'), 'sourceAccount': $cookie.get('user')}" multiple name="data" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="div1-style">
            <span>上传有效身份证件，提高账号安全度</span>
            <el-upload class="upload-demo" :action='$domain.domain1 + "electric-design/uploadUsersDatas"' :data="{'userDatatype': 'idNumber', 'sourceType': $cookie.get('role'), 'sourceName': $cookie.get('name'), 'sourceAccount': $cookie.get('user')}" multiple name="data" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="div1-style">
            <span>上传职称或工作证明等工作信息</span>
            <el-upload class="upload-demo" :action='$domain.domain1 + "electric-design/uploadUsersDatas"' :data="{'userDatatype': 'work', 'sourceType': $cookie.get('role'), 'sourceName': $cookie.get('name'), 'sourceAccount': $cookie.get('user')}" multiple name="data" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div style="margin-top:3rem">
            <span style="color:#909399;font-size:1.5rem">个人简介</span>
            <el-input type="textarea" v-model="ruleForm.instruction" :autosize="{ minRows: 16, maxRows: 18}" placeholder="请输入内容"></el-input>
            <el-button type="success" @click="submitInstruction()">保存</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      radio: '1',
      complete: 100,
      status: 'success',
      Ages: [],
      workType: ['全职', '兼职'],
      jobs: ['学徒', '制图', '主设人', '校核人', '审核人', '项目经理', '工程代理', '平台项目分析师'],
      acceptableTravelTime: ['一天', '一周', '一个月', '长期'],
      labelPosition: 'right',
      workingAddress: [
        { prov: '',
          city: '',
          area: '' }],
      ruleForm: {
        name: '',
        sex: '',
        age: '',
        workUnit: '',
        graduateInstitution: '',
        acceptableTravelTime: '',
        workingAddress: '全国',
        workType: '',
        telephone: '',
        email: '',
        job: [],
        prov: '',
        city: '',
        area: '',
        instruction: ''
      },
      provs: [],
      cities: [],
      areas: []
    }
  },
  created () {
    this.$http.post(this.$domain.domain1 + 'electric-design/getPuserByAccount', {'account': this.cookie.get('user')}).then((res) => {
      console.log(res.data)
      this.ruleForm.name = res.data.name
      this.ruleForm.sex = res.data.sex
      this.ruleForm.age = res.data.age
      this.ruleForm.telephone = res.data.telephone
      this.ruleForm.email = res.data.email
      this.ruleForm.job = Array.isArray(res.data.jobs) ? res.data.jobs : []
      this.ruleForm.workUnit = res.data.workUnit
      this.ruleForm.graduateInstitution = res.data.graduateInstitution
      this.ruleForm.acceptableTravelTime = res.data.acceptableTravelTime
      if (Array.isArray(res.data.workingAddress)) {
        this.radio = '2'
        this.workingAddress = []
        res.data.workingAddress.forEach((el, index) => {
          this.workingAddress.push({
            'prov': el.split('/')[0],
            'city': el.split('/')[1],
            'area': el.split('/')[2]
          })
        })
      } else {
        this.radio = '1'
      }
      this.ruleForm.workingAddress = res.data.workingAddress
      this.ruleForm.workType = res.data.workType
      this.ruleForm.prov = res.data.birthAddress.province
      this.ruleForm.city = res.data.birthAddress.city
      this.ruleForm.area = res.data.birthAddress.area
      this.ruleForm.instruction = res.data.instruction
      this.complete = 10
      for (var i in res.data.dataOfDeepth) {
        if (res.data.dataOfDeepth[i] === 'yes') { this.complete += 30 }
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted () {
    this.Ages = []
    for (let i = 18; i < 80; i++) {
      this.Ages.push({value: i, label: i})
    }
    this.$http.get(this.$domain.domain1 + 'electric-design/getAreasOfChina').then(res => {
      this.provs = res.data
    }).catch(err => {
      console.log(err)
      this.$message({showClose: true,
        message: '网络连接错误',
        type: 'error'
      })
    })
  },
  methods: {
    addWorkingAddress () {
      this.workingAddress.push({
        prov: '',
        city: '',
        area: ''
      })
    },
    deleteWorkingAddress (index) {
      this.workingAddress = this.workingAddress.filter(o => this.workingAddress.indexOf(o) !== index)
    },
    getProv (prov) {
      this.cities = []
      for (var val of this.provs) {
        if (prov === val.name) {
          this.cities = val.cityList
          this.prov = val.name
        }
      }
    },
    getCity (city) {
      this.areas = []
      for (var val of this.cities) {
        if (city === val.name) {
          this.areas = val.areaList
          this.city = val.name
        }
      }
    },
    submit () {
      if (this.radio === '1') {
        this.ruleForm.workingAddress = '全国'
      } else {
        // this.ruleForm.workingAddress = ''
        var arrTemp = []
        this.workingAddress.forEach((el, index) => {
          arrTemp[index] = `${el.prov}/${el.city}/${el.area}`
        })
        this.ruleForm.workingAddress = arrTemp
      }
      this.$http.post(this.$domain.domain1 + 'electric-design/changePuserByAccount',
        {
          'account': this.cookie.get('user'),
          'data': {
            'account': this.cookie.get('user'),
            'name': this.ruleForm.name,
            'sex': this.ruleForm.sex,
            'age': this.ruleForm.age,
            'telephone': this.ruleForm.telephone,
            'email': this.ruleForm.email,
            'workUnit': this.ruleForm.workUnit,
            'graduateInstitution': this.ruleForm.graduateInstitution,
            'acceptableTravelTime': this.ruleForm.acceptableTravelTime,
            'workingAddress': this.ruleForm.workingAddress,
            'jobs': this.ruleForm.job,
            'workType': this.ruleForm.workType,
            'birthAddress': {
              'province': this.ruleForm.prov,
              'city': this.ruleForm.city,
              'area': this.ruleForm.area
            }}
        })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: `保存失败,原因${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    submitInstruction () {
      this.$http.post(this.$domain.domain1 + 'electric-design/changePuserByAccount',
        {
          'account': this.cookie.get('user'),
          'data': {
            'account': this.cookie.get('user'),
            'instruction': this.ruleForm.instruction
          }
        })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: `保存失败,原因${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    success (response, file, fileList) {
      console.log(response)
      this.complete += 30
      // this.complete = response.data
    },
    failure (err, file, fileList) {
      this.$message.warning(`${file.name}上传失败`)
      console.log(err)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-register{
  width:90%;
  margin: 1rem auto;
}
.title{
  border-bottom:1px solid black;
  text-align:left;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.el-col{
  background-color:white;
}
.el-form{
  margin:2rem 1rem;
}
.uploading{
  width:80%;
  margin:2rem auto;
}
.div1-style{
  margin-top:3rem;
  display:flex;
  justify-content:space-between;
}
.upload-demo{

}

.shadow{
 
  border-radius:.3rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;

}
</style>
