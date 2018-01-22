 
 <template>
  <div class="person-table">
   
      <div style="display:flex; align-items:center; justify-content: space-between;width:95%;height:4rem;margin-left:auto;margin-right:auto">
        <span style="font-size:1.5rem;color:#4d83e7;margin-left:2rem">业绩统计管理表</span>
        <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button type="success">打印</el-button>
        </div>
      </div>
      <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"  stripe fit :default-sort = "{prop: 'code', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="code" label="序号" sortable>
        </el-table-column>
        <el-table-column  prop="name" label="项目名称" >
        </el-table-column>
        <el-table-column  prop="address" label="地点">
        </el-table-column>
        <el-table-column  prop="category" label="类别">
        </el-table-column>
        <el-table-column  prop="type" label="类型">
        </el-table-column>
        <el-table-column  prop="voltagelevel" label="电压等级" sortable>
        </el-table-column>
        <el-table-column  prop="designProcess" label="设计阶段" sortable>
        </el-table-column>
        <el-table-column  prop="major" label="涉及专业" >
        </el-table-column>
        <el-table-column  prop="amountOfInvestment" label="工程投资" sortable>
        </el-table-column>
        <el-table-column  prop="endTime" label="完成时间" sortable>
        </el-table-column>
        <el-table-column  prop="state" label="状态" >
        </el-table-column>
        <el-table-column   label="操作">
          <template slot-scope="adasd">
            <i class="icon iconfont icon-iconfonticonfontjixieqimo"></i><i class="icon iconfont icon-cha"@click="myDelete(adasd.row)"></i>
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
      :total="length">
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
      multipleSelection: [],
      currentPage: 1,
      pagesize: 5
    }
  },
  created () {
  },
  computed: mapState(['table', 'length']),
  methods: {
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
          const tHeader = ['序号', '项目名称', '地点', '类别', '类型', '电压等级', '预计金额', '设计阶段', '涉及专业', '发布日期', '状态']
          const filterVal = ['code', 'name', 'address', 'category', 'type', 'voltagelevel', 'designProcess', 'major', 'amountOfInvestment', 'endTime', 'state']
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
      this.table = this.table.filter(o => o.code !== i.code)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-table{
  box-shadow: .2rem .2rem .2rem #888888;
border-radius:.3rem;
}
.icon{
    font-size:1rem;
    margin-left:1rem;
}
</style>
