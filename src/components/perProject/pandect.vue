<template>
  <div class="pandect"> 
   <div class="title"><span style="font-size:2rem">总览</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <div class="content" style="overflow:hidden;height:auto">
     <el-col :span="8">
       <p style="text-align:left;color:#409EFF;font-size:1.8rem">|{{name}}</p>
     </el-col>
     <el-col>
      <div style="display:flex;justify-content:flex-start;align-items:center;flex-wrap:wrap" v-if="changePNamePer==='yes'">
         <div class="permiss">
           <span style="font-size:1.5rem">名称变更</span><el-input v-model="changedName" style="width:50%"></el-input><el-button type="primary" @click="changeName()">保存</el-button>  
         </div>
        <div class="permiss">
           <span style="font-size:1.5rem">阶段变更</span><el-select v-model="changedProcess" style="width:50%"><el-option v-for="(i, j) in processRequirementsName" :key="j" :label="i" :value="i"></el-option></el-select><el-button type="primary" @click="changeProcess()">保存</el-button>
         </div>
         <!-- <div class="permiss">
           <span style="font-size:1.5rem">状态变更</span><el-select v-model="changedState" style="width:50%"><el-option v-for="(i, j) in states" :key="j" :label="i" :value="i"></el-option></el-select><el-button type="primary" @click="changeState()">保存</el-button>
         </div>
 
         <div class="permiss">
           <span style="font-size:1.5rem">接受联合体投标</span><el-switch v-model="changedIsAcceptJointBid" active-text="是" inactive-text="否" inactive-value="false" active-value="true"></el-switch><el-button type="primary" @click="changeIsAcceptJointBid()">保存</el-button>
         </div>
         <div class="permiss">
           <span style="font-size:1.5rem">可以联合体投标</span><el-switch v-model="changedIsJointState" active-text="是" inactive-text="否" inactive-value="false" active-value="true"></el-switch><el-button type="primary" @click="changeIsJointState()">保存</el-button>
         </div> -->
        <el-button v-if="sourceAccount===$cookie.get('user')" @click="$router.push('/per-project/' + id + '/alter')" type="success">修改更多项目信息</el-button>
       </div>
     </el-col>
     <el-col>
       <div class="pandect-div"><span>编号:{{code}}</span><span>电压等级:{{voltagelevel}}</span></div>
       <div class="pandect-div"><span>类别:{{category}}</span><span>专业:{{major}}</span></div>
       <div class="pandect-div"><span>状态:{{state}}</span><span>类型:{{type}}</span></div>
     </el-col>
   </div>
   <div class="content">
     <p style="text-align:left;color:#409EFF;font-size:1.5rem">|目前阶段</p>
     <el-steps :active="processRequirementsName.indexOf(designProcess)"  process-status="finish" finish-status="success" align-center style="margin-left:-4rem;width:100%">
      <el-step :title="i.state" v-for="(i, j) in processRequirements" :key="j"></el-step>
     </el-steps>
   </div>
   <div class="content">
     <p style="text-align:left;color:#409EFF;font-size:1.5rem">|成果交付</p>
     <el-table :data="processRequirements">
       <el-table-column prop="state" label="设计阶段"></el-table-column>
       <el-table-column prop="endTime" label="交付时间"></el-table-column>
       <el-table-column prop="requireResult" label="成果要求"></el-table-column>
     </el-table>
   </div>
  </div>
</template>

<script>
import store from '@/vuex/perProject'
import {mapState} from 'vuex'
export default {
  store,
  data () {
    return {
      changePNamePer: 'no',
      divideRolePer: 'no',
      name: '',
      states: ['发布中', '投标中', '洽谈中', '投标洽谈', '合同执行中', '合同终止'],
      sourceAccount: '',
      changedName: '',
      changedState: '',
      changedProcess: '',
      changedIsAcceptJointBid: '',
      changedIsJointState: '',
      code: '',
      state: '',
      voltagelevel: '',
      type: '',
      category: '',
      major: '',
      processRequirements: [],
      processRequirementsName: [],
      designProcess: ''
    }
  },
  computed: {
    ...mapState(['id'])
  },
  mounted () {
    this.initData()
    this.initPremiss()
  },
  watch: {
    id () {
      this.initData()
    }
  },
  methods: {
    initPremiss () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getPermessionsByMultiConditions', {
        'conditions': {
          'belongToProjectCode': {'searchMethod': 'values', 'values': [this.id]}
        }
      }).then((res) => {
        console.log(res.data)
        res.data.forEach((el, index) => {
          if (el.belongToUserId === this.$cookie.get('user')) {
            if (el.perContent.changePName === 'yes') {
              this.changePNamePer = 'yes'
            }
            if (el.perContent.divideRole === 'yes') {
              this.divideRolePer = 'yes'
            }
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': this.id}).then((res) => {
        this.name = res.data.name
        this.sourceAccount = res.data.sourceAccount
        this.changedName = res.data.changeName
        this.code = res.data.code
        this.state = res.data.state
        this.changedState = res.data.state
        this.voltagelevel = res.data.voltagelevel
        this.type = res.data.type.join(',')
        this.category = res.data.category
        this.major = res.data.major.join(',')
        this.processRequirements = res.data.processRequirements
        this.designProcess = res.data.designProcess
        this.changedProcess = res.data.designProcess
        this.changedIsAcceptJointBid = res.data.isAcceptJointBid
        this.changedIsJointState = res.data.isJointState
        this.processRequirementsName = []
        res.data.processRequirements.forEach((el, index) => {
          this.processRequirementsName.push(el.state)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    changeName () {
      this.$http.post(this.$domain.domain1 + 'electric-design/updateProjectByProjectCode', {'code': this.id, data: { 'changeName': this.changedName }}).then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `名称已经改变`
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `修改失败`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeState () {
      this.$http.post(this.$domain.domain1 + 'electric-design/updateProjectByProjectCode', {'code': this.id, data: { 'state': this.changedState }}).then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `状态已经改变`
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `修改失败`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeProcess () {
      this.$http.post(this.$domain.domain1 + 'electric-design/updateProjectByProjectCode', {'code': this.id, data: { 'designProcess': this.changedProcess }}).then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `阶段已经改变`
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `修改失败`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeIsAcceptJointBid () {
      this.$http.post(this.$domain.domain1 + 'electric-design/updateProjectByProjectCode', {'code': this.id, data: { 'isAcceptJointBid': this.changedIsAcceptJointBid }}).then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `操作成功`
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `修改失败`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    changeIsJointState () {
      this.$http.post(this.$domain.domain1 + 'electric-design/updateProjectByProjectCode', {'code': this.id, data: {'isJointState': this.changedIsJointState}}).then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `操作成功`
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `修改失败`
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
.pandect{
  width:90%;
  margin:1rem auto;
}
.title{
  border-bottom:1px solid black;
  text-align:left;
}
.icon{
  font-size:2rem;
}
.content{
  border-top:1px solid black;
}
.pandect-div{
display:flex;
justify-content:space-around;
font-size:1.2rem;
height:2rem;
}
.pandect-div>span{
  width:50%;
text-align:left;
}
.permiss{
  /* margin-left: 2rem; */
  width: 40%;
  height:4rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
