<template>
  <div>
  <div v-if="show" v-loading="loadingDetail">
    <div class="title"><span>|{{name}}</span><el-button type="primary" @click="show=false">返回</el-button></div>
    <el-row style="margin-top:3rem">
      <el-col :span="8">
       <span class="font1">招标公司</span><br>
       <i class="icon iconfont icon-gongsi"></i><span class="font2">{{company}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">项目地点</span><br>
        <i class="icon iconfont icon-didian"></i><span class="font2">{{place}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">发布时间</span><br>
        <i class="icon iconfont icon-riqi"></i><span class="font2">{{date}}</span>
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
        <i class="icon iconfont icon-zhuanhuan"></i><span class="font2">{{result}}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top:3rem">
      <el-col :span="12" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">其他信息</span><br>
        <el-row>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">类别:{{classes}}</span></el-col>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">规模容量:{{voltage}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">类型:{{type}}</span></el-col>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">专业要求:{{domain}}</span></el-col>
        </el-row>
      </el-col>
      <el-col :span="6" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">发布人信息</span><br>
        <p class="font1" style="text-align:left" v-html="info"></p>
      </el-col>
    </el-row>
    <el-row v-if="sourceAccount===$cookie.get('user')" style="margin-top:2rem">
      <el-col :span="24" style="color:#409EFF;font-size:1.5rem">中标者:{{toAccounts.join(',')}}</el-col>
      <el-button type="success" @click="$router.push('/per-project/' + code)">我要修改项目信息</el-button>
      <el-button type="danger" @click="bad()">我要毁约</el-button>
      <el-button type="success" @click="good()">合同顺利终止</el-button>
    </el-row>
  </div>
  <div v-else v-loading="loadingTable">
   
  <div style="display:flex; align-items:center; justify-content: space-between">
        <span style="font-size:1.5rem;color:#4d83e7">|合同执行中</span>
          <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button  type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe :default-sort = "{prop: 'number', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="序号" sortable>
        </el-table-column>
        <el-table-column prop="company"  label="招标公司">
        </el-table-column>
        <el-table-column  prop="name" label="项目名称" >
        </el-table-column>
        <el-table-column  prop="address" label="地点">
        </el-table-column>
        <el-table-column  prop="class" label="类别">
        </el-table-column>
        <el-table-column  prop="type" label="类型">
        </el-table-column>
        <el-table-column  prop="voltage" label="电压等级" sortable>
        </el-table-column>
        <el-table-column  prop="amount" label="预计金额" sortable>
        </el-table-column>
        <el-table-column  prop="date" label="发布日期" sortable>
        </el-table-column>
        <el-table-column   label="操作">
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
      company: '',
      place: '',
      date: '',
      bidType: '',
      price: '',
      result: '',
      type: '',
      classes: '',
      voltage: '',
      domain: '',
      info: ''
    }
  },
  created () {
  },
  methods: {
    initData () {
      var formData = {'conditions': {'state': {'searchMethod': 'values', 'values': ['合同执行中']}, 'aboutUsers': {'searchMethod': 'values', 'values': [this.$cookie.get('user')]}}}
      this.$http.post('http://39.106.34.156:8080/electric-design/getProjectAboutUser', formData)
        .then((res) => {
          if (res.data.length !== 0) {
            res.data.forEach((el, index) => {
              var obj = {
                toAccounts: el.toAccounts,
                number: el.code,
                company: el.tenderCompany,
                name: el.name,
                address: el.address,
                class: el.category.concat().join(','),
                type: el.type.concat().join(','),
                voltage: el.voltagelevel,
                amount: el.lowestPrice + '-' + el.highestPrice,
                date: [].concat((el.startTime.year + 1900), (el.startTime.month + 1), el.startTime.date).join('/'),
                state: el.state,
                category: el.category.concat().join(','),
                major: el.major.concat().join(','),
                sourceAccount: el.sourceAccount,
                bidType: el.bidType
              }
              this.tableData.push(obj)
            })
          }
          this.loadingTable = false
        }).catch((err) => {
          console.log(err)
        })
    },
    detail (row) {
      this.show = true
      this.code = row.number
      this.name = row.name
      this.company = row.company
      this.place = row.address
      this.date = row.date
      this.price = row.amount
      this.result = row.state
      this.type = row.type
      this.classes = row.category
      this.voltage = row.voltage
      this.domain = row.major
      this.bidType = row.bidType
      this.sourceAccount = row.sourceAccount
      this.toAccounts = row.toAccounts
      this.$http.post('http://39.106.34.156:8080/electric-design/searchAllUsersByKeyAndValue', {'value': row.sourceAccount, 'key': 'account'}).then((res) => {
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
      if (this.multipleSelection.length !== 0) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['序号', '招标公司', '项目名称', '地点', '类别', '类型', '电压等级', '预计金额', '发布日期']
          const filterVal = ['number', 'company', 'name', 'address', 'class', 'type', 'voltage', 'amount', 'date']
          const list = xxx
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '项目信息excel')
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
        this.$http.post('http://39.106.34.156:8080/electric-design/updateProjectByProjectCode', {'code': this.code, 'data': {'state': '投标中', 'toAccounts': [], 'jointReleaseAccount': '', 'isJointState': 'false'}})
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
    good () {
      this.$confirm(`您确定合同终止了吗`, '确定后无法修改', {
        confirmButtonText: '不用想了，就这样',
        cancelButtonText: '手滑了',
        type: 'warning'
      }).then(() => {
        this.$http.post('http://39.106.34.156:8080/electric-design/updateProjectByProjectCode', {'code': this.code, 'data': {'state': '合同终止'}})
        .then((res) => {
          console.log(res.data)
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: '操作成功，已经进入合同终止状态'
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
