<template>
  <div>
  <div v-if="show" v-loading="loadingDetail">
    <div class="title"><span>|{{name}}</span><el-button type="primary" @click="show=false">返回</el-button></div>
    <el-row style="margin-top:3rem">
      <el-col :span="8">
       <span class="font1">招标公司</span><br>
       <i class="icon iconfont icon-gongsi"></i><span class="font2">{{tenderCompany}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">项目地点</span><br>
        <i class="icon iconfont icon-didian"></i><span class="font2">{{address}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">发布时间</span><br>
        <i class="icon iconfont icon-riqi"></i><span class="font2">{{startTime}}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top:3rem">
      <el-col :span="8">
       <span class="font1">项目个体性质</span><br>
       <i class="icon iconfont icon-loufang"></i><span class="font2">{{bidType}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">限价</span><br>
        <i class="icon iconfont icon-qian"></i><span class="font2">{{price}}</span>
      </el-col>
      <el-col :span="8">
        <span class="font1">成果交付</span><br>
        <i class="icon iconfont icon-zhuanhuan"></i><span class="font2">{{state}}</span>
      </el-col>
    </el-row>
    <el-row style="margin-top:3rem">
      <el-col :span="14" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">其他信息</span><br>
        <el-row>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">类别:{{category}}</span></el-col>
          <el-col :span="12" ><span class="font1" style="float:left;clear:left;">规模容量:{{voltage}}</span></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">类型:{{type}}</span></el-col>
          <el-col :span="12"><span class="font1" style="float:left;clear:left;">专业要求:{{major}}</span></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-button @click="dialogVisible=true" type="primary">点我邀请</el-button>
    <el-dialog title="添加邀请的人账号" :visible.sync="dialogVisible" width="60%">
      <div style="border-bottom:2px solid #E6A23C;height:300px;overflow: scroll;overflow-x: hidden;">
        <search></search>
        <classify></classify>
        <tag></tag>
        <mycontent></mycontent>
      </div>
      <!-- <el-button type="primary" @click="$router.push('/facilitator')">查找更多用户用户</el-button> -->
      <el-table :data="inviation" style="border-top:2px solid #F56C6C;max-height:300px;overflow: scroll;overflow-x: hidden;">
        <el-table-column label="要邀请人的账号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.ohterUserId"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="赋予的角色">
          <template slot-scope="scope">
           <el-select v-model="scope.row.job">
             <el-option v-for="(i, j) in roles" :key="j" :label="i.value" :value="i.key"></el-option>
           </el-select>
          </template>
        </el-table-column>
        <el-table-column label="金额分配比例(请输入小数)">
          <template slot-scope="scope">
           <el-input v-model="scope.row.moneyRate"></el-input>
          </template>
        </el-table-column>        
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button @click="confirm(scope.row)" type="primary" v-if="scope.row.ustate===''">邀请</el-button>
            <el-button v-if="scope.row.ustate==='waiting'" disabled type="info">等待中</el-button>
            <el-button v-if="scope.row.ustate==='ignored'" disabled type="info">等待中</el-button>
            <el-button v-if="scope.row.ustate==='agreed'" disabled type="success">已同意</el-button>
            <el-button v-if="scope.row.ustate==='refused'" disabled type="danger">已拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="inviation.push({ohterUserId: '', job: '', ustate: ''})" type="success">增加一行</el-button>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
  
  <div v-else v-loading="loadingTable">
   
  <div style="display:flex; align-items:center; justify-content: space-between;background:#F9F9F9;height:4rem">
        <span style="font-size:1.5rem;color:#4d83e7">|我的请求</span>
          <div>
            <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/project')" >表头编辑</el-button>
            <el-button size="small" style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button size="small" type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe :default-sort = "{prop: 'number', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(i, j) in json" :key="j" :prop="j" :label="i.title" :show-overflow-tooltip="j==='name'?false:true" :width="j==='name'?'180':''" :fixed="j==='name'?'left':false"></el-table-column>
        <el-table-column   label="操作" fixed="right" width="85">
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
import search from '@/components/facilitator/search'
import classify from '@/components/facilitator/classify'
import tag from '@/components/facilitator/tag'
import mycontent from '@/components/facilitator/content'
export default {
  components: {top, search, classify, tag, mycontent},
  data () {
    return {
      roles: [{'key': 'master', 'value': '主持人'}, {'key': 'drawer', 'value': '制图者'}, {'key': 'checker', 'value': '校核人'}, {'key': 'auditor', 'value': '审核人'}, {'key': 'projectManager', 'value': '项目经理'}, {'key': 'projectAnalyst', 'value': '平台分析设计师'}, {'key': 'workGenerater', 'value': '工程代理'}],
      inviation: [],
      dialogVisible: false,
      loadingDetail: true,
      loadingTable: true,
      currentPage: 1,
      pagesize: 5,
      downloadLoading: false,
      tableData: [],
      multipleSelection: [],
      show: false,
      code: '',
      name: '',
      tenderCompany: '',
      address: '?',
      startTime: '',
      bidType: '',
      price: '',
      state: '',
      type: '',
      category: '',
      voltage: '',
      major: '',
      json: {},
      jsonAll: {},
      rows: {}
    }
  },
  created () {
    this.initData()
  },
  methods: {
    test (i) {
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfProject').then((res) => {
        this.jsonAll = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'projects', 'otherName': 'project'})
      .then((res) => {
        this.json = {}
        for (var i in res.data) {
          this.json[i] = {
            key: i,
            title: res.data[i]}
        }
      }).catch((err) => {
        console.log(err)
      })
        this.$http.post(this.$domain.domain1 + 'electric-design/getAllUnioProjectsByAccount',
     {'userId': this.$cookie.get('user')})
        .then((res) => {
          this.tableData = []
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {}
              for (var i in this.jsonAll) {
                if (Array.isArray(el[i]) && (i !== 'processRequirements')) {
                  obj[i] = el[i].concat().join(',')
                } else if (i.match(/(Time)$/) && !i.match(/^(all)/) && el[i] !== '暂无数据') {
                  el[i].year = el[i].year || 0
                  el[i].month = el[i].month || 0
                  el[i].date = el[i].date || 0
                  obj[i] = [].concat((el[i].year + 1900), (el[i].month + 1), el[i].date).join('/')
                } else {
                  obj[i] = el[i]
                }
              }
              this.tableData.push(obj)
            })
            this.tableData.forEach((el, index) => {
              console.log(el.code)
              if (el.code === parseInt(i)) {
                this.rows = el
                console.log('aaa')
              }
              this.detail(this.rows)
              this.dialogVisible = true
            })
          }
          this.loadingTable = false
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfProject').then((res) => {
        this.jsonAll = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'projects', 'otherName': 'project'})
      .then((res) => {
        this.json = {}
        for (var i in res.data) {
          this.json[i] = {
            key: i,
            title: res.data[i]}
        }
      }).catch((err) => {
        console.log(err)
      })
        this.$http.post(this.$domain.domain1 + 'electric-design/getAllUnioProjectsByAccount',
     {'userId': this.$cookie.get('user')})
        .then((res) => {
          this.tableData = []
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {}
              for (var i in this.jsonAll) {
                if (Array.isArray(el[i]) && (i !== 'processRequirements')) {
                  obj[i] = el[i].concat().join(',')
                } else if (i.match(/(Time)$/) && !i.match(/^(all)/) && el[i] !== '暂无数据') {
                  el[i].year = el[i].year || 0
                  el[i].month = el[i].month || 0
                  el[i].date = el[i].date || 0
                  obj[i] = [].concat((el[i].year + 1900), (el[i].month + 1), el[i].date).join('/')
                } else {
                  obj[i] = el[i]
                }
              }
              this.tableData.push(obj)
            })
          }
          this.loadingTable = false
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    detail (row) {
      this.show = true
      this.code = row.code
      this.name = row.name
      this.tenderCompany = row.tenderCompany
      this.address = row.address
      this.startTime = row.startTime
      this.price = row.lowestPrice + '-' + row.highestPrice
      this.state = row.state
      this.type = row.type
      this.category = row.category
      this.voltage = row.voltage
      this.major = row.major
      this.bidType = row.bidType
      this.$http.post(this.$domain.domain1 + 'electric-design/searchAllUsersByKeyAndValue', {'value': row.initiator, 'key': 'account'}).then((res) => {
        this.loadingDetail = false
      }).catch((err) => { console.log(err) })
      this.$http.post(this.$domain.domain1 + 'electric-design/getMultRecordByKeysAndValues', {
        'table': 'unionapply',
        'keys': ['belongToProjectCode', 'unionUserId'],
        'values': [this.code, this.$cookie.get('user')]
      })
      .then((res) => {
        this.inviation = res.data
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
      var t1 = []
      for (var i in this.json) {
        t1.push(this.json[i].title)
      }
      var t2 = []
      for (var j in this.json) {
        t2.push(this.json[j].key)
      }
      if (this.multipleSelection.length !== 0) {
        this.downloadLoading = true
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = t1
          const filterVal = t2
          const list = xxx
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '联合体我的请求信息excel')
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
    confirm (row) {
      console.log(this.code)
      this.$http.post(this.$domain.domain1 + 'electric-design/applyToUnion', {
        'belongToProjectCode': this.code,
        'unionUserId': this.$cookie.get('user'),
        'ohterUserId': row.ohterUserId,
        'job': row.job,
        'moneyRate': row.moneyRate
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `邀请发送成功`
          })
          this.inviation.forEach((el, index) => {
            if (el.belongToProjectCode === row.belongToProjectCode) {
              el.ustate = 'waiting'
            }
          })
          console.log(this.inviation)
        } else {
          this.$message({
            type: 'warning',
            message: `邀请失败,原因:${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
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
