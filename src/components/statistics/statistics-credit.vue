<template>
  <div class="statistics-credit">
    <div class="title"><span style="font-size:2rem">资信统计</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <el-tabs type="border-card" v-loading="tabLoading">
      <el-tab-pane :label="i.name" v-for="(i, j) in projectList" :key="j">
        <div style="display:flex; align-items:center; justify-content: space-between;width:95%;height:4rem;margin-left:auto;margin-right:auto">
          <span style="font-size:1.5rem;color:#4d83e7">{{i.name}}提资表</span>
          <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload">导出excel</el-button>
            <el-button type="success">打印</el-button>
          </div>
        </div>
        <el-table :data="i.value.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe fit ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="上传日期" prop="date"></el-table-column>
        <el-table-column label="上传时间" prop="time"></el-table-column>
        <el-table-column label="文件名称" prop="name"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="上传者" prop="source"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="i.value.length">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabLoading: true,
      downloadLoading: false,
      multipleSelection: [],
      currentPage: 1,
      pagesize: 5,
      projectList: []
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      var dataForm = {'conditions': {'aboutUsers': {'searchMethod': 'values', 'values': [this.$cookie.get('user')]}}}
      this.$http.post('http://39.106.34.156:8080/electric-design/getProjectAboutUser', dataForm).then((res) => {
        this.projectList = []
        // alert(1)
        console.log(res.data)
        res.data.forEach((el, index) => {
          this.$http.post('http://39.106.34.156:8080/electric-design/getEventsByMultiConditions', {
            'conditions': {
              'belongToProjectCode': {'searchMethod': 'values', 'values': [el.code]},
              'eventType': {'searchMethod': 'values', 'values': ['provide']}
            }
          }).then((res) => {
            var arr1 = []
            res.data.forEach((el, index) => {
              arr1.push({
                'date': [].concat((el.time.year + 1900), (el.time.month + 1), el.time.date).join('/'),
                'time': [].concat(el.time.hours, el.time.minutes, el.time.seconds).join(':'),
                'name': el.dataName,
                'remark': el.body,
                'source': el.sourceUserName
              })
            })
            this.projectList.push({name: el.name, code: el.code, value: arr1})
            this.tabLoading = false
          }).catch((err) => {
            console.log(err)
          })
        })
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
          const tHeader = ['日期', '时间', '文件名', '备注', '发布者']
          const filterVal = ['date', 'time', 'name', 'remark', 'source']
          const list = xxx
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '业绩统计管理表excel')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics-credit{
     width:90%;
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
</style>
