 
 <template>
  <div class="person-table">
   
      <div style="display:flex; align-items:center; justify-content: space-between;width:95%;height:4rem;margin-left:auto;margin-right:auto">
        <span style="font-size:1.5rem;color:#4d83e7;margin-left:2rem">业绩统计管理表</span>
        <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button type="success">打印</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe :default-sort = "{prop: 'number', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="number" label="序号" sortable>
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
        <el-table-column  prop="stage" label="设计阶段" sortable>
        </el-table-column>
        <el-table-column  prop="domain" label="涉及专业" >
        </el-table-column>
        <el-table-column  prop="amount" label="工程投资" sortable>
        </el-table-column>
        <el-table-column  prop="date" label="完成时间" sortable>
        </el-table-column>
        <el-table-column  prop="state" label="状态" >
        </el-table-column>
        <el-table-column   label="操作">
          <template slot-scope="adasd">
            <i class="icon iconfont icon-iconfonticonfontjixieqimo"></i><i class="icon iconfont icon-cha"@click="myDelete(adasd.row)"></i>
          </template>
        </el-table-column>
        
      </el-table>
  </div>
</template>

<script>
import store from '@/vuex/tag.js'
export default {
  store,
  data () {
    return {
      downloadLoading: false,
      tableData: [],
      multipleSelection: []
    }
  },
  created () {
    // this.$http.get('http://localhost:3030/vue-project/person-table.php').then(res => {
    //   this.tableData = res.data
    // }).catch(err => {
    //   console.log(err)
    //   this.$message({showClose: true,
    //     message: '网络连接错误',
    //     type: 'error'
    //   })
    // })
    this.tableData = this.$store.state.table
  },
  methods: {
    handleDownload () {
      if (this.multipleSelection.length !== 0) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['序号', '项目名称', '地点', '类别', '类型', '电压等级', '预计金额', '设计阶段', '涉及专业', '发布日期', '状态']
          const filterVal = ['number', 'name', 'address', 'class', 'type', 'voltage', 'stage', 'domain', 'amount', 'date', 'state']
          const list = this.multipleSelection
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
    myDelete (i) {
      this.tableData = this.tableData.filter(o => o.number !== i.number)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon{
    font-size:1rem;
    margin-left:1rem;
}
</style>
