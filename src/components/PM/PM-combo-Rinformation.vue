<template>
  <div>
  <div v-if="show">
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
       <span class="font1">设计院</span><br>
       <i class="icon iconfont icon-loufang"></i><span class="font2">{{shejiyuan}}</span>
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
      <el-col :span="14" :offset="2">
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
      <el-col :span="4" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">收到请求</span><br>
        <p class="font1" style="text-align:left;color:#409EFF"><span v-for="i in info"> {{i}} </span></p>
      </el-col>
    </el-row>
    <el-button type="success" style="margin-top:5rem" @click="accept()">接受洽谈</el-button>
  </div>  
  <div v-else>
   
  <div style="display:flex; align-items:center; justify-content: space-between">
        <span style="font-size:1.5rem;color:#4d83e7">|收到请求</span>
          <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button  type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe :default-sort = "{prop: 'number', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="序号" sortable>
        </el-table-column>
        <el-table-column prop="initiator"  label="发起人">
        </el-table-column>
        <el-table-column  prop="project" label="投标项目" >
        </el-table-column>
        <el-table-column  prop="type" label="项目类型">
        </el-table-column>
        <el-table-column  prop="domain" label="专业类别">
        </el-table-column>
        <el-table-column  prop="time" label="请求时间">
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
      currentPage: 1,
      pagesize: 5,
      downloadLoading: false,
      tableData: [],
      multipleSelection: [],
      show: false,
      name: '',
      company: '',
      place: '',
      date: '',
      shejiyuan: '',
      price: '',
      result: '',
      type: '',
      classes: '',
      voltage: '',
      domain: '',
      info: []
    }
  },
  created () {
    this.$http.post('http://39.106.34.156:8080/electric-design/getProjectsByMultiConditions',
     {conditions: {'invitatingAccounts': {'searchMethod': 'values', 'values': []}}})
        .then((res) => {
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {
                number: el.code,
                initiator: el.sourceAccount,
                project: el.name,
                type: el.type.concat().join(','),
                domain: el.major.concat().join(','),
                address: el.address,
                class: el.category.concat().join(','),
                time: [].concat((el.startTime.year + 1900), (el.startTime.month + 1), el.startTime.date).join('/'),
                state: el.state,
                category: el.category.concat().join(','),
                major: el.major.concat().join(','),
                voltage: el.voltagelevel,
                amount: el.amountOfInvestment,
                company: el.sourceAccount
              }
              this.tableData.push(obj)
            })
          }
        }).catch((err) => {
          console.log(err)
        })
  },
  methods: {
    detail (row) {
      this.show = true
      this.name = row.project
      this.company = row.company
      this.place = row.address
      this.date = row.date
      this.price = row.amount
      this.result = row.state
      this.type = row.type
      this.classes = row.category
      this.voltage = row.voltage
      this.domain = row.major
      this.$http.post('http://39.106.34.156:8080/electric-design/getCuserByAccount', {'desAccounts': ['1111']}).then((res) => {
        this.shejiyuan = res.data[0].companyType
      }).catch((err) => { console.log(err) })
      this.info = ''
    },
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleDownload () {
      if (this.multipleSelection.length !== 0) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['序号', '发起人', '投标项目', '项目类型', '专业类别', '请求时间']
          const filterVal = ['number', 'initiator', 'project', 'type', 'domain', 'time']
          const list = this.multipleSelection
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
    accept () {
      this.$message({
        message: '恭喜你，接受成功',
        type: 'success'
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
