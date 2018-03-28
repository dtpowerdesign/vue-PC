<template>
  <div class="content">
   <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/project')" >表头编辑</el-button>
   <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width:100%">
        <el-table-column v-for="(i, j) in json" :key="j" :prop="j" :label="i.title" :fixed="j==='name'?'left':false"></el-table-column>
        <el-table-column   label="操作" fixed="right" width="85">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row.code, scope.row.sourceAccount)" type="primary" size="small">我要投标</el-button>
          </template>
        </el-table-column>
   </el-table>
   <el-dialog title="确定要投标?" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
     <div style="text-align:left;border-top:1px solid gray;padding:1rem" v-loading="details.loadingProject">
     <p style="color:#4d83e7;font-size:1.5rem">项目信息</p>
     <p>项目名称:{{details.name}}</p>
     <p>状态:{{details.state}}</p>
     <p>类别:{{details.type}}</p>
     <p>类型:{{details.category}}</p>
     <p>涉及专业:{{details.major}}</p>
     <p>是否接受联合投标:{{details.isAcceptJointBid==='true'?'是':'否'}}</p>
     </div>
     <div> 
       <el-radio v-model="bidType" label="personal" v-if="$cookie.get('role')==='puser'">个人投标</el-radio>
       <el-radio v-model="bidType" label="personal" v-if="$cookie.get('role')==='cuser'">企业投标</el-radio>
       <el-radio v-model="bidType" label="unit" v-if="details.isAcceptJointBid==='true'">联合投标</el-radio>
     </div>     
     <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入您的投标描述" v-model="bidInstruction"></el-input>
     <el-upload multiple class="upload-demo" ref="upload" id="upload" :data="{'belongToProjectCode': details.code, 'belongToProjectName': details.name, 'srcUserAccount': $cookie.get('user'), 'srcUserName': $cookie.get('name'), 'srcUserType': $cookie.get('role'), 'bidInstruction': getBidInstruction(), 'bidType': getBidType()}" name="data"   
     :action='this.$domain.domain1+"electric-design/bidAndUpLoad"'
      :file-list="fileList"
     :before-upload="beforeUpload" :on-progress="progress" :on-remove="remove" :on-change="change" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  
     :limit="this.limit">
       <el-button slot="trigger" size="small" type="primary" :disabled="uploadDis">投标</el-button>
       <div slot="tip" class="el-upload__tip">点击投标时可以上传附件，不超过{{limit}}个</div>     
     </el-upload>     
   </el-dialog>
   <div style="clear:both;"></div>
   <el-pagination  class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9, 18]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="table.length">
   </el-pagination>
  </div>
</template>

<script>
import store from '@/vuex/archive.js'
import { mapState } from 'vuex'
export default {
  store,
  data () {
    return {
      dialogVisible: false,
      currentPage: 1,
      pagesize: 3,
      details: {'loadingPeople': true, 'loadingProject': true},
      bidInstruction: '',
      bidType: 'personal',
      limit: 5,
      fileList: [],
      uploadDis: false
    }
  },
  computed: {
    ...mapState(['data', 'table', 'json'])},
  methods: {
    handleClose () {
      this.fileList = []; this.dialogVisible = false
      this.uploadDis = false
    },
    getBidInstruction () {
      return this.bidInstruction
    },
    getBidType () {
      return this.bidType
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    detail (code, sourceAccount) {
      this.dialogVisible = true
      this.$set(this.details, 'code', code)
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': code})
      .then((res) => {
        console.log(res.data)
        this.$set(this.details, 'personalBidAccounts', (Array.isArray(res.data.personalBidAccounts) ? res.data.personalBidAccounts : []))
        this.details.personalBidAccounts.splice(0, 0, this.$cookie.get('user'))
        this.$set(this.details, 'companyBidAccounts', Array.isArray(res.data.companyBidAccounts) ? res.data.companyBidAccounts : [])
        this.details.companyBidAccounts.splice(0, 0, this.$cookie.get('user'))
        this.$set(this.details, 'name', res.data.name)
        this.$set(this.details, 'state', res.data.state)
        this.$set(this.details, 'isAcceptJointBid', res.data.isAcceptJointBid)
        this.$set(this.details, 'type', res.data.type.join(','))
        this.$set(this.details, 'category', res.data.category)
        this.$set(this.details, 'major', res.data.major.join(','))
        this.$set(this.details, 'loadingProject', false)
      }).catch((err) => {
        console.log(err)
      })
      this.$http.post(this.$domain.domain1 + 'electric-design/searchAllUsersByKeyAndValue', {'value': sourceAccount, 'key': 'account'})
      .then((res) => {
        console.log(res.data[0])
        this.$set(this.details, 'role', res.data[0].role)
        this.$set(this.details, 'sourceName', res.data[0].name)
        this.$set(this.details, 'email', res.data[0].email)
        this.$set(this.details, 'account', res.data[0].account)
        this.$set(this.details, 'loadingPeople', false)
      }).catch((err) => {
        console.log(err)
      })
    },
    perBid (code, state, name) {
      this.dialogVisible = false
      if (state !== '投标中') {
        this.$message({
          type: 'warning',
          message: `只有投标中的项目才可以投标哦,该项目的状态为${state}`
        })
      } else {
        this.$http.post(this.$domain.domain1 + 'electric-design/personalBid', {'belongToProjectCode': code, 'belongToProjectName': name, 'sourceUserId': this.$cookie.get('user'), 'sourceUserName': this.$cookie.get('name'), 'sourceUserType': 'puser', 'bidType': 'personal'})
      .then((res) => {
        console.log(res.data)
        if (res.data.result === true) {
          this.$message({
            type: 'success',
            message: `个人投标成功,请在项目汇总里查看`
          })
          // this.bidType = 'personal'
          // this.$refs.upload.submit()
          // // $('#upload').submit()
          this.fileList = []
          this.uploadDis = false
          this.$router.push('/per/PM-sumary/2B')
        } else {
          this.$message({
            type: 'warning',
            message: '您已经对此项目投标了'
          })
          this.uploadDis = false
        }
      }).catch((err) => {
        this.$message({
          type: 'warning',
          message: '您已经对此项目投标了'
        })
        this.uploadDis = false
        console.log(err)
      })
      }
    },
    comBid (code, state, name) {
      this.dialogVisible = false
      if (state !== '投标中') {
        this.$message({
          type: 'warning',
          message: `只有投标中的项目才可以投标哦,该项目的状态为${state}`
        })
      } else {
        this.$http.post(this.$domain.domain1 + 'electric-design/personalBid', {'belongToProjectCode': code, 'belongToProjectName': name, 'sourceUserId': this.$cookie.get('user'), 'sourceUserName': this.$cookie.get('name'), 'sourceUserType': 'cuser', 'bidType': 'personal'})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `企业投标成功,请在项目汇总里查看`
          })
          // this.bidType = 'personal'
          // this.$refs.upload.submit()
          this.fileList = []
          this.uploadDis = false
          this.$router.push('/com/CM-sumary/2B')
        } else {
          this.$message({
            type: 'warning',
            message: '您已经对此项目投标了'
          })
          this.uploadDis = false
        }
      }).catch((err) => {
        this.$message({
          type: 'warning',
          message: '您已经对此项目投标了'
        })
        this.uploadDis = false
        console.log(err)
      })
      }
    },
    allyBid (code, state, name) {
      this.dialogVisible = false
      if (state !== '投标中') {
        this.$message({
          type: 'warning',
          message: `只有投标中的项目才可以投标哦,该项目的状态为${state}`
        })
      } else {
        this.$http.post(this.$domain.domain1 + 'electric-design/unionBid', {'belongToProjectCode': code, 'belongToProjectName': name, 'sourceUserId': this.$cookie.get('user'), 'sourceUserName': this.$cookie.get('name'), 'sourceUserType': this.$cookie.get('role'), 'bidType': 'unit'})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `联合体投标成功,请在联合体里查看`
          })
          // this.bidType = 'unit'
          // this.$refs.upload.submit()
          this.fileList = []
          this.uploadDis = false
          if (this.$cookie.get('role') === 'puser') {
            this.$router.push('/per/PM-combo/2')
            this.$nextTick(function () {
              this.$one.$emit('test', this.details.code)
            })
          }
          if (this.$cookie.get('role') === 'cuser') {
            this.$router.push('/com/CM-combo/2')
            this.$nextTick(function () {
              this.$one.$emit('test', this.details.code)
            })
          }
        } else {
          this.$message({
            type: 'warning',
            message: '您已经对此项目投标了'
          })
          this.uploadDis = false
        }
      }).catch((err) => {
        this.$message({
          type: 'warning',
          message: '您已经对此项目投标了'
        })
        this.uploadDis = false
        console.log(err)
      })
      }
    },
    beforeUpload (file) {
      console.log('before')
      console.log(file)
    },
    success (response, file, fileList) {
      console.log(response)
      if (response.result) {
        // this.$message({
        //   type: 'success',
        //   message: `投标成功`
        // })
        if (this.bidType === 'unit') {
          this.allyBid(this.details.code, this.details.state, this.details.name)
        } else {
          if (this.$cookie.get('role') === 'puser') {
            this.perBid(this.details.code, this.details.state, this.details.name)
          } else { this.comBid(this.details.code, this.details.state, this.details.name) }
        }
      } else {
        this.$message({
          type: 'warning',
          message: `投标失败原因${response.reason}`
        })
      }
      this.uploadDis = true
      // this.complete = response.data
    },
    failure (err, file, fileList) {
      this.$message.warning(`${file.name}上传失败`)
      console.log(err)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    progress (event, file, fileList) {
      // console.log('progress')
      // console.log(event)
      // console.log(file)
      // console.log(fileList)
      this.fileList = fileList
    },
    change (file, fileList) {
      // console.log(fileList)
      this.fileList = fileList
    },
    remove (file, fileList) {
      console.log(fileList)
      this.fileList = fileList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
 
}
ul{
    list-style-type:none;
    margin-left:auto;
    margin-right:auto;
}
.content-style{
    width:30%;
    float:left;
    margin:1rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.content-style:hover{
    -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.content-style>img{
    width:100%;
}
.content-style>.detail1{
    text-align:left;
    font-size:1.5rem;
}
.content-style>.detail2{
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:#909399;
}
.paging{
    margin:1rem auto 1rem auto;
    width:100%;
    /* -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset; */
}
</style>
