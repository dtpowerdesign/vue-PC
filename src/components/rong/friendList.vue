<template>
  <div class="friendList">
   <div class="friendListDiv" v-for="(i, j) in data" :key="j">
          <div class="friendListDivDiv"><span>姓名:</span><span>{{i.name}}</span></div>
          <div class="friendListDivDiv"><span>账号:</span><span>{{i.account}}</span></div>
          <div class="friendListDivDiv"><span>账号类型:</span><span>{{i.role}}</span></div>
          <div class="friendListDivDiv"><span>工作地点:</span><span>{{i.workingAddress}}</span></div>
          <div class="friendListDivDiv"><span>联系电话:</span><span>{{i.telephone}}</span></div>
          <div class="friendListDivDiv"><span>邮箱:</span><span>{{i.email}}</span></div>
          <div class="friendListDivDiv"><el-button @click="send()" type="success">发送信息</el-button><el-button @click="myDelete(i.account, i.name)" type="danger">删除好友</el-button></div>   
   </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getFriendList', {'userId': this.$cookie.get('user')})
      .then((res) => {
        console.log(res.data)
        this.data = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    myDelete (account, name) {
      this.$http.post(this.$domain.domain1 + 'electric-design/delFriend', {'fromUserId': this.$cookie.get('user'), 'toUserId': account})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `成功删除好友${name}`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `成功好友${name}失败,原因:${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friendList{
    width: 90%;
    margin: 1rem auto;
}
.friendListDiv{
        width:30%;
    margin:1rem;
    padding: 1rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.friendListDiv:hover{
    -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.friendListDivDiv{
        margin: 1rem 2rem;
    display: flex;
    justify-content: space-between;
}
</style>
