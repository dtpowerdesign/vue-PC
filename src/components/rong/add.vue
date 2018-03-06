<template>
  <div class="add">
      <div style="display:flex;justify-content:space-around;margin:1rem auto">
        <el-input placeholder="搜索好友账号" @keyup.enter.native="mySearch()" v-model="search" style="width:90%">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="mySearch()" style="font-size:1.5rem" ></i>
        </el-input>
        <el-button style="width:10%" type="success" @click="mySearch()">搜索</el-button>
      </div>
      <div class="exhibition">
        <div v-for="(i, j) in data" :key="j" class="exhibitionDiv">
          <div class="exhibitionDivDiv"><span>姓名:</span><span>{{i.name}}</span></div>
          <div class="exhibitionDivDiv"><span>账号:</span><span>{{i.account}}</span></div>
          <div class="exhibitionDivDiv"><span>账号类型:</span><span>{{i.role}}</span></div>
          <div class="exhibitionDivDiv"><span>工作地点:</span><span>{{i.workingAddress}}</span></div>
          <div class="exhibitionDivDiv"><span>联系电话:</span><span>{{i.telephone}}</span></div>
          <div class="exhibitionDivDiv"><span>邮箱:</span><span>{{i.email}}</span></div>
          <div class="exhibitionDivDiv"><el-button @click="open(i.account, i.name)" type="success" style="width:100%">加好友</el-button></div>
        </div>
      </div>

      <el-dialog title="填写验证信息" :visible.sync="dialogVisibleRemark" width="30%">
        <el-input type="textarea" v-model="extraMsg" placeholder="验证信息"></el-input>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisibleRemark = false">取 消</el-button>
           <el-button type="primary" @click="confirm()">发送申请</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisibleRemark: false,
      search: '',
      data: [],
      account: '',
      name: '',
      extraMsg: ''
    }
  },
  methods: {
    mySearch () {
      this.$http.post(this.$domain.domain1 + 'electric-design/searchAllUsersByValue', {'value': this.search})
      .then((res) => {
        // console.log(res.data)
        this.data = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    open (account, name) {
      this.dialogVisibleRemark = true
      this.account = account
      this.name = name
    },
    confirm () {
      this.$http.post(this.$domain.domain1 + 'electric-design/applyNewFriend', {
        'fromUserId': this.$cookie.get('user'),
        'fromUserName': this.$cookie.get('name'),
        'applyType': 'normal',
        'toUserId': this.account,
        'toName': this.name,
        'extraMsg': this.extraMsg
      })
      .then((res) => {
        if (res.data) {
          this.$message({
            type: 'success',
            message: `申请发送成功,等待对方同意`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `发送失败,原因:${res.data.reason}`
          })
        }
        this.dialogVisibleRemark = false
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add{
    width: 90%;
    margin: auto;
}
.exhibition{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.exhibitionDiv{
    width:30%;
    margin:1rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.exhibitionDiv:hover{
    -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.exhibitionDivDiv{
    margin: 1rem 2rem;
    display: flex;
    justify-content: space-between;
}
</style>
