<template>
  <div>
   <el-table :data="getData" border row-click="open" stripe>
       <el-table-column prop="otherName" label="姓名/群名称" min-width="20%"></el-table-column>
       <el-table-column prop="otherUserId" label="账号/群账号" min-width="10%"></el-table-column>
       <el-table-column label="时间" min-width="15%">
           <template slot-scope="scope">
               <p>{{scope.row.msgTime.year+1900}}/{{scope.row.msgTime.month+1}}/{{scope.row.msgTime.date}}/{{scope.row.msgTime.hours}}:{{scope.row.msgTime.minutes}}:{{scope.row.msgTime.seconds}}</p>
           </template>
       </el-table-column>
       <el-table-column label="内容" min-width="35%">
         <template slot-scope="scope">
             <div style="display:flex;justify-content:flex-end;flex-wrap:wrap">
             <p style="color:#409EFF" v-if="scope.row.fromUserId === $cookie.get('user')">我:{{scope.row.message.content}}</p>
             <p style="color:#409EFF" v-if="!(scope.row.fromUserId === $cookie.get('user'))">{{scope.row.fromUserName}}:{{scope.row.message.content}}</p>
             </div>
         </template>
       </el-table-column>
       <el-table-column label="操作" min-width="20%">
           <template slot-scope="scope">
               <el-button type="primary" @click="open(scope.row)" v-if="scope.row.msgToType === 'normal'">与他聊天</el-button>
               <el-button type="primary" @click="open(scope.row)" v-if="scope.row.msgToType === 'group'">群聊天</el-button>
               <el-button type="info" @click="chatDelete(scope.row)">删除</el-button>
           </template>
       </el-table-column>
   </el-table>
   <!-- 群聊天弹窗开始 -->
   <el-dialog :title="toName" :visible.sync="dialogVisibleChatGroup" width="60%">
     <span @click="limit+=10;getChatMsg()" style="color:#409EFF">显示更多</span>
     <div class="chatContent">
       <div v-for="(i, j) in ChatMsg" :key="j" style="margin-top: 2rem;">
         <div style="color:#409EFF">
           <div v-if="i.fromUserId===$cookie.get('user')" style="text-align:right">{{i.msgTime.year+1900}}/{{i.msgTime.month+1}}/{{i.msgTime.date}}/{{i.msgTime.hours}}:{{i.msgTime.minutes}}:{{i.msgTime.seconds}}</div>
           <div v-if="!(i.fromUserId===$cookie.get('user'))" style="text-align:left">{{i.msgTime.year+1900}}/{{i.msgTime.month+1}}/{{i.msgTime.date}}/{{i.msgTime.hours}}:{{i.msgTime.minutes}}:{{i.msgTime.seconds}}</div>
         </div>
         <div :class="[i.fromUserId===$cookie.get('user')?'divFrom':'divTo','divFromOrTo']">
           <div>{{i.fromUserName}}</div><div>:</div><p style="space-white:pre-wrap;max-width:60%;text-align:left;">{{i.message.content}}</p>
         </div>
       </div>
     </div>
     <el-input v-model="message" @keyup.enter.native="sendGroup()" autofocus></el-input>
     <span slot="footer" class="dialog-footer">
     <el-button @click="dialogVisibleChatGroup = false">关闭群聊天</el-button>
     <el-button type="primary" @click="sendGroup()">发送信息</el-button>
  </span>
   </el-dialog>   
   <!-- 群聊天弹窗结束 -->
   <!-- 个人聊天弹窗开始 -->
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
<!-- 个人聊天弹窗结束 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      dialogVisibleChatGroup: false,
      dialogVisibleChat: false,
      toUserId: '',
      toName: '',
      message: '',
      ChatMsg: [],
      limit: 3
    }
  },
  computed: {
    getData () {
      return this.data.reverse()
    }
  },
  mounted () {
    this.$one.$on('skipChat', (row) => {
      this.dialogVisibleChat = true
      this.dialogVisibleChatGroup = false
      this.toUserId = row.account
      this.toName = row.name
      this.limit = 3
      this.getChatMsg()
    })
    this.initData()
    this.$one.$on('refresh', (message) => {
      console.log(message)
      if (message.targetId === this.toUserId) {
        this.ChatMsg.push({
          'fromUserId': message.senderUserId,
          'fromUserName': message.content.extra.name,
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
        this.$nextTick(() => {
            // $('.chatContent').scrollTop(100000)
          if ($('.chatContent')) {
            $('.chatContent').animate({
              scrollTop: $('.chatContent')[0].scrollHeight
            }, 1000)
          }
        })
      }
      if (JSON.parse(message.content.extra).type === 'normal') {
        this.data = this.data.filter((i) => i.otherUserId !== message.targetId)
        this.data.push({
          'otherName': JSON.parse(message.content.extra).otherName,
          'otherUserId': message.targetId,
          'fromUserId': message.senderUserId,
          'fromUserName': JSON.parse(message.content.extra).name,
          'msgTime': { date: new Date().getDate(),
            day: new Date().getDay(),
            month: new Date().getMonth(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
            year: new Date().getYear()},
          'message': {
            content: message.content.content
          },
          'msgToType': 'normal'
        })
      }
      if (JSON.parse(message.content.extra).type === 'group') {
        this.data = this.data.filter((i) => i.otherUserId !== message.targetId)
        this.data.push({
          'otherName': JSON.parse(message.content.extra).otherName,
          'otherUserId': message.targetId,
          'fromUserId': message.senderUserId,
          'fromUserName': JSON.parse(message.content.extra).name,
          'msgTime': { date: new Date().getDate(),
            day: new Date().getDay(),
            month: new Date().getMonth(),
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds(),
            year: new Date().getYear()},
          'message': {
            content: message.content.content
          },
          'msgToType': 'group'
        })
      }
    })
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/sync', {userId: this.$cookie.get('user')})
      .then((res) => {
        if (res.data.code === 200) {
          // this.$message({
          //   type: 'success',
          //   message: '群消息同步成功'
          // })
        } else {
          this.$message({
            type: 'warning',
            message: '群消息同步失败'
          })
        }
      }).catch((err) => { console.log(err) })
      this.$http.post(this.$domain.domain1 + 'electric-design/getCurrentLinkMan', {'userId': this.$cookie.get('user')})
        .then((res) => {
          console.log(res.data)
          this.data = res.data
        }).catch((err) => {
          console.log(err)
        })
    },
    open (row) {
      if (row.msgToType === 'group') {
        this.dialogVisibleChat = false
        this.dialogVisibleChatGroup = true
        this.toUserId = row.otherUserId
        this.toName = row.otherName
        this.limit = 3
        this.getChatMsgGroup()
      } else {
        this.dialogVisibleChat = true
        this.dialogVisibleChatGroup = false
        this.toUserId = row.otherUserId
        this.toName = row.otherName
        this.limit = 3
        this.getChatMsg()
      }
    },
    getChatMsg () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getLimitChatMsgOfNormal', {'userId1': this.toUserId, 'userId2': this.$cookie.get('user'), count: this.limit, start: 0})
      .then((res) => {
        console.log(res.data)
        this.ChatMsg = res.data
      })
    },
    getChatMsgGroup () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getChatMsgOfGroup', {'groupId': this.toUserId, count: this.limit, start: 0})
      .then((res) => {
        console.log(res.data)
        this.ChatMsg = res.data
      })
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
          'message': {content: this.message, extra: {'name': this.$cookie.get('name'), 'type': 'normal', 'otherName': this.$cookie.get('name')}}
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
          this.data = this.data.filter((i) => i.otherUserId !== this.toUserId)
          this.data.push({
            'otherName': this.toName,
            'otherUserId': this.toUserId,
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
            },
            'msgToType': 'normal',
            'belongToUser': this.$cookie.get('user')
          })
          this.$nextTick(() => {
            $('.chatContent').animate({
              scrollTop: $('.chatContent')[0].scrollHeight
            }, 1000)
          })
          this.message = ''
        } else {
          this.$message({
            type: 'warning',
            message: `发送失败${res.data.code}`
          })
        }
      })
      }
    },
    sendGroup () {
      if (this.message === '') {
        this.$message({
          type: 'info',
          message: '该条消息为空哦'
        })
      } else {
        this.$http.post(this.$domain.domain1 + 'electric-design/group_publish', {
          'fromUserId': this.$cookie.get('user'),
          'fromUserName': this.$cookie.get('name'),
          'toGroupId': this.toUserId,
          'toName': this.toName,
          'objectName': 'RC:TxtMsg',
          'message': {content: this.message, extra: {'name': this.$cookie.get('name'), 'type': 'group', 'otherName': this.toName}}
        })
      .then((res) => {
        // console.log(res.data)
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
          this.data = this.data.filter((i) => i.otherUserId !== this.toUserId)
          this.data.push({
            'otherName': this.toName,
            'otherUserId': this.toUserId,
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
            },
            'msgToType': 'group',
            'belongToUser': this.$cookie.get('user')
          })
          this.$nextTick(() => {
            $('.chatContent').animate({
              scrollTop: $('.chatContent')[0].scrollHeight
            }, 1000)
          })
          this.message = ''
        } else {
          this.$message({
            type: 'warning',
            message: `发送失败${res.data.code}`
          })
        }
      })
      }
    },
    chatDelete (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/delTableRecod', {
        'table': 'currentChat',
        'keyNames': ['belongToUser', 'otherUserId'],
        'keyValues': [this.$cookie.get('user'), row.otherUserId]
      }).then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '聊天记录删除成功'
          })
          this.data = this.data.filter((i) => i.otherUserId !== this.toUserId)
        } else {
          this.$message({
            type: 'warning',
            message: `失败原因:${res.data.reason}`
          })
          console.log(res.data)
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
.friendListDivDiv{
        margin: 1rem 2rem;
    display: flex;
    justify-content: space-between;
}
.chatContent{
  max-height: 30rem;
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



.groupListDivDiv{
    margin: 1rem 2rem;
    display: flex;
    justify-content: space-between;
}
.chatContent{
  max-height: 30rem;
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
</style>
