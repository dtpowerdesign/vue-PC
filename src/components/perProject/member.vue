<template>
  <div class="member">
    <div class="title"><span style="font-size:2rem">成员信息</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <div v-for="(i, j) in data" :key="j" class="member-div">
      <span style="color:red;font-size:1.5rem">{{i.key}}:</span>
      <span v-for="(k, l) in i.value" :key="l" @click="fun(k.account)" style="color:#4d83e7;font-size:1.5rem;margin-left:1rem"><i class="icon iconfont icon-gerenziliao"></i>{{k.name}}</span>
    </div>
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="60%">
      <el-table :data="detailMember" border stripe>
        <el-table-column prop="title" label="角色" width="155"></el-table-column>
        <el-table-column label="成员">
          <template slot-scope="scope">
            <el-select v-model="scope.row.value" multiple value-key="account">
              <el-option v-for="(i, j) in persons" :key="j" :value="i" :label="i.account">账号:{{i.account}}/姓名:{{i.name}}</el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="155">
          <template slot-scope="scope">
            <el-button type="warning" @click="confirm(scope.row)">确认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <i class="icon iconfont icon-iconfonticonfontjixieqimo" @click="manage()" v-if="$cookie.get('user')===sourceAccount"></i>
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
      persons: [{'account': '1802528291@qq.com', 'name': '帅哥'}],
      data: {
        'master': {'key': '主持人', 'value': []},
        'drawer': {'key': '制图者', 'value': []},
        'checker': {'key': '校核人', 'value': []},
        'auditor': {'key': '审核人', 'value': []},
        'projectManager': {'key': '项目经理', 'value': []},
        'platformProjectAnalyst': {'key': '平台分析设计师', 'value': []},
        'workGenerater': {'key': '工程代理', 'value': []}
      },
      dialogVisible: false,
      sourceAccount: '',
      detailMember: [{'title': '', 'key': '', 'value': []}]
    }
  },
  mounted () {
    this.initData()
  },
  updated () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectMember', {
        'belongToProjectCode': this.id
      })
    .then((res) => {
      console.log(res.data)
      for (var i in this.data) {
        this.data[i].value = Array.isArray(res.data[i]) ? res.data[i] : []
      }
    }).catch((err) => {
      console.log(err)
    })
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': this.id})
      .then((res) => {
        this.sourceAccount = res.data.sourceAccount
        this.$http.post(this.$domain.domain1 + 'electric-design/searchAllUsersByKeyAndValues1', {
          'key': 'account',
          'values': Array.isArray(res.data.toAccounts) ? res.data.toAccounts : [res.data.toAccounts]
        }).then((res) => {
          this.persons = []
          for (var i in res.data) {
            this.persons.push({
              'account': res.data[i].account,
              'name': res.data[i].name
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    manage () {
      this.dialogVisible = true
      this.detailMember = []
      for (var i in this.data) {
        this.detailMember.push({
          'key': i,
          'title': this.data[i].key,
          'value': this.data[i].value
        })
      }
    },
    confirm (row) {
      console.log(row.value)
      console.log(row.key)
      var formData = {}
      formData.belongToProjectCode = this.id
      formData[row.key] = row.value
      console.log(formData)
      this.$http.post(this.$domain.domain1 + 'electric-design/addProjectMember', formData)
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `添加成功`
          })
          this.dialogVisible = false
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `添加失败,原因${res.data.reason}`
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.member{
  width: 90%;
  margin: 3rem auto 0 auto;
}
.title{
  text-align:left;
  margin-bottom:2rem;
  position:relative;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.member-div{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top:2rem;
}
</style>
