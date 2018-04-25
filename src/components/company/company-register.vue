<template>
  <div class="company-register">
    <div class="title"><span style="font-size:2rem">注册信息</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <div style="margin-top:3rem">
      <p style="text-align:left">填写真实的资料更方便大家了解你，以下信息将显示在个人资料页。</p>
      <p style="text-align:left">(请不要在资料里留电话，QQ等联系方式，会导致您的资料无法通过审核)</p>
    </div>
    <el-row style="margin-top:2rem">
      <el-col :span="11" class="shadow">
        <el-form :label-position="labelPosition" label-width="140px" :model="ruleForm">          
          <el-form-item label="企业全称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="企业电话">
            <el-input v-model="ruleForm.telephone" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="企业邮箱">
            <el-input v-model="ruleForm.email" style="width:100%"></el-input>
          </el-form-item>
          <el-form-item label="第一联系人姓名">
            <el-col :span="8"><el-input v-model="ruleForm.firstLinkmanName"></el-input></el-col>         
            <el-col :span="8">第一联系人号码</el-col>         
            <el-col :span="8"><el-input v-model="ruleForm.firstLinkmanPhnoe"></el-input></el-col>         
          </el-form-item>
          <el-form-item label="第二联系人姓名">
            <el-col :span="8"><el-input v-model="ruleForm.secondLinkmanName"></el-input></el-col>         
            <el-col :span="8">第二联系人号码</el-col>         
            <el-col :span="8"><el-input v-model="ruleForm.secondLinkmanPhnoe"></el-input></el-col>         
          </el-form-item>                    
          <el-form-item label="企业组织机构代码"><el-input v-model="ruleForm.companyCode"></el-input></el-form-item>
          <el-form-item label="企业人数">
            <el-select v-model="ruleForm.peopleNumber" style="width:100%" filterable allow-create default-first-option>
              <el-option v-for="(i, j) in peopleNumber" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>          
          <el-form-item label="企业成立时间"><el-date-picker v-model="ruleForm.grownTime" style="width:100%" type="date" placeholder="选择日期"></el-date-picker></el-form-item>
          <el-form-item label="企业办公地址详情"><el-input v-model="ruleForm.officeAddress"></el-input></el-form-item>
          <el-form-item label="企业网站"><el-input v-model="ruleForm.website"></el-input></el-form-item>
          <el-form-item label="企业类型">
            <el-select v-model="ruleForm.companyType" style="width:100%" multiple filterable allow-create default-first-option>
              <el-option v-for="(i, j) in companyType" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="我的角色">
            <el-select style="width:100%" v-model="ruleForm.job" filterable allow-create default-first-option multiple>
              <el-option v-for="(i, j) in jobs" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-form-item>      
          <el-form-item label="我的专业">
            <el-select style="width:100%" v-model="ruleForm.major" multiple filterable allow-create default-first-option>
              <el-option v-for="(i, j) in major" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-form-item>                            
          <el-form-item><el-button type="primary" @click="submit()" style="width:120%;margin-left:-140px;">保存</el-button></el-form-item>
        </el-form>
      </el-col>
      <el-col :span="11" :offset="2" class="shadow">
        <div class="uploading">
          <p style="text-align:left;font-size:1.5rem">账号完整度</p>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="complete>100?100:complete" :status="status" style="margin-top:2rem"></el-progress>
          <p style="text-align:left;font-size:1rem;margin-top:3rem;">您目前的账号完整度较低，建议通过以下方式完善你的信息，可有效提高投标成功率</p>
            <el-radio v-model="radio" label="1">三证合一上传</el-radio>
            <el-radio v-model="radio" label="2">独立上传</el-radio>
          <div class="div1-style" v-if="radio==='1'">
            <span>三证合一</span>
            <el-upload class="upload-demo" :action='$domain.domain1 + "electric-design/uploadUsersDatas"' :data="{'userDatatype': 'szhy', 'sourceType': $cookie.get('role'), 'sourceName': $cookie.get('name'), 'sourceAccount': $cookie.get('user')}" multiple name="data" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>          
          <div class="div1-style" v-if="radio==='2'">
            <span>营业执照</span>
            <el-upload class="upload-demo" :action='$domain.domain1 + "electric-design/uploadUsersDatas"' :data="{'userDatatype': 'yyzz', 'sourceType': $cookie.get('role'), 'sourceName': $cookie.get('name'), 'sourceAccount': $cookie.get('user')}" multiple name="data" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="div1-style" v-if="radio==='2'">
            <span>税务登记证</span>
            <el-upload class="upload-demo" :action='$domain.domain1 + "electric-design/uploadUsersDatas"' :data="{'userDatatype': 'swdjz', 'sourceType': $cookie.get('role'), 'sourceName': $cookie.get('name'), 'sourceAccount': $cookie.get('user')}" multiple name="data" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="div1-style" v-if="radio==='2'">
            <span>资质证书</span>
            <el-select placeholder="请选择证书等级" v-model="certificateLevel" filterable allow-create default-first-option>
              <el-option v-for="(i, j) in certificateLevels" :key="j" :value="i" :label="i"></el-option>
            </el-select>
            <el-upload class="upload-demo" :action='$domain.domain1 + "electric-design/uploadUsersDatas"' :data="{'userDatatype': 'zzzs', 'sourceType': $cookie.get('role'), 'sourceName': $cookie.get('name'), 'sourceAccount': $cookie.get('user'), 'level': certificateLevel}" multiple name="data" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div style="margin-top:3rem">
            <span style="color:#909399;font-size:1.5rem">企业简介</span>
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
      radio: '2',
      complete: 10,
      status: 'success',
      Ages: [],
      certificateLevel: '',
      certificateLevels: ['初级', '中级', '高级'],
      companyType: ['设计院', '施工企业', '开发商', '运营商'],
      peopleNumber: ['1-50', '50-150', '150-500'],
      labelPosition: 'right',
      major: [],
      jobs: ['学徒', '制图', '主设人', '校核人', '审核人', '项目经理', '工程代理', '平台项目分析师'],
      ruleForm: {
        name: '',
        sex: '',
        age: '',
        telephone: '',
        email: '',
        firstLinkmanName: '',
        firstLinkmanPhnoe: '',
        secondLinkmanName: '',
        secondLinkmanPhnoe: '',
        // workUnit: '',
        companyCode: '',
        peopleNumber: '',
        grownTime: '',
        officeAddress: '',
        website: '',
        job: [],
        companyType: [],
        instruction: '',
        major: []
      },
      provs: [],
      cities: [],
      areas: []
    }
  },
  created () {
    this.$http.get(this.$domain.domain1 + 'electric-design/getTypeMajors').then((res) => {
      this.major = res.data.majors
    }).catch((err) => {
      console.log(err)
      this.$message({showClose: true,
        message: '网络连接错误',
        type: 'error'
      })
    })
    this.$http.post(this.$domain.domain1 + 'electric-design/getDataOfClassKey')
        .then((res) => {
          this.jobs = res.data.duties
        }).catch((err) => {
          console.log(err)
        })
    this.$http.post(this.$domain.domain1 + 'electric-design/getCuserByAccount', {'account': this.cookie.get('user')}).then((res) => {
      // console.log(res.data)
      this.ruleForm.name = res.data.name
      this.ruleForm.telephone = res.data.telephone
      this.ruleForm.email = res.data.email
      this.ruleForm.firstLinkmanName = res.data.firstLinkmanName
      this.ruleForm.firstLinkmanPhnoe = res.data.firstLinkmanPhnoe
      this.ruleForm.secondLinkmanName = res.data.secondLinkmanName
      this.ruleForm.secondLinkmanPhnoe = res.data.secondLinkmanPhnoe
      // this.ruleForm.workUnit = res.data.workUnit
      this.ruleForm.companyCode = res.data.companyCode
      this.ruleForm.peopleNumber = res.data.peopleNumber
      this.ruleForm.grownTime = [].concat((res.data.grownTime.year + 1900), (res.data.grownTime.month + 1), res.data.grownTime.date).join('/')
      this.ruleForm.officeAddress = res.data.officeAddress
      this.ruleForm.website = res.data.website
      this.ruleForm.job = Array.isArray(res.data.jobs) ? res.data.jobs : []
      this.ruleForm.companyType = Array.isArray(res.data.companyType) ? res.data.companyType : []
      this.ruleForm.major = Array.isArray(res.data.major) ? res.data.major : []
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
  },
  methods: {
    submit () {
      this.$http.post(this.$domain.domain1 + 'electric-design/changeCuserByAccount',
        {
          'account': this.cookie.get('user'),
          'data': {
            'account': this.cookie.get('user'),
            'name': this.ruleForm.name,
            'telephone': this.ruleForm.telephone,
            'email': this.ruleForm.email,
            'firstLinkmanName': this.ruleForm.firstLinkmanName,
            'firstLinkmanPhnoe': this.ruleForm.firstLinkmanPhnoe,
            'secondLinkmanName': this.ruleForm.secondLinkmanName,
            'secondLinkmanPhnoe': this.ruleForm.secondLinkmanPhnoe,
            // 'workUnit': this.ruleForm.workUnit,
            'jobs': this.ruleForm.job,
            'major': this.ruleForm.major,
            'companyCode': this.ruleForm.companyCode,
            'peopleNumber': this.ruleForm.peopleNumber,
            'grownTime': this.$formDate.formatDate(this.ruleForm.grownTime),
            'officeAddress': this.ruleForm.officeAddress,
            'website': this.ruleForm.website,
            'companyType': this.ruleForm.companyType}
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
      this.$http.post(this.$domain.domain1 + 'electric-design/changeCuserByAccount',
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
.company-register{
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
  align-items: center;
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
