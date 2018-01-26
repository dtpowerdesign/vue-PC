<template>
  <div class="person-register">
    <div class="title"><span style="font-size:2rem">注册信息</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <div style="margin-top:3rem">
      <p style="text-align:left">填写真实的资料更方便大家了解你，以下信息将显示在个人资料页。</p>
      <p style="text-align:left">(请不要在资料里留电话，QQ等联系方式，会导致您的资料无法通过审核)</p>
    </div>
    <el-row style="margin-top:2rem">
      <el-col :span="11" class="shadow">
        <el-form :label-position="labelPosition" label-width="80px" :model="ruleForm">
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
          <el-form-item label="电话" prop="telephone">
            <el-input v-model="ruleForm.telephone" style="width:75%"></el-input><el-button type="primary" style="margin-left:2rem">绑定</el-button>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" style="width:75%"></el-input><el-button type="primary" style="margin-left:2rem">绑定</el-button>
          </el-form-item>
          <el-form-item label="所在地" prop="place">
            <el-select v-model="ruleForm.prov" placeholder="请选择省份" v-on:change="getProv($event)" style="width:8rem;margin-right:0.6rem;">
              <el-option v-for="item in provs" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select v-model="ruleForm.city" placeholder="请选择城市" v-on:change="getCity($event)" style="width:8rem;margin-right:0.6rem;">
              <el-option v-for="item in cities" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <el-select v-model="ruleForm.area" placeholder="请选择区域" style="width:8rem">
              <el-option v-for="item in areas" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item><el-button type="primary" @click="submit()">保存</el-button></el-form-item>
        </el-form>
      </el-col>
      <el-col :span="11" :offset="2" class="shadow">
        <div class="uploading">
          <p style="text-align:left;font-size:1.5rem">账号完整度</p>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="complete" :status="status" style="margin-top:2rem"></el-progress>
          <p style="text-align:left;font-size:1rem;margin-top:3rem;">您目前的账号完整度较低，建议通过以下方式完善你的信息，可有效提高投标成功率</p>
          <div class="div1-style">
            <span>上传学位证明等教育背景信息</span>
            <el-upload class="upload-demo" action="http://39.106.34.156:8080/electric-design/uploadPublicProjectImages" :data="{'account':123}" multiple name="mFile" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="div1-style">
            <span>上传有效身份证件，提高账号安全度</span>
            <el-upload class="upload-demo" action="http://39.106.34.156:8080/electric-design/uploadUserIdNumberFile" :data="{'account':123}" multiple name="mFile" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
          <div class="div1-style">
            <span>上传职称或工作证明等工作信息</span>
            <el-upload class="upload-demo" action="http://39.106.34.156:8080/electric-design/uploadPublicProjectImages" :data="{'account':123}" multiple name="mFile" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
</el-upload>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
      complete: 100,
      status: 'success',
      Ages: [],
      labelPosition: 'right',
      ruleForm: {
        name: '',
        sex: '',
        age: '',
        telephone: '',
        email: '',
        prov: '',
        city: '',
        area: ''
      },
      provs: [],
      cities: [],
      areas: []
    }
  },
  created () {
    this.$http.post('http://39.106.34.156:8080/electric-design/getPuserByAccount', {'account': '123'}).then((res) => {
      this.ruleForm.name = res.data.name
      this.ruleForm.sex = res.data.sex
      this.ruleForm.age = res.data.age
      this.ruleForm.telephone = res.data.telephone
      this.ruleForm.email = res.data.email
      this.ruleForm.prov = res.data.birthAddress.province
      this.ruleForm.city = res.data.birthAddress.city
      this.ruleForm.area = res.data.birthAddress.area
    }).catch((err) => {
      console.log(err)
    })
  },
  mounted () {
    this.Ages = []
    for (let i = 18; i < 80; i++) {
      this.Ages.push({value: i, label: i})
    }
    this.$http.get('http://39.106.34.156:8080/electric-design/getAreasOfChina').then(res => {
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
      this.$http.post('http://39.106.34.156:8080/electric-design/changePuserByAccount',
        {
          'account': '123464854',
          'data': {
            'account': '123464854',
            'name': this.ruleForm.name,
            'sex': this.ruleForm.sex,
            'age': this.ruleForm.age,
            'telephone': this.ruleForm.telephone,
            'email': this.ruleForm.email,
            'birthAddress': {
              'province': this.ruleForm.prov,
              'city': this.ruleForm.city,
              'area': this.ruleForm.area
            }}
        })
      .then((res) => {
        console.log('修改成功')
      }).catch((err) => {
        console.log(err)
      })
    },
    success (response, file, fileList) {
      console.log(response)
      this.complete = response.data
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
