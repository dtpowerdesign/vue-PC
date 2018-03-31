<template>
  <div>
  <div v-if="show" v-loading="loadingDetail">
    <div class="title"><span>|{{name}}</span><el-button type="primary" @click="show=false">返回</el-button></div>
    <el-row style="margin-top:3rem">
      <el-col :span="8">
       <span class="font1">招标公司</span><br>
       <i class="icon iconfont icon-gongsi"></i><span class="font2">{{tenderCompany}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">项目地点</span><br>
        <i class="icon iconfont icon-didian"></i><span class="font2">{{address}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">发布时间</span><br>
        <i class="icon iconfont icon-riqi"></i><span class="font2">{{startTime}}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top:3rem">
      <el-col :span="8">
       <span class="font1">项目个体性质</span><br>
       <i class="icon iconfont icon-loufang"></i><span class="font2">{{bidType}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">报价</span><br>
        <i class="icon iconfont icon-qian"></i><span class="font2">{{price}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">成果交付</span><br>
        <i class="icon iconfont icon-zhuanhuan"></i><span class="font2">{{state}}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top:3rem">
      <el-col :span="12" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">其他信息</span><br>
        <el-row>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">类别:{{category}}</span></el-col>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">规模容量:{{voltage}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">类型:{{type}}</span></el-col>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">专业要求:{{major}}</span></el-col>
        </el-row>
      </el-col>
      <el-col :span="6" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">发布人信息</span><br>
        <p class="font1" style="text-align:left" v-html="info"></p>
      </el-col>
    </el-row>
    <el-row v-if="sourceAccount===$cookie.get('user')" style="margin-top:2rem">
      <el-col :span="24" style="color:#409EFF;font-size:1.5rem">中标者:{{toAccounts.join(',')}}</el-col>
      <el-button type="danger" @click="bad()">重新回到投标状态</el-button>
    </el-row>
      <el-button type="success" @click="myCredit()">评价</el-button>
    <el-dialog title="评价" :visible.sync="dialogVisibleCredit" width="80%"> 
      <el-table :data="credit" border stripe>
        <el-table-column label="阶段">
          <template slot-scope="scope">
            <el-select v-model="scope.row.belongToProcess">
              <el-option v-for="(i, j) in processRequirementsName" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </template>          
        </el-table-column>
        <el-table-column label="用户">
          <template slot-scope="scope">
            <el-select v-model="scope.row.belongToUserId">
              <el-option v-for="(i, j) in ppp" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="分数">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.score" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"  show-score></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="评论">
          <template slot-scope="scope">
            <el-input v-model="scope.row.comment"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="是否匿名">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.anonymous" active-text="匿名" inactive-text="不匿名" active-value="yes" inactive-value="no"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="confirmCredit(scope.row)">确定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
      <el-button type="success" @click="add()">添加一行</el-button>
      <el-button @click="dialogVisibleCredit = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
  <div v-else v-loading="loadingTable">
   
  <div style="display:flex; align-items:center; justify-content: space-between; background:#F9F9F9;height:4rem">
        <span style="font-size:1.5rem;color:#4d83e7">|合同终止</span>
          <div>
            <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/project')" >表头编辑</el-button>
            <el-button size="small" style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button size="small" type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe :default-sort = "{prop: 'code', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(i, j) in json" :key="j" :prop="j" :label="i.title" :fixed="j==='name'?'left':false"></el-table-column>
        <el-table-column   label="操作" fixed="right" width="85">
          <template slot-scope="adasd">
            <el-button @click="detail(adasd.row)" type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
      </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisibleCredit: false,
      sourceAccount: '',
      loadingDetail: true,
      loadingTable: true,
      currentPage: 1,
      pagesize: 5,
      downloadLoading: false,
      tableData: [],
      multipleSelection: [],
      show: false,
      code: '',
      toAccounts: [],
      name: '',
      tenderCompany: '',
      address: '',
      startTime: '',
      bidType: '',
      price: '',
      state: '',
      type: '',
      category: '',
      voltage: '',
      major: '',
      info: '',
      json: {},
      jsonAll: {},
      credit: [],
      processRequirementsName: [],
      ppp: [],
      max: 100
    }
  },
  created () {
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfProject').then((res) => {
        this.jsonAll = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'projects', 'otherName': 'project'})
      .then((res) => {
        // console.log(res.data)
        this.json = {}
        for (var i in res.data) {
          this.json[i] = {
            key: i,
            title: res.data[i]}
        }
        // console.log(this.json)
      }).catch((err) => {
        console.log(err)
      })
        var formData = {'conditions': {'state': {'searchMethod': 'values', 'values': ['合同终止']}, 'aboutUsers': {'searchMethod': 'values', 'values': [this.$cookie.get('user')]}}}
        this.$http.post(this.$domain.domain1 + 'electric-design/getProjectAboutUser', formData)
        .then((res) => {
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {}
              for (var i in this.jsonAll) {
                if (Array.isArray(el[i]) && (i !== 'processRequirements')) {
                  obj[i] = el[i].concat().join(',')
                } else if (i.match(/(Time)$/) && !i.match(/^(all)/) && el[i] !== '暂无数据') {
                  el[i].year = el[i].year || 0
                  el[i].month = el[i].month || 0
                  el[i].date = el[i].date || 0
                  obj[i] = [].concat((el[i].year + 1900), (el[i].month + 1), el[i].date).join('/')
                } else {
                  obj[i] = el[i]
                }
              }
              this.tableData.push(obj)
            })
          }
          this.loadingTable = false
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    detail (row) {
      this.show = true
      this.code = row.code
      this.name = row.name
      this.tenderCompany = row.tenderCompany || ''
      this.address = row.address
      this.startTime = row.startTime
      this.price = row.lowestPrice + '-' + row.highestPrice
      this.state = row.state
      this.type = row.type
      this.category = row.category
      this.voltage = row.voltage
      this.major = row.major
      this.bidType = row.bidType
      this.sourceAccount = row.sourceAccount
      this.toAccounts = row.toAccounts ? row.toAccounts.split(',') : []
      this.processRequirementsName = []
      var xxx = Array.isArray(row.processRequirements) ? row.processRequirements : []
      this.processRequirementsName = []
      xxx.forEach((el, index) => {
        this.processRequirementsName.push(el.state)
      })
      this.ppp = this.toAccounts.concat(this.sourceAccount)
      this.$http.post(this.$domain.domain1 + 'electric-design/searchAllUsersByKeyAndValue', {'value': row.sourceAccount, 'key': 'account'}).then((res) => {
        console.log(res.data)
        this.info = `姓名:${res.data[0].name}<br>账号:${res.data[0].account}<br>邮箱:${res.data[0].email}`
        this.loadingDetail = false
      }).catch((err) => { console.log(err) })
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleDownload () {
      var xxx = this.multipleSelection
      var t1 = []
      for (var i in this.json) {
        t1.push(this.json[i].title)
      }
      var t2 = []
      for (var j in this.json) {
        t2.push(this.json[j].key)
      }
      if (this.multipleSelection.length !== 0) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = t1
          const filterVal = t2
          const list = xxx
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '项目终止信息excel')
          this.downloadLoading = false
        })
      } else {
        this.$message({
          showClose: true,
          message: '你还未选择哦',
          type: 'warning'
        })
      }
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    bad () {
      this.$confirm(`您确定让此项目重新回到投标状态吗`, '确定后无法修改', {
        confirmButtonText: '不用想了，就这样',
        cancelButtonText: '我再考虑考虑',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.$domain.domain1 + 'electric-design/bidFaild', {'belongToProjectCode': this.code})
        .then((res) => {
          console.log(res.data)
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: '已经回到投标状态'
            })
            this.dialogVisible = false
            this.$router.go(0)
          } else {
            this.$message({
              type: 'warning',
              message: `操作失败，原因${res.data.reason}`
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    myCredit () {
      this.dialogVisibleCredit = true
      this.$http.post(this.$domain.domain1 + 'electric-design/getcreditByMultiConditions', {'conditions': {
        'sourceUserId': {'searchMethod': 'values', 'values': [this.$cookie.get('user')]},
        'belongToProjectCode': {'searchMethod': 'values', 'values': [this.code]}
      }}).then((res) => {
        console.log(res.data)
        this.credit = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    add () {
      this.credit.push({
        'belongToProcess': '',
        'belongToUserId': '',
        'score': 5,
        'comment': '',
        'anonymous': 'yes'
      })
    },
    confirmCredit (row) {
      if (row.code) {
        this.$http.post(this.$domain.domain1 + 'electric-design/changeCreditByCode', {'code': row.code,
          'data': {
            'belongToProjectCode': this.code,
            'sourceUserId': this.$cookie.get('user'),
            'belongToUserId': row.belongToUserId,
            'belongToProcess': row.belongToProcess,
            'score': row.score,
            'comment': row.comment,
            'anonymous': row.anonymous
          }})
        .then((res) => {
          console.log(res.data)
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: '评论成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: `失败原因${res.data.reason}`
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        this.$http.post(this.$domain.domain1 + 'electric-design/addCredit', {
          'belongToProjectCode': this.code,
          'sourceUserId': this.$cookie.get('user'),
          'belongToUserId': row.belongToUserId,
          'belongToProcess': row.belongToProcess,
          'score': row.score,
          'comment': row.comment,
          'anonymous': row.anonymous
        })
        .then((res) => {
          console.log(res.data)
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: '评论成功'
            })
          } else {
            this.$message({
              type: 'warning',
              message: `失败原因${res.data.reason}`
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
.title{
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.title span{
  font-size: 2rem;
  color:#409EFF;
}
.font1{
 font-size:1.1rem;
}
.font2{
  font-size: 1.5rem;
  color:#409EFF;
}
.icon{
  font-size:2rem;
  color:#F56C6C;
}
</style>
