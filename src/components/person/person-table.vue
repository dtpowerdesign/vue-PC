 
 <template>
  <div class="person-table">
   
      <div style="display:flex; align-items:center; justify-content: space-between;width:100%;height:4rem;margin-left:auto;margin-right:auto;background:#F9F9F9">
        <span style="font-size:1.3rem;color:#4d83e7;margin-left:1rem">业绩统计管理表</span>
        <div>
            <el-button style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/achievement')">表头编辑</el-button>
            <el-button style='margin-right:20px;' type="primary" @click="$router.push('/per/uploadAchieve')">添加已有业绩</el-button>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload">导出excel</el-button>
            <el-button type="info">打印</el-button>
        </div>
      </div>
      <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe fit :default-sort = "{prop: 'code', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(i, j) in json" :key="j" :prop="j" :label="i.title" :show-overflow-tooltip="j==='name'?false:true" :width="j==='name'?'300':''" :fixed="j==='name'?'left':false"></el-table-column>        
        <el-table-column label="操作" fixed="right" width="85">
          <template slot-scope="adasd">
            <i class="icon iconfont icon-iconfonticonfontjixieqimo" @click="manage(adasd.row)"></i><i class="icon iconfont icon-cha" @click="myDelete(adasd.row)"></i>
          </template>
        </el-table-column>
        
      </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 10, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="table.length">
    </el-pagination>
  </div>
</template>

<script>
import store from '@/vuex/tag.js'
import { mapState } from 'vuex'
export default {
  store,
  data () {
    return {
      downloadLoading: false,
      tableData: [],
      multipleSelection: ['1', '2'],
      currentPage: 1,
      pagesize: 5
    }
  },
  created () {
  },
  computed: mapState(['table', 'length', 'json']),
  methods: {
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel')
          const tHeader = t1
          const filterVal = t2
          const list = xxx
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '业绩统计管理表excel')
          // this.$refs.multipleTable.clearSelection()
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
    myDelete (i) {
      this.$store.state.table = this.table.filter(o => o.code !== i.code)
    },
    manage (row) {
      this.$router.push('/per-project/' + row.code)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-table{
border-radius:.3rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
;
margin-bottom:1rem;
}
.icon{
    font-size:1rem;
    margin-left:1rem;
}
</style>
