 
 <template>
  <div>
   
  <div style="display:flex; align-items:center; justify-content: space-between">
        <span style="font-size:1.5rem;color:#4d83e7">|发布中</span>
          <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button  type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe :default-sort = "{prop: 'number', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
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
            <el-button @click="$router.push('/PM-sumary/informat')" type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>
        
      </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      downloadLoading: false,
      tableData: [
        {number: 1, company: '华北电力公司', name: '二校区网站建设', address: '保定', class: '水处理', type: '规划', voltage: 'MW', amount: '一百万', date: '2018年2月'},
        {number: 2, company: '中国科技集团', name: '量子物理电路', address: '北京', class: '水电', type: '规划', voltage: 'KW', amount: '一千万', date: '2018年1月'},
        {number: 3, company: '中国科技集团', name: '量子物理电路', address: '北京', class: '水电', type: '规划', voltage: 'KW', amount: '一千万', date: '2018年1月'},
        {number: 4, company: '中国科技集团', name: '量子物理电路', address: '北京', class: '水电', type: '规划', voltage: 'KW', amount: '一千万', date: '2018年1月'},
        {number: 5, company: '中国科技集团', name: '量子物理电路', address: '北京', class: '水电', type: '规划', voltage: 'KW', amount: '一千万', date: '2018年1月'}
      ],
      multipleSelection: []
    }
  },
  created () {
    this.$http.get('').then(res => {
      console.log(res)
      this.tableData = res.data
    }).catch(err => {
      console.log(err)
      this.$message({showClose: true,
        message: '网络连接错误',
        type: 'error'
      })
    })
  },
  methods: {
    handleDownload () {
      if (!this.multipleSelection) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['序号', '招标公司', '项目名称', '地点', '类别', '类型', '电压等级', '预计金额', '发布日期']
          const filterVal = ['number', 'company', 'name', 'address', 'class', 'type', 'voltage', 'amount', 'date']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '列表excel')
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

</style>
