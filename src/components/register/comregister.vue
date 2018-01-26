<template>
  <div class="comregister">
   <div class="top">
   <div class="top-left"><img src="../../../static/logo.png" alt=""><span>南瑞美思</span><span>|</span><span>企业注册</span></div>
   <div class="top-right"><span>设计服务</span><span>设计师</span><span>客户端下载</span><span>App</span></div>
  </div>
  <el-row>
  <el-col :span="8" :offset="2">
  <el-form :model="Form" status-icon label-position="left":rules="rules" ref="perregister" label-width="100px">
  <el-form-item label="账号" prop="user">
    <el-input type="text" v-model="Form.user" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="公司" prop="company">
    <el-input type="text" v-model="Form.company" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="Form.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="Form.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="Form.age"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="phonenumber">
    <el-input type="text" v-model.number="Form.phonenumber" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="验证码" prop="check">
    <el-col :span="16"><el-input type="text" v-model="Form.check" auto-complete="off"></el-input></el-col>
    <el-col :span="8"><el-button type="primary" @click="check()">免费获取</el-button></el-col>
  </el-form-item>
  <el-form-item style="margin-left:-100px">
    <el-button type="primary" @click="submitForm('Form')">注册</el-button>
    <el-button @click="resetForm('Form')">重置</el-button>
  </el-form-item>
  </el-form>
  </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  data () {
    var validateUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      } else {
        callback()
      }
    }
    var validateCompany = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('公司不能为空'))
      } else {
        callback()
      }
    }
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.Form.checkPass !== '') {
          this.$refs.perregister.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.Form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var checkPhonenumber = (rule, value, callback) => {
      var re = /^1\d{10}$/
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'))
      } else if (!re.test(value)) {
        callback(new Error('请输入正确的手机号格式'))
      } else {
        callback()
      }
    }
    var checkCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else if (value !== this.Form.returnCheck) {
        callback(new Error('请输入与收到短信同样的的验证码'))
      } else {
        callback()
      }
    }
    return {
      Form: {
        user: '',
        comapny: '',
        pass: '',
        checkPass: '',
        age: '',
        phonenumber: '',
        check: '',
        returnCheck: '1111'
      },
      rules: {
        user: [
            { validator: validateUser, trigger: 'blur' }
        ],
        company: [
            { validator: validateCompany, trigger: 'blur' }
        ],
        pass: [
            { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
            { validator: checkAge, trigger: 'blur' }
        ],
        phonenumber: [
            { validator: checkPhonenumber, trigger: 'change' }
        ],
        check: [
            { validator: checkCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    check () {
      this.$http.post('http://39.106.34.156:8080/electric-design/sendCheckMsgByJson', {'testNumber': this.Form.phonenumber}).then((res) => {
        console.log(res.data)
        this.Form.returnCheck = res.data.checkMsg
      }).catch((err) => {
        console.log(err)
      })
    },
    submitForm (formName) {
      this.$refs.perregister.validate((valid) => {
        if (valid) {
          alert('submit!')
          this.$http.post('', {}).then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs.perregister.resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comregister{
    background-image:url(../../../static/comregister.png);
    height:100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.top{
    background-color:#4d83e7;
    display:flex;
    justify-content:space-between;
}
.top span{
    cursor:pointer;
}
.top span:hover{
    color:yellow;
}
.top-left{
    width:30%;
    display:flex;
    justify-content:center;
    align-items:center;
}
.top-left>img{
    width:15%;
}
.top-left>span{
    font-size:1.5rem;
    color:white;
    margin-left:.5rem;
}
.top-right{
    color:white;
    font-size:1.2rem;
    display:flex;
    justify-content:center;
    align-items:center;
}
.top-right>span{
    margin-right:1rem;
}
.el-form{
    margin-top:4%;
    padding:2rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  border-radius:.3rem .3rem 0 0
}

</style>
