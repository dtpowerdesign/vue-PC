<template>
  <div class="apply">
      <el-tabs>
          <el-tab-pane label="我收到的申请">
        <el-table :data="List1" stripe>
        <el-table-column label="发送请求">
          <template slot-scope="scope">
            <div v-if="scope.row.applyType === 'normal'"><span style="color:#409EFF">请求加我为好友</span></div>
            <div v-if="scope.row.applyType === 'group'"><span style="color:#409EFF">请求加入群:</span>{{scope.row.toName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="fromUserId" label="来源账号"></el-table-column>
        <el-table-column prop="fromUserName" label="来源姓名"></el-table-column>
        <el-table-column prop="extraMsg" label="附加消息"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
          <div v-if="scope.row.ApplyState==='waiting'">
            <div v-if="scope.row.applyType === 'normal'">
              <el-button type="success" @click="agree(scope.row)">同意</el-button>
              <el-button type="danger" @click="refuse(scope.row)">拒绝</el-button>
              <el-button type="danger" @click="ignore(scope.row)">忽略</el-button>
            </div>
            <div v-if="scope.row.applyType === 'group'">
              <el-button type="success" @click="agreeGroup(scope.row)">同意</el-button>
              <el-button type="danger" @click="refuseGroup(scope.row)">拒绝</el-button>
              <el-button type="danger" @click="ignoreGroup(scope.row)">忽略</el-button>              
            </div>            
          </div>
          <div v-if="scope.row.ApplyState==='agreed'"><el-button disabled="" type="primary">已同意</el-button></div>
          <div v-if="scope.row.ApplyState==='refused'"><el-button disabled="" type="danger">已拒绝</el-button></div>
          <div v-if="scope.row.ApplyState==='ignored'"><el-button disabled="" type="info">已忽略</el-button></div>
          </template>
        </el-table-column>
     </el-table>                  
          </el-tab-pane>
          <el-tab-pane label="我发送的申请">
     <el-table :data="List2" stripe>
        <el-table-column prop="toUserId" label="申请好友的账号"></el-table-column>
        <el-table-column prop="toName" label="申请好友的姓名"></el-table-column>
        <el-table-column prop="extraMsg" label="附加消息"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
          <div v-if="scope.row.ApplyState==='waiting'"><el-button disabled="" type="info">等待同意中</el-button></div>
          <div v-if="scope.row.ApplyState==='ignored'"><el-button disabled="" type="info">等待同意中</el-button></div>
          <div v-if="scope.row.ApplyState==='agreed'"><el-button disabled="" type="primary">已同意</el-button></div>
          <div v-if="scope.row.ApplyState==='refused'"><el-button disabled="" type="danger">已拒绝</el-button></div>
          </template>
        </el-table-column>
     </el-table>    
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      List1: [],
      List2: []
    }
  },
  mounted () {
    this.initData()
    this.$one.$on('refreshApply', (message) => {
      this.initData()
    })
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getfriendApplyList', {'userId': this.$cookie.get('user')})
      .then((res) => {
        // console.log(res.data)
        this.List1 = []
        this.List2 = []
        res.data.forEach((el, index) => {
          if (el.fromUserId !== this.$cookie.get('user')) {
            this.List1.push(el)
          } else {
            this.List2.push(el)
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    agree (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/agreeFriend', {
        'code': row.code,
        'fromUserId': row.fromUserId,
        'fromUserName': row.fromUserName,
        'toUserId': this.$cookie.get('user'),
        'toName': this.$cookie.get('name')
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `已经接收${row.fromUserName}申请`
          })
          this.initData()
        } else {
          this.$message({
            type: 'success',
            message: `接收${row.fromUserName}申请失败,原因:${res.data.reason}`
          })
        }
      })
    },
    agreeGroup (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/join', {
        'userIds': [row.fromUserId],
        'groupId': row.toGroupId,
        'groupName': row.toName
      })
      .then((res) => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: `已经接收${row.fromUserName}申请`
          })
          this.initData()
        } else {
          this.$message({
            type: 'success',
            message: `接收${row.fromUserName}申请失败,原因:${res.data.reason}`
          })
        }
      })
    },
    refuse (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/refuseOrIgnoreFriend', {
        'code': row.code,
        'fromUserId': row.fromUserId,
        'fromUserName': row.fromUserName,
        'toUserId': this.$cookie.get('user'),
        'toName': this.$cookie.get('name'),
        'operator': 'refused'
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `已经拒绝${row.fromUserName}申请`
          })
          this.initData()
        } else {
          this.$message({
            type: 'success',
            message: `拒绝${row.fromUserName}申请失败,原因:${res.data.reason}`
          })
        }
      })
    },
    refuseGroup (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/refuseOrIgnoreFriend', {
        'code': row.code,
        'fromUserId': row.fromUserId,
        'fromUserName': row.fromUserName,
        'operator': 'refused'
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `已经拒绝${row.fromUserName}申请`
          })
          this.initData()
        } else {
          this.$message({
            type: 'success',
            message: `拒绝${row.fromUserName}申请失败,原因:${res.data.reason}`
          })
        }
      })
    },
    ignore (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/refuseOrIgnoreFriend', {
        'code': row.code,
        'fromUserId': row.fromUserId,
        'fromUserName': row.fromUserName,
        'toUserId': this.$cookie.get('user'),
        'toName': this.$cookie.get('name'),
        'operator': 'ignored'
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `已经忽略${row.fromUserName}申请`
          })
          this.initData()
        } else {
          this.$message({
            type: 'success',
            message: `忽略${row.fromUserName}申请失败,原因:${res.data.reason}`
          })
        }
      })
    },
    ignoreGroup (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/refuseOrIgnoreFriend', {
        'code': row.code,
        'fromUserId': row.fromUserId,
        'fromUserName': row.fromUserName,
        'operator': 'ignored'
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `已经忽略${row.fromUserName}申请`
          })
          this.initData()
        } else {
          this.$message({
            type: 'success',
            message: `忽略${row.fromUserName}申请失败,原因:${res.data.reason}`
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.apply{
    width: 90%;
    margin: auto;
    padding: 1rem;
    background-color: white;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
