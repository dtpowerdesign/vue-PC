<template>
  <div class="friendList">
   <div class="friendListDiv" v-for="(i, j) in data" :key="j">
          <div class="friendListDivDiv"><span>姓名:</span><span>{{i.name}}</span></div>
          <div class="friendListDivDiv"><span>账号:</span><span>{{i.account}}</span></div>
          <div class="friendListDivDiv"><span>账号类型:</span><span>{{i.role}}</span></div>
          <div class="friendListDivDiv"><span>工作地点:</span><span>{{i.workingAddress}}</span></div>
          <div class="friendListDivDiv"><span>联系电话:</span><span>{{i.telephone}}</span></div>
          <div class="friendListDivDiv"><span>邮箱:</span><span>{{i.email}}</span></div>
          <div class="friendListDivDiv"><el-badge value="new"><el-button @click="open(i.account, i.name)" type="success">发送信息</el-button></el-badge><el-button @click="myDelete(i.account, i.name)" type="danger">删除好友</el-button></div>   
   </div>
   <el-dialog :title="toName" :visible.sync="dialogVisibleChat" width="60%">
     <span @click="limit+=10;getChatMsg()" style="color:#409EFF">显示更多</span>
     <div class="chatContent">
       <!-- <div class="from">{{}}</div> -->
       <div v-for="(i, j) in ChatMsg" :key="j" style="margin-top: 2rem;">
         <div style="color:#409EFF">
           <div v-if="i.fromUserId===$cookie.get('user')" style="text-align:right">{{i.msgTime.year+1900}}/{{i.msgTime.month+1}}/{{i.msgTime.date}}/{{i.msgTime.hours}}:{{i.msgTime.minutes}}:{{i.msgTime.seconds}}</div>
           <div v-if="!(i.fromUserId===$cookie.get('user'))" style="text-align:left">{{i.msgTime.year+1900}}/{{i.msgTime.month+1}}/{{i.msgTime.date}}/{{i.msgTime.hours}}:{{i.msgTime.minutes}}:{{i.msgTime.seconds}}</div>
         </div>
         <div :class="[i.fromUserId===$cookie.get('user')?'divFrom':'divTo','divFromOrTo']">
           <div>{{i.fromUserName}}</div><div>:</div><p style="space-white:pre-wrap;max-width:60%;text-align:left;">{{i.message.content}}</p>
         </div>
       </div>
       <!-- <div class="from">{{message}}</div> -->
     </div>
     <el-input v-model="message" @keyup.enter.native="send()" autofocus></el-input>
     <span slot="footer" class="dialog-footer">
     <el-button @click="dialogVisibleChat = false">关闭聊天</el-button>
     <el-button type="primary" @click="send()">发送信息</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      dialogVisibleChat: false,
      toUserId: '',
      toName: '',
      message: '',
      ChatMsg: [],
      limit: 3
    }
  },
  mounted () {
    this.initData()
    this.$one.$on('refresh', (message) => {
      console.log(message)
      if (message.targetId === this.toUserId) {
        // this.getChatMsg()
        this.ChatMsg.push({
          'fromUserId': message.senderUserId,
          'fromUserName': message.content.extra,
          'msgTime': { date: new Date().getDate(),
            day: new Date(message.receivedTime).getDay(),
            month: new Date(message.receivedTime).getMonth(),
            hours: new Date(message.receivedTime).getHours(),
            minutes: new Date(message.receivedTime).getMinutes(),
            seconds: new Date(message.receivedTime).getSeconds(),
            year: new Date(message.receivedTime).getYear()},
          'message': {
            content: message.content.content
          }
        })
      }
    })
    // console.log(document.getElementsByClassName('chatContent'))
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getFriendList', {'userId': this.$cookie.get('user')})
      .then((res) => {
        this.data = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    getChatMsg () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getLimitChatMsgOfNormal', {'userId1': this.toUserId, 'userId2': this.$cookie.get('user'), count: this.limit, start: 0})
      .then((res) => {
        console.log(res.data)
        this.ChatMsg = res.data
      })
    },
    open (account, name) {
      this.dialogVisibleChat = true
      this.toUserId = account
      this.toName = name
      this.limit = 3
      this.getChatMsg()
    },
    send () {
      if (this.message === '') {
        this.$message({
          type: 'info',
          message: '该条消息为空哦'
        })
      } else {
        this.$http.post(this.$domain.domain1 + 'electric-design/private_publish', {
          'fromUserId': this.$cookie.get('user'),
          'fromUserName': this.$cookie.get('name'),
          'toUserId': this.toUserId,
          'toName': this.toName,
          'objectName': 'RC:TxtMsg',
          'message': {content: this.message, extra: this.$cookie.get('name')}
        })
      .then((res) => {
        if (res.data.code === 200) {
          this.ChatMsg.push({
            'fromUserId': this.$cookie.get('user'),
            'fromUserName': this.$cookie.get('name'),
            'msgTime': { date: new Date().getDate(),
              day: new Date().getDay(),
              month: new Date().getMonth(),
              hours: new Date().getHours(),
              minutes: new Date().getMinutes(),
              seconds: new Date().getSeconds(),
              year: new Date().getYear()},
            'message': {
              content: this.message
            }
          })
          // console.log($('.chatContent')[0].scrollHeight)
          this.$nextTick(() => {
            // $('.chatContent').scrollTop(100000)
            $('.chatContent').animate({
              scrollTop: $('.chatContent')[0].scrollHeight
            }, 1000)
          })
          this.message = ''
        }
      })
      }
    },
    myDelete (account, name) {
      this.$confirm('此操作将永久删除该好友, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.$domain.domain1 + 'electric-design/delFriend', {'fromUserId': this.$cookie.get('user'), 'toUserId': account})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `成功删除好友${name}`
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `成功好友${name}失败,原因:${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
.chatContent{
  max-height: 20rem;
  overflow:scroll;
  overflow-x: hidden;
  padding:0 2rem;
}
.divFromOrTo{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /* margin-top: 2rem; */
}
.divFrom{

  flex-direction: row-reverse;
}
.divTo{

}
</style>
