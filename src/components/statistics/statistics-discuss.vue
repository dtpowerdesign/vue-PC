<template>
  <div class="statistics-discuss">
    <div class="title"><span style="font-size:1.5rem">洽谈统计</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <el-tabs type="border-card" v-loading="tabLoading">
      <el-tab-pane :label="i.name" v-for="(i, j) in projectList" :key="j">
        <div style="display:flex; align-items:center; justify-content: space-between;height:4rem;margin-left:auto;margin-right:auto;background:#F9F9F9">
          <span style="font-size:1.5rem;color:#4d83e7">{{i.name}}洽谈表</span>
          <div>
            <el-button size="small" style='margin-right:20px;' type="success" icon="document" @click="handleDownload">导出excel</el-button>
            <el-button size="small" type="success">打印</el-button>
          </div>
        </div>
    <el-table :data="i.value.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe fit ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="上传时间" prop="time"></el-table-column>
        <el-table-column label="文件分类" prop="fileType">
          <template slot-scope="scope">
             <span style="color:#409EFF" @click="download(scope.row.filePath)">
              {{scope.row.fileType}}
             </span>
          </template>
        </el-table-column>        
        <el-table-column label="文件名称">
          <template slot-scope="scope">
             <span style="color:#409EFF" @click="download(scope.row.filePath)">
                {{scope.row.fileName}}
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
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectAboutUser', dataForm).then((res) => {
        this.projectList = []
        res.data.forEach((el, index) => {
          this.$http.post(this.$domain.domain1 + 'electric-design/getEventsByMultiConditions', {
            'conditions': {
              'belongToProjectCode': {'searchMethod': 'values', 'values': [el.code]},
              'eventType': {'searchMethod': 'values', 'values': ['chats', 'chat']}
            }
          }).then((res) => {
            console.log(res.data)
            var arr1 = []
            res.data.forEach((el, index) => {
              el.dataFiles.forEach((el2, index2) => {
                arr1.push({
                  'time': el2.uptime,
                  'fileName': el2.fileName,
                  'fileType': el2.fileType,
                  'filePath': el2.filePath,
                  'remark': el.body,
                  'source': el.sourceUserName
                })
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
          const tHeader = ['时间', '文件类型', '文件名称', '备注', '上传者']
          const filterVal = ['time', 'fileType', 'fileName', 'remark', 'source']
          const list = xxx
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '洽谈表')
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
.statistics-discuss{
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
