<template>
  <div class="permiss">
     <div class="title"><span style="font-size:2rem">权限分配</span><i class="icon iconfont icon-iconfontquestion"></i></div>
     <el-table :data="data">
         <el-table-column label="账号">
             <template slot-scope="scope">
                 <el-input v-model="scope.row.belongToUserId"></el-input>
             </template>
         </el-table-column>
         <el-table-column label="姓名">
             <template slot-scope="scope">
                 <el-input v-model="scope.row.belongtoUserName"></el-input>
             </template>
         </el-table-column>         
         <el-table-column label="权限等级">
             <template slot-scope="scope">
                 <el-input v-model="scope.row.permissionRank"></el-input>
             </template>
         </el-table-column>            
         <el-table-column label="权限内容">
             <template slot-scope="scope">
                 <el-input v-model="scope.row.perContent"></el-input>
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
      data: []
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
      this.$http.post(this.$domain.domain1 + 'electric-design/getPermessionsByMultiConditions', {
        'conditions': {
          'belongToProjectCode': {'searchMethod': 'values', 'values': [this.id]}
        }
      }).then((res) => {
        console.log(res.data)
        this.data = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    add () {
      this.data.push({
        'belongToUserId': 'xx',
        'belongtoUserName': 'xx',
        'permissionRank': 'xx',
        'perContent': 'xx'
      })
    },
    myConfirm (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/addPermession ', {
        'belongToUserId': row.belongToUserId,
        'belongtoUserName': row.belongtoUserName,
        'belongToProjectCode': this.id,
        'permissionRank': row.permissionRank,
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
      this.$http.post(this.$domain.domain1 + 'electric-design/updatePermessionByCode ', {
        'belongToUserId': row.belongToUserId,
        'belongToProjectCode': this.id,
        'data': {
          'belongtoUserName': row.belongtoUserName,
          'permissionRank': row.permissionRank,
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
        'belongToUserId': row.belongToUserId,
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
