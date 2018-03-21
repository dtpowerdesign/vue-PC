<template>
  <div class="add">
      <div style="display:flex;justify-content:space-around;margin:1rem auto">
        <el-input placeholder="搜索群" @keyup.enter.native="mySearch()" v-model="search" style="width:90%">
        <i slot="prefix" class="el-input__icon el-icon-search" @click="mySearch()" style="font-size:1.5rem" ></i>
        </el-input>
        <el-button style="width:10%" type="success" @click="mySearch()">搜索</el-button>
      </div>
      <div class="exhibition">
        <div v-for="(i, j) in data.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="j" class="exhibitionDiv">
          <div class="exhibitionDivDiv"><span>群名称:</span><span>{{i.groupName}}</span></div>
          <div class="exhibitionDivDiv"><span>群账号:</span><span>{{i.groupId}}</span></div>
          <div class="exhibitionDivDiv"><span>创建者:</span><span>{{i.ownerId}}</span></div>
          <div class="exhibitionDivDiv"><span>群介绍:</span><span>{{i.instraction}}</span></div>
          <div class="exhibitionDivDiv"><span>群成员:</span><span>{{i.userIds.join(',')}}</span></div>
          <div class="exhibitionDivDiv"><el-button @click="open(i.groupId, i.groupName)" type="success" style="width:100%">加群</el-button></div>
        </div>
      </div>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 6, 9, 18]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.length">
      </el-pagination>
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
      currentPage: 1,
      pagesize: 5,
      dialogVisibleRemark: false,
      search: '',
      data: [],
      account: '',
      name: '',
      extraMsg: ''
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    mySearch () {
      this.$http.post(this.$domain.domain1 + 'electric-design/searchTableByValue', {'table': 'chatgroup', 'value': this.search})
      .then((res) => {
        console.log(res.data)
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
        'applyType': 'group',
        'toGroupId': this.account,
        'toName': this.name,
        'extraMsg': this.extraMsg
      })
      .then((res) => {
        if (res.data) {
          this.$http.post(this.$domain.domain1 + 'electric-design/group_publish', {
            'fromUserId': this.$cookie.get('user'),
            'fromUserName': this.$cookie.get('name'),
            'toGroupId': this.account,
            'toName': this.name,
            'objectName': 'RC:TxtMsg',
            'message': {content: '请求加入群:' + this.name, extra: '系统消息'}
          })
      .then((res) => {
        this.$message({
          type: 'success',
          message: `群申请发送成功,等待同意`
        })
        this.extraMsg = ''
      }).catch((err) => {
        console.log(err)
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
