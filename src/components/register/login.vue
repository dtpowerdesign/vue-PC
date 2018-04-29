<template>
  <div class="login">
    <div class="top">
       <div class="top-left"><img src="../../../static/logo-buleBGC.png" alt=""><span onclick="window.location.href='http://39.106.34.156:8080/zs/home/'">{{msg}}</span><span>|</span><span @click="$router.push('/perregister')">个人注册</span><span @click="$router.push('/comregister')">企业注册</span><span @click="$router.push('/login')" style="color:yellow">登录</span></div>
      <div class="top-right"><span>设计服务</span><span>设计师</span><span>客户端下载</span><span>App</span></div>
    </div>
    <el-form :model="Form" status-icon :rules="rules"  label-width="100px" ref="login" id="login">
      <el-form-item label="" prop="user" style="margin-left:-100px">
        <el-input v-model="Form.user" placeholder="输入email/手机号" @keyup.enter.native="next()">
        <i slot="prefix" class="icon iconfont icon-zhanghao"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="" prop="pass" style="margin-left:-100px">
        <el-input type="password" v-model="Form.pass" placeholder="输入密码" @keyup.enter.native="login()" id="pass">
        <i slot="prefix" class="icon iconfont icon-suo"></i>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left:-100px">
        <div style="display:flex;justify-content:space-between">
          <el-checkbox v-model="checked">记住我(30天内自动登录)</el-checkbox>
          <span style="cursor:pointer;color:gray;" @click="dialogVisible = true">忘记密码？</span>
        </div>
      </el-form-item>
      <el-form-item style="margin-left:-100px">
        <el-button type="primary" style="width:100%" @click="login()">登录</el-button>
      </el-form-item>
      <!-- <el-form-item style="margin-left:-100px">
        <div style="display:flex;justify-content:flex-start;align-items:center">
          <span style="font-size:1.5rem" onclick="startInit()">第三方账号登录</span><i class="icon iconfont icon-qq" style="font-size:2rem;color:#409eff;margin-left:.5rem"></i><i class="icon iconfont icon-weixin"style="font-size:1.8rem;color:#45b90c;margin-left:.5rem"></i>
        </div>
      </el-form-item> -->
    </el-form>
    <el-dialog title="找回密码" :visible.sync="dialogVisible" width="30%">
      <el-form :model="Form" status-icon :rules="rules"  label-width="100px" ref="change">
        <el-form-item label="账号" prop="user">
          <el-input v-model="Form.user" placeholder="输入email/手机号"></el-input>
          <el-button @click="check" style="width:100%" type="primary">发送短信/邮件</el-button>
        </el-form-item>
       <el-form-item label="新的密码" prop="pass">
          <el-input v-model="Form.pass" placeholder="输入新的密码"></el-input>
        </el-form-item>        
        <el-form-item label="验证码">
          <el-input v-model="Form.MSG" placeholder="输入验证码" type="text" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="change">确 定</el-button>
      </span>
     </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var validateUser = (rule, value, callback) => {
      var re = /0?(13|14|15|17|18|19)[0-9]{9}|\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else if (!re.test(value)) {
        return callback(new Error('账号只能为手机号或者邮箱'))
      } else if (!this.$preSQL.pre(value)) {
        callback(new Error('非法字符串'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!this.$preSQL.pre(value)) {
        callback(new Error('非法字符串'))
      } else {
        callback()
      }
    }
    var checkCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空'))
      } else if (value !== this.Form.returnCheck) {
        callback(new Error('请输入与收到短信同样的的验证码'))
      } else if (!this.$preSQL.pre(value)) {
        callback(new Error('非法字符串'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      msg: '',
      checked: true,
      Form: {
        returnCheck: '',
        user: '',
        pass: '',
        MSG: ''
      },
      rules: {
        user: [
            { validator: validateUser, trigger: 'blur' }
        ],
        pass: [
            { validator: validatePass, trigger: 'blur' }
        ],
        check: [
            { validator: checkCheck, trigger: 'blur' }
        ]}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getHomepagedata')
      .then((res) => {
        this.msg = res.data.platformName
      }).catch((err) => {
        console.log(err)
      })
      if (this.$cookie.get('user')) {
        this.$message({
          type: 'success',
          message: `检测到您的账号${this.$cookie.get('user')},自动为您登陆`
        })
        if (this.$cookie.get('role') === 'puser') {
          this.$router.push('/per/person-perAchi')
        } else {
          this.$router.push('/com/company-comAchi')
        }
        // window.startInit()
        this.$nextTick(() => {
          this.$startInit(this.$cookie.get('user'), {token: this.$cookie.get('token')})
        })
        // console.log($('#appKey').text())
        // console.log($('#token').text())
      }
    },
    next () {
      $('#pass').focus()
    },
    login () {
      this.$refs.login.validate((valid) => {
        if (valid) {
          this.$http.post(this.$domain.domain1 + 'electric-design/AllUserLogin', {
            'account': this.Form.user,
            'password': this.Form.pass
          }).then((res) => {
            if (res.data.result && res.data.result !== 'false') {
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              // this.appKey = this.$appKey.appKey
              // this.token = res.data.token
              if (this.checked) {
                this.cookie.set('user', this.Form.user, 30)
                this.cookie.set('pass', this.Form.pass, 30)
                this.cookie.set('role', res.data.role, 30)
                this.cookie.set('name', res.data.name, 30)
                this.cookie.set('token', res.data.token, 30)
              } else {
                this.cookie.set('user', this.Form.user)
                this.cookie.set('pass', this.Form.pass)
                this.cookie.set('role', res.data.role)
                this.cookie.set('name', res.data.name)
                this.cookie.set('token', res.data.token)
              }
              // window.startInit()
              this.$nextTick(() => {
                this.$startInit(this.$cookie.get('user'), {token: res.data.token})
              })
              if (res.data.role === 'puser') {
                this.$router.push('/per/person-perAchi')
              } else {
                this.$router.push('/com/company-comAchi')
              }
            } else {
              this.$message({
                message: `登录失败:${res.data.reason}`,
                type: 'warning'
              })
            }
          }).catch((err) => { console.log(err) })
        } else {
          this.$message({
            message: '请确保所填信息符合要求',
            type: 'warning'
          })
        }
      })
    },
    check () {
      this.$http.post(this.$domain.domain1 + 'electric-design/sendFindPasswordMsg', {'number': this.Form.user}).then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '验证码发送成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: `验证码发送失败,原因${res.data.reason}`
          })
        }
        this.Form.returnCheck = res.data.checkMsg
        console.log(this.Form.returnCheck)
      }).catch((err) => {
        console.log(err)
      })
    },
    change () {
      this.$refs.change.validate((valid) => {
        if (valid) {
          this.$http.post(this.$domain.domain1 + 'electric-design/ChangePass', {'account': this.Form.user, 'password': this.Form.pass, 'checkMsg': this.Form.MSG})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '修改密码成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: `失败原因${res.data.reason}`
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
        } else {
          this.$message({
            message: '请确保所填信息符合要求',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
    background-image:url(../../assets/login.png);
    height:100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.top{
    background-color:#4d83e7;
    display:flex;
    justify-content:space-between;
    height: 6%;
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
    width:5%;
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
#login{
  width:21%;
  margin:10% auto 0 auto;
    padding:2.5rem 1.5rem 0.3rem 1.5rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  border-radius:.3rem .3rem 0 0
}
#login:hover{
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.icon{

}
</style>
