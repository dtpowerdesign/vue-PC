<template>
  <div class="content">
   <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/project')" >表头编辑</el-button>
   <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width:100%">
        <el-table-column v-for="(i, j) in json" :key="j" :prop="j" :label="i.title"  show-overflow-tooltip :fixed="j==='name'?'left':false"></el-table-column>
        <el-table-column   label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row.code, scope.row.sourceAccount)" type="primary" size="mini">投标</el-button>
            <el-button @click="skip({'account':scope.row.srcUserAccount, 'name':scope.row.sourceName})" type="primary" size="mini">聊天</el-button>  
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
     <el-table :data="details.processRequirements">
       <el-table-column prop="state" label="设计阶段"></el-table-column>
       <el-table-column prop="startTime" label="开始时间"></el-table-column>
       <el-table-column prop="endTime" label="结束时间"></el-table-column>
       <el-table-column prop="requireResult" label="成果要求"></el-table-column>
     </el-table>
     <div> 
       <el-radio v-model="bidType" label="personal" v-if="$cookie.get('role')==='puser'">个人投标</el-radio>
       <el-radio v-model="bidType" label="personal" v-if="$cookie.get('role')==='cuser'">企业投标</el-radio>
       <el-radio v-model="bidType" label="unit" v-if="details.isAcceptJointBid==='true'">联合投标</el-radio>
     </div>     
     <!-- <el-input type="textarea" :autosize="{ minRows: 4}" placeholder="请输入您的投标描述" v-model="bidInstruction"></el-input> -->
     <el-input placeholder="请填写您的投标报价" v-model="bidInstruction.price"></el-input>
     <el-input placeholder="请填写您的工期" v-model="bidInstruction.time"></el-input>
     <el-input placeholder="请填写您的业绩" v-model="bidInstruction.performance"></el-input>
     <el-input placeholder="请填写您的资质" v-model="bidInstruction.aptitude"></el-input>
     <!-- <el-upload multiple class="upload-demo" ref="upload" id="upload" 
     :data="{'belongToProjectCode': details.code, 'belongToProjectName': details.name, 'sourceUserId': $cookie.get('user'), 'sourceUserName': $cookie.get('name'), 'sourceUserType': $cookie.get('role'), 'bidfjxx': getBidInstruction(), 'bidType': getBidType()}" name="data"   
     :action='this.$domain.domain1+"electric-design/bidAndUpLoad"'
      :file-list="fileList"
     :before-upload="beforeUpload" :on-progress="progress" :on-remove="remove" :on-change="change" :on-success="success" :on-error="failure" :on-exceed="handleExceed"  
     :limit="this.limit"
     :auto-upload="false"> -->
       <!-- <el-button slot="trigger" size="small" type="primary" :disabled="uploadDis">上传文件</el-button>
       <div slot="tip" class="el-upload__tip">点击投标时可以上传已有业绩证明文件，不超过{{limit}}个</div>    
       <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">投标</el-button>  -->
      <form :action='this.$domain.domain1+"electric-design/bidAndUpLoad"' enctype="multipart/form-data" target="" method="post" >
            <input type="file" multiple="multiple" name="data" @change="getFile($event)" id="up" style="height:0px; overflow:hidden; position:absolute;" />
      <el-button  onclick="document.getElementById('up').click();" type="primary">选择文件</el-button>
      <el-button @click="x($event)" type="primary">投标</el-button>
      </form>
     <!-- </el-upload>      -->
     <!-- <input type="hidden" :value="details.code" name="belongToProjectCode"/>
     <input type="hidden" :value="details.name" name="belongToProjectName"/>
     <input type="hidden" :value="$cookie.get('user')" name="sourceUserId"/>
     <input type="hidden" :value="$cookie.get('name')" name="sourceUserName"/>
     <input type="hidden" :value="$cookie.get('role')" name="sourceUserType"/>
     <input type="hidden" :value="getBidInstruction()" name="bidfjxx"/>
     <input type="hidden" :value="getBidType()" name="bidType"/> -->
     <!-- <input type="submit"/> -->
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
      bidInstruction: {},
      bidType: 'personal',
      limit: 5,
      fileList: [],
      uploadDis: false,
      file: []
    }
  },
  computed: {
    ...mapState(['data', 'table', 'json'])},
  methods: {
    x (event) {
      event.preventDefault()
      console.log(this.file)
      let formData = new FormData()
      formData.append('belongToProjectCode', this.details.code)
      formData.append('belongToProjectName', this.details.name)
      formData.append('sourceUserId', this.$cookie.get('user'))
      formData.append('sourceUserName', this.$cookie.get('name'))
      formData.append('sourceUserType', this.$cookie.get('role'))
      formData.append('bidfjxx', this.getBidInstruction())
      formData.append('bidType', this.getBidType())
      for (var i of this.file) {
        formData.append('data', i)
      }
      // this.file.forEach((el, index) => {
      //   formData.append('data', el)
      // })
      // if (this.file.length !== 0) {
      // }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$http.post(this.$domain.domain1 + 'electric-design/bidAndUpLoad', formData, config).then((res) => {
        console.log(res)
        if (res.status === 200) {
          if (this.bidType === 'unit') {
        // this.allyBid(this.details.code, this.details.state, this.details.name)
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
            if (this.$cookie.get('role') === 'puser') {
          // this.perBid(this.details.code, this.details.state, this.details.name)
              this.fileList = []
              this.uploadDis = false
              this.$router.push('/per/PM-sumary/2B')
            } else {
          // this.comBid(this.details.code, this.details.state, this.details.name)
              this.fileList = []
              this.uploadDis = false
              this.$router.push('/per/PM-sumary/2B')
            }
          }
        } else {
          this.$message({
            type: 'warning',
            message: '失败'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getFile (event) {
      this.file = event.target.files
      console.log(this.file)
    },
    submitUpload () {
      this.$refs.upload.submit()
      if (this.bidType === 'unit') {
        // this.allyBid(this.details.code, this.details.state, this.details.name)
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
        if (this.$cookie.get('role') === 'puser') {
          // this.perBid(this.details.code, this.details.state, this.details.name)
          this.fileList = []
          this.uploadDis = false
          this.$router.push('/per/PM-sumary/2B')
        } else {
          // this.comBid(this.details.code, this.details.state, this.details.name)
          this.fileList = []
          this.uploadDis = false
          this.$router.push('/per/PM-sumary/2B')
        }
      }
    },
    handleClose () {
      this.fileList = []; this.dialogVisible = false
      this.uploadDis = false
    },
    getBidInstruction () {
      // var json = {
      //   'price': this.bidInstruction.price,
      //   'time': this.bidInstruction.time,
      //   'performance': this.bidInstruction.performance,
      //   'aptitude': this.bidInstruction.aptitude
      // }
      return JSON.stringify(this.bidInstruction)
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
        this.$set(this.details, 'processRequirements', res.data.processRequirements)
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
      return true
      // console.log('before')
      // console.log(file)
    },
    success (response, file, fileList) {
      console.log(response)
      if (response.result) {
        // this.$message({
        //   type: 'success',
        //   message: `投标成功`
        // })

      } else {
        this.$message({
          type: 'warning',
          message: `投标失败原因${response.reason}`
        })
      }
      // this.uploadDis = true
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
.fileButton{
    color: #fff!important;
    background-color: #409EFF!important;
    border-color: #409EFF;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
</style>
