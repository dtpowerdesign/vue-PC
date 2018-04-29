<template>
  <div class="permiss">
     <div class="title"><span style="font-size:1.5rem">权限分配</span><i class="icon iconfont icon-iconfontquestion"></i></div>
     <el-table :data="data">
         <el-table-column label="账号">
          <template slot-scope="scope">
            <el-select v-model="scope.row.belongToUserId" value-key="account" @change="change(scope.row)">
              <el-option v-for="(i, j) in persons" :key="j" :value="i" :label="i.account">账号:{{i.account}}/姓名:{{i.name}}</el-option>
            </el-select>
          </template>             
         </el-table-column>
         <el-table-column label="姓名" prop="belongtoUserName">
         </el-table-column>                   
         <el-table-column label="分配角色权限">
             <template slot-scope="scope">
                <!-- <span>分配角色</span> -->
                <el-switch v-model="scope.row.perContent.divideRole" active-color="#13ce66" inactive-color="#ff4949" active-value="yes" inactive-value="no"></el-switch>
             </template>
         </el-table-column>
         <el-table-column label="更改名字权限">
             <template slot-scope="scope">
                <!-- <span>分配角色</span> -->
                <el-switch v-model="scope.row.perContent.changePName" active-color="#13ce66" inactive-color="#ff4949" active-value="yes" inactive-value="no"></el-switch>
             </template>
         </el-table-column>         
         <el-table-column label="操作">
             <template slot-scope="scope">
                 <el-button type="primary" @click="myConfirm(scope.row)" v-if="!scope.row.belongToProjectCode">添加</el-button>
                 <el-button type="success" @click="myUpdate(scope.row)" v-if="scope.row.belongToProjectCode">修改</el-button>
                 <el-button type="danger" @click="myDelete(scope.row)">删除</el-button>
             </template>
         </el-table-column>         
     </el-table>
     <el-button type="primary" @click="add()">增加一行</el-button>
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
      data: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getPermessionsByMultiConditions', {
        'conditions': {
          'belongToProjectCode': {'searchMethod': 'values', 'values': [this.id]}
        }
      }).then((res) => {
        console.log(res.data)
        this.data = res.data
        this.data.forEach((el, index) => {
          var tempJson = {'account': el.belongToUserId, 'name': el.belongtoUserName}
          el.belongToUserId = tempJson
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
      }).catch((err) => {
        console.log(err)
      })
    },
    change (row) {
      this.data.forEach((el, index) => {
        if (el.belongToUserId.account === row.belongToUserId.account) {
          this.persons.forEach((ell, indexx) => {
            if (ell.account === row.belongToUserId.account) {
              el.belongtoUserName = ell.name
            }
          })
        }
      })
    },
    add () {
      this.data.push({
        'belongToUserId': {'account': '', 'name': ''},
        'belongtoUserName': '暂无数据',
        'perContent': {'divideRole': 'no', 'changePName': 'no'}
      })
    },
    myConfirm (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/addPermession ', {
        'belongToUserId': row.belongToUserId.account,
        'belongtoUserName': row.belongToUserId.name,
        'belongToProjectCode': this.id,
        'perContent': row.perContent,
        'sourceUserId': this.$cookie.get('user'),
        'sourceUserName': this.$cookie.get('name')
      }).then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `添加失败,原因${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    myUpdate (row) {
      console.log(row.belongToUserId)
      this.$http.post(this.$domain.domain1 + 'electric-design/updatePermessionByCode ', {
        'belongToUserId': row.belongToUserId.account,
        'belongToProjectCode': this.id,
        'data': {
          'belongToUserId': row.belongToUserId.account,
          'belongtoUserName': row.belongToUserId.name,
          'perContent': row.perContent,
          'sourceUserId': this.$cookie.get('user'),
          'sourceUserName': this.$cookie.get('name')
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `修改失败,原因${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    myDelete (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/delPermessionByCode', {
        'belongToUserId': row.belongToUserId.account,
        'belongToProjectCode': this.id
      }).then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `删除失败,原因${res.data.reason}`
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
.permiss{
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
  margin-left: 1rem;
}
</style>
