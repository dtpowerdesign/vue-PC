<template>
  <div class="content">
   <ul>
     <li v-for="(i, j) in data.slice((currentPage-1)*pagesize,currentPage*pagesize)" class="content-style" :key="j" @click="detail(i.code, i.sourceAccount)">
       <img :src="i.mainImgPath" alt="">
       <p class="detail1" style="margin-left:.3rem">{{i.name}}</p>
       <div class="detail2"><span style="margin-left:.3rem">{{i.company}}</span><span>{{i.endTime}}</span></div>
     </li>
   </ul>
   <el-dialog :title="details.name" :visible.sync="dialogVisible" width="30%">
     <div style="text-align:left;border-top:1px solid gray;padding:1rem" v-loading="details.loadingPeople">
     <p style="color:#4d83e7;font-size:1.5rem">发布人信息</p>
     <p>发布者账号:{{details.account}}</p>
     <p>发布者姓名:{{details.sourceName}}</p>
     <p>发布者邮箱:{{details.email}}</p>
     </div>
     <div style="text-align:left;border-top:1px solid gray;padding:1rem" v-loading="details.loadingProject">
     <p style="color:#4d83e7;font-size:1.5rem">项目信息</p>
     <p>状态:{{details.state}}</p>
     <p>类别:{{details.type}}</p>
     <p>类型:{{details.category}}</p>
     <p>涉及专业:{{details.major}}</p>
     <p>是否接受联合投标:{{details.isAcceptJointBid==='true'?'是':'否'}}</p>
     <p v-if="details.isAcceptJointBid==='true'">是否已经被联合投标:{{!(details.isJointState==='true')?'是':'否'}}</p>
     </div>
     <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="dialogVisible=false">我不感兴趣</el-button>
      <el-button type="success" @click="allyBid(details.code, details.state)" v-if="details.isAcceptJointBid==='true'&&details.isJointState === 'true'">联合投标</el-button>
      <el-button type="primary" @click="perBid(details.code, details.state)" v-if="$cookie.get('role')==='puser'">个人投标</el-button>
      <el-button type="primary" @click="comBid(details.code, details.state)" v-if="$cookie.get('role')==='cuser'">企业投标</el-button>
    </span>
   </el-dialog>
   <div style="clear:both;"></div>
   <el-pagination class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9, 18]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="data.length">
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
      details: {'loadingPeople': true, 'loadingProject': true}
    }
  },
  computed: mapState(['data']),
  methods: {
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    detail (code, sourceAccount) {
      this.dialogVisible = true
      this.$set(this.details, 'code', code)
      this.$http.post('http://39.106.34.156:8080/electric-design/getProjectByCode', {'code': code})
      .then((res) => {
        console.log(res.data)
        this.$set(this.details, 'personalBidAccounts', (Array.isArray(res.data.personalBidAccounts) ? res.data.personalBidAccounts : []))
        this.details.personalBidAccounts.splice(0, 0, this.$cookie.get('user'))
        this.$set(this.details, 'companyBidAccounts', Array.isArray(res.data.companyBidAccounts) ? res.data.companyBidAccounts : [])
        this.details.companyBidAccounts.splice(0, 0, this.$cookie.get('user'))
        this.$set(this.details, 'name', res.data.name)
        this.$set(this.details, 'state', res.data.state)
        this.$set(this.details, 'isAcceptJointBid', res.data.isAcceptJointBid)
        this.$set(this.details, 'isJointState', res.data.isJointState)
        this.$set(this.details, 'type', res.data.type.join(','))
        this.$set(this.details, 'category', res.data.category.join(','))
        this.$set(this.details, 'major', res.data.major.join(','))
        this.$set(this.details, 'loadingProject', false)
      }).catch((err) => {
        console.log(err)
      })
      this.$http.post('http://39.106.34.156:8080/electric-design/searchAllUsersByKeyAndValue', {'value': sourceAccount, 'key': 'account'})
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
    perBid (code, state) {
      this.dialogVisible = false
      if (state !== '投标中') {
        this.$message({
          type: 'warning',
          message: `只有投标中的项目才可以投标哦,该项目的状态为${state}`
        })
      } else {
        this.$http.post('http://39.106.34.156:8080/electric-design/updateProjectByProjectCode', {'code': code, 'data': {'state': '投标中', 'personalBidAccounts': this.details.personalBidAccounts}})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `个人投标成功,请在项目汇总里查看`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `投标失败,原因：${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
      }
    },
    comBid (code, state) {
      this.dialogVisible = false
      if (state !== '投标中') {
        this.$message({
          type: 'warning',
          message: `只有投标中的项目才可以投标哦,该项目的状态为${state}`
        })
      } else {
        this.$http.post('http://39.106.34.156:8080/electric-design/updateProjectByProjectCode', {'code': code, 'data': {'state': '投标中', 'companyBidAccounts': this.details.companyBidAccounts}})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `企业投标成功,请在项目汇总里查看`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `投标失败,原因：${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
      }
    },
    allyBid (code, state) {
      this.dialogVisible = false
      if (state !== '投标中') {
        this.$message({
          type: 'warning',
          message: `只有投标中的项目才可以投标哦,该项目的状态为${state}`
        })
      } else {
        this.$http.post('http://39.106.34.156:8080/electric-design/updateProjectByProjectCode', {'code': code, 'data': {'state': '投标中', 'jointReleaseAccount': this.$cookie.get('user'), 'isJointState': 'true'}})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `联合体投标成功,请在联合体里查看`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `投标失败,原因：${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
      }
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
    margin:3rem auto 0 auto;
    width:80%;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
