<template>
  <div class="upload">
      <div style="display:flex; align-items:center; justify-content: space-between;width:95%;height:4rem;margin-left:auto;margin-right:auto">
        <span style="font-size:1.5rem;color:#4d83e7">文件上传统计表</span>
        <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button type="success">打印</el-button>
        </div>
      </div>
    <el-table :data="data.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe fit ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="上传日期" prop="date"></el-table-column>
        <el-table-column label="上传时间" prop="time"></el-table-column>
        <el-table-column label="文件名称">
          <template slot-scope="scope">
             <span v-for="(i, j) in scope.row.dataFiles" :key="j" style="color:#409EFF" @click="download(i.filePath)">
                {{i.fileName}}
             </span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="上传者" prop="source"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.length">
    </el-pagination>
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
      downloadLoading: false,
      multipleSelection: [],
      currentPage: 1,
      pagesize: 5,
      data: [
          {'date': '2019-01-02', 'time': '09:10', 'dataFiles': [], 'remark': '备注1', 'source': '帅哥'}
      ]
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getEventsByMultiConditions', {
        'conditions': {
          'belongToProjectCode': {'searchMethod': 'values', 'values': [this.id]},
          'eventType': {'searchMethod': 'values', 'values': ['provide', 'request']}
        }
      }).then((res) => {
        console.log(res.data)
        this.data = []
        res.data.forEach((el, index) => {
          this.data.push({
            'date': [].concat((el.time.year + 1900), (el.time.month + 1), el.time.date).join('/'),
            'time': [].concat(el.time.hours, el.time.minutes, el.time.seconds).join(':'),
            'dataFiles': el.dataFiles,
            'remark': el.body,
            'source': el.sourceUserName
          })
        })
        console.log(this.data)
      }).catch((err) => {
        console.log(err)
      })
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
    },
    download (path) {
      window.open(this.$domain.domain1 + 'electric-design/dowloads?fileUrl=' + path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload{
    width:90%;
    margin: 0 auto;
}
.title{
    font-size:2rem;
    color:#409EFF;
    text-align: left;
}
</style>
