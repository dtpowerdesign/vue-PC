<template>
  <div class="member">
    <div class="title"><span style="font-size:1.5rem">成员信息</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <el-table :data="table">
      <el-table-column prop="memberAccount" label="成员账号"></el-table-column>
      <el-table-column prop="memberRole" label="成员角色"></el-table-column>
      <el-table-column prop="memberName" label="成员姓名"></el-table-column>
      <el-table-column label="成员职位">
        <template slot-scope="scope">
          <el-select v-model="scope.row.memberJob">
            <el-option v-for="(i, j) in jobs" :key="j" :label="i.value" :value="i.key"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="金额分配比例(请输入小数)">
        <template slot-scope="scope">
          <el-input v-model="scope.row.moneyRate" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="alter(scope.row)" disabled="divideRolePer!=='yes'">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <i class="icon iconfont icon-iconfonticonfontjixieqimo" @click="manage()" v-if="divideRolePer==='yes'"></i>
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
      jobs: [{'key': 'maste', 'value': '主持人'}, {'key': 'drawer', 'value': '制图者'}, {'key': 'checker', 'value': '校核人'}, {'key': 'auditor', 'value': '审核人'}, {'key': 'projectManager', 'value': '项目经理'}, {'key': 'projectAnalyst', 'value': '平台分析设计师'}, {'key': 'workGenerater', 'value': '工程代理'}],
      table: [],
      changePNamePer: 'no',
      divideRolePer: 'no'
    }
  },
  mounted () {
    this.initData()
    this.initPremiss()
  },
  methods: {
    initPremiss () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getPermessionsByMultiConditions', {
        'conditions': {
          'belongToProjectCode': {'searchMethod': 'values', 'values': [this.id]}
        }
      }).then((res) => {
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
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectMember', {
        'belongToProjectCode': this.id
      })
    .then((res) => {
      console.log(res.data)
      this.table = res.data
    }).catch((err) => {
      console.log(err)
    })
    },
    alter (row) {
      this.$http.post(this.$domain.domain1 + '/electric-design/changeProjectMember', row)
      .then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
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
