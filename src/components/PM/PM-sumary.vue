<template>
  <div class="PM-sumary">
   <div class="title"><span>项目信息<i class="icon iconfont icon-iconfontquestion"></i></span></div>
   <div class="clearfix"></div>
   <el-tabs type="border-card">
    <el-tab-pane label="项目汇总">项目汇总</el-tab-pane>
    <el-tab-pane label="发布中">
      <div style="display:flex; align-items:center; justify-content: space-between">
        <span style="font-size:1.5rem;color:#4d83e7">|发布中</span>
          <div>
            <el-button style='margin-right:20px;' type="success" icon="document" @click="handleDownload" v-loading="downloadLoading">导出excel</el-button>
            <el-button  type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe :default-sort = "{prop: 'number', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
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
            <el-button @click="" type="primary" size="small">查看详情</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="投标中">投标中</el-tab-pane>
    <el-tab-pane label="洽谈中">洽谈中</el-tab-pane>
    <el-tab-pane label="投标洽谈">投标洽谈</el-tab-pane>
    <el-tab-pane label="合同执行中">合同执行中</el-tab-pane>
    <el-tab-pane label="合同终止">合同终止</el-tab-pane>
   </el-tabs>
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
  mounted () {
    $('el-table__row el-table__row--striped td').css('background-color', 'red')
  },
  methods: {
    handleDownload () {
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
.PM-sumary{
  padding:4rem;

}
.title{
  font-size:2rem;
  float:left;
  margin-bottom:2rem;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.clearfix{
  clear:both;
  display:block;
  width:0;
  height:0;
}
.el-table__row--striped{
  background-color:blue;
}
</style>
