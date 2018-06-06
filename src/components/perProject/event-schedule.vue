<template>
  <div>
   <el-table :data="table" style="width:100%">
       <el-table-column label="请求者账号" prop="sourceUserAccount"></el-table-column>
       <el-table-column label="请求者名称" prop="sourceUserName"></el-table-column>
       <el-table-column label="被请求者账号">
         <template slot-scope="scope">
           <el-select v-model="scope.row.toUsersAccounts" multiple>
             <el-option v-for="(i, j) in toAccounts" :key="j" :value="i" :label="i"></el-option>
           </el-select>
         </template>
       </el-table-column>
       <el-table-column label="请求名称">
         <template slot-scope="scope">
           <el-input v-model="scope.row.name"></el-input>
         </template>
       </el-table-column>
       <el-table-column label="请求内容">
         <template slot-scope="scope">
           <el-input v-model="scope.row.body"></el-input>
         </template>
       </el-table-column>
       <el-table-column label="请求提出时间" prop="time">
         <!-- <template slot-scope="scope">
           <el-date-picker v-model="scope.row.time"></el-date-picker>
         </template>          -->
       </el-table-column>
       <el-table-column label="要求完成时间">
         <template slot-scope="scope">
           <el-date-picker v-model="scope.row.reqtime"></el-date-picker>
         </template>
       </el-table-column>
       <el-table-column label="状态" prop="eventstate">
         <template slot-scope="scope">
           <div v-if="scope.row.eventstate==='completed'">已经同意</div>
           <div v-if="scope.row.eventstate==='waitsure'">待同意</div>
           <div v-if="scope.row.eventstate==='rejected'">已经拒绝</div>
         </template>
       </el-table-column>
       <el-table-column label="实际完成时间" prop="realtime"></el-table-column>
       <el-table-column label="查看进度">
         <template slot-scope="scope">
           <el-button type="info" @click="progress(scope.row)">查看进度</el-button>
         </template>
       </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
         <div v-if="scope.row.sourceUserAccount===$cookie.get('user')">
           <el-button @click="change(scope.row)" v-if="scope.row.code" type="primary" size="small">修改</el-button>
           <el-button @click="confirm(scope.row)" v-if="!scope.row.code" type="success" size="small">提交</el-button>
         </div>
         <div v-else-if="scope.row.toUsersAccounts.in_array($cookie.get('user'))">
           <el-button @click="uploadVisible=true;dataCode=scope.row.code">上传文件</el-button>
         </div>
         <div v-else>
           <el-button v-if="scope.row.code&&!(scope.row.sourceUserAccount===$cookie.get('user'))" disabled>无权干涉</el-button>
         </div>
         </template>
       </el-table-column>
   </el-table>
   <el-button style="width:80%" type="primary" @click="add()">增加请求</el-button>
   <el-dialog width="30%" title="上传文件" :visible.sync="uploadVisible">
          <el-select v-model="fileType" placeholder="请选择分类">
            <el-option v-for="(i, j) in fileTypes" :key="j" :value="i" :label="i"></el-option>
          </el-select>
          <el-upload :action='$domain.domain1 + "electric-design/uploadRequestData"' name="project" multiple :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-preview="uploadPrev"
            :data="{
              'code': dataCode,
              'fileType': fileType,
              'sourceUserId': $cookie.get('user')
              }">
           <el-button size="small" type="primary" style="width:100%">点击上传</el-button>
         </el-upload>  
           <el-button size="small" type="warning" @click="uploadVisible=false">退出上传</el-button>
   </el-dialog>   
   <el-dialog title="事件日志" :visible.sync="dialogVisible" width="60%" > 
     <el-table :data="eventLog">
       <el-table-column label="来源者账号" prop="sourceUserId"></el-table-column>
       <el-table-column label="来源者姓名" prop="sourceUserName"></el-table-column>
       <el-table-column label="时间" prop="time"></el-table-column>
       <el-table-column label="提资收资">
         <template slot-scope="scope">
           <div v-if="eventProposer!==scope.row.sourceUserId">
           上传了
           <el-tooltip content="点击下载" placement="bottom" effect="light">
             <span v-for="(i, j) in scope.row.Datafiles" :key="j" style="color:#409EFF" @click="download(i.filePath, i.fileName)">
                {{i.fileName}}/{{i.fileType}}
             </span>
           </el-tooltip>
          </div>
          <div v-else>
            <div v-if="scope.row.logType==='rejected'">
               收资失败原因:{{scope.row.body}}
            </div>
            <div v-if="scope.row.logType==='completed'">
              收资成功
            </div>
          </div>
         </template>
       </el-table-column>     
     </el-table>
     <div v-if="eventProposer===$cookie.get('user')">
     <el-button type="primary" size="small" @click="agree()">成功收资</el-button>
     <el-button type="danger" size="small" @click="refuse()">拒绝收资</el-button> 
     </div>
      <el-dialog
      width="30%"
      title="拒绝原因"
      :visible.sync="innerVisible"
      append-to-body>
      <el-input v-model="refuseReason"></el-input>
      <el-button @click="confirmRefuse()" type="danger" style="width:100%">确定拒收</el-button>
      </el-dialog>
     <span slot="footer" class="dialog-footer">
     <el-button @click="dialogVisible = false" type="primary">退出</el-button>
     </span>
   </el-dialog>   
  </div>
</template>

<script>
import store from '@/vuex/perProject'
import {mapState} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['id'])
  },
  data () {
    return {
      table: [],
      toAccounts: [],
      dialogVisible: false,
      innerVisible: false,
      uploadVisible: false,
      eventLog: [],
      eventProposer: '',
      refuseReason: '',
      eventCode: '',
      dataCode: '',
      fileType: '其他',
      fileTypes: ['合同', '提资单', '合同洽商单', '会议机要', '工程评审单', '校审单', '工程联络单', '其他']
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getMultRecordByKeysAndValues', {
        'table': 'events',
        'keys': ['belongToProjectCode', 'eventType'],
        'values': [this.id, 'request']
      }).then((res) => {
        console.log(res.data)
        this.table = res.data
        this.table.forEach((el, index) => {
          this.table[index].time = [].concat((el.time.year + 1900), (el.time.month + 1), el.time.date).join('-')
          this.table[index].reqtime = [].concat((el.reqtime.year + 1900), (el.reqtime.month + 1), el.reqtime.date).join('/')
          if (el.realtime.year) {
            this.table[index].realtime = [].concat((el.realtime.year + 1900), (el.realtime.month + 1), el.realtime.date).join('/')
          }
        })
        // this.table.realtime = [].concat((res.date.realtime.year + 1900), (res.date.realtime.month + 1), res.date.realtime.date).join('/')
      }).catch((err) => {
        console.log(err)
      })
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': this.id})
      .then((res) => {
        console.log(res.data)
        this.toAccounts = Array.isArray(res.data.toAccounts) ? res.data.toAccounts : [res.data.toAccounts]
        this.toAccounts.push(res.data.sourceAccount)
      }).catch((err) => {
        console.log(err)
      })
    },
    progress (row) {
      this.dialogVisible = true
      this.eventProposer = row.sourceUserAccount
      this.eventCode = row.code
      this.$http.post(this.$domain.domain1 + 'electric-design/getMultRecordByKeysAndValues', {
        'table': 'eventlog',
        'keys': ['belongToEventCode'],
        'values': [row.code]
      })
      .then((res) => {
        console.log(res.data)
        this.eventLog = res.data
        this.eventLog.forEach((el, index) => {
          this.eventLog[index].time = [].concat((el.time.year + 1900), (el.time.month + 1), el.time.date).join('-')
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    agree () {
      this.$http.post(this.$domain.domain1 + 'electric-design/acceptProvide', {
        'optAccount': this.$cookie.get('user'),
        'code': this.eventCode
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.dialogVisible = false
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    refuse () {
      this.innerVisible = true
    },
    confirmRefuse () {
      this.$http.post(this.$domain.domain1 + 'electric-design/refusedProvide', {
        'code': this.eventCode,
        'optAccount': this.$cookie.get('user'),
        'oprate': 'rejected',
        'reason': this.refuseReason
      }).then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.dialogVisible = false
          this.innerVisible = false
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    add () {
      this.table.push({
        'sourceUserAccount': this.$cookie.get('user'),
        'sourceUserName': this.$cookie.get('name'),
        'toUsersAccounts': [],
        'name': '',
        'body': '',
        'time': this.$formDate.formatDate(new Date()),
        'reqtime': '',
        'realtime': ''
      })
    },
    confirm (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/addEvent ', {
        'name': row.name,
        'body': row.body,
        'sourceUserAccount': row.sourceUserAccount,
        'toUsersAccounts': row.toUsersAccounts,
        'belongToProjectCode': this.id,
        // 'time': this.$formDate.formatDate(row.time),
        'reqtime': this.$formDate.formatDate(row.reqtime),
        'eventType': 'request'
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: '操作失败'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    change (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/changeEventByCode', {
        'code': row.code,
        'data': {
          'name': row.name,
          'body': row.body,
          'sourceUserAccount': row.sourceUserAccount,
          'toUsersAccounts': row.toUsersAccounts,
          'belongToProjectCode': this.id,
        // 'time': this.$formDate.formatDate(row.time),
          'reqtime': this.$formDate.formatDate(row.reqtime),
          'eventType': 'request'
        }
      })
       .then((res) => {
         if (res.data.result) {
           this.$message({
             type: 'success',
             message: '操作成功'
           })
           this.initData()
         } else {
           this.$message({
             type: 'warning',
             message: '操作失败'
           })
         }
       }).catch((err) => {
         console.log(err)
       })
    },
    uploadSuccess (response, file, fileList) {
      if (response.result) {
        this.$message({
          type: 'success',
          message: `${file.name}上传成功`
        })
        this.initData()
      } else {
        this.$message({
          type: 'warning',
          message: `${file.name}上传失败,原因:${response.reason}`
        })
      }
      console.log(response)
    },
    uploadError (err, file, fileList) {
      this.$message({
        type: 'warning',
        message: `${file.name}上传失败`
      })
      console.log(err)
    },
    uploadPrev (file) {
      console.log(file.response)
    },
    download (path, name) {
      this.$http.post(this.$domain.domain1 + 'electric-design/dowload', {'fileUrl': path}, {'responseType': 'blob'})
      .then((res) => {
        let url = window.URL.createObjectURL(new Blob([res.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
