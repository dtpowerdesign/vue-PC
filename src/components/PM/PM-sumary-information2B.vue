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
      <el-col :span="12" :offset="2">
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
      <el-col :span="6" :offset="2">
        <span style="font-size:0.8rem;float:left;clear:left;">发布人信息</span><br>
        <p class="font1" style="text-align:left" v-html="info"></p>
      </el-col>
    </el-row>
    <el-button type="success" @click="$router.push('/per-project/' + code + '/pandect')">项目信息</el-button>
    <el-button type="primary" @click="dialogVisible=true" v-if="sourceAccount===$cookie.get('user')">查看投标信息</el-button>
    <el-dialog title="投标人信息" :visible.sync="dialogVisible" width="60%">
      <el-tabs type="card">
        <el-tab-pane label="个体投标">
          <el-table :data="bid.personalBidAccounts" border>
            <el-table-column label="投标人账号" prop="srcUserAccount" min-width="10%"></el-table-column>
            <el-table-column label="投标人姓名" prop="srcUserName" min-width="10%"></el-table-column>
            <el-table-column label="投标描述" prop="bidInstruction" min-width="30%"></el-table-column>
            <el-table-column label="投标附件" min-width="40%">
              <template slot-scope="scope">
                <span v-for="(i, j) in scope.row.upDatas" :key="j">
                  <el-tooltip class="item" effect="dark" content="点击下载" placement="top-start">
                    <a href="#" @click="download(i.urlPath, i.dataName)">  
                      {{i.dataName}}
                    </a>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="选取中标者" min-width="10%">
              <template slot-scope="scope">
                <el-button type="success" @click="confirmBid(scope.row)">选我</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="企业投标">
          <el-table :data="bid.tenderCompanyBidAccounts" border>
            <el-table-column label="投标企业账号" prop="srcUserAccount" min-width="10%"></el-table-column>
            <el-table-column label="投标企业名称" prop="srcUserName" min-width="10%"></el-table-column>
            <el-table-column label="投标描述" prop="bidInstruction" min-width="30%"></el-table-column>
            <el-table-column label="投标附件" min-width="40%">
              <template slot-scope="scope">
                <span v-for="(i, j) in scope.row.upDatas" :key="j">
                  <el-tooltip class="item" effect="dark" content="点击下载" placement="top-start">
                    <a href="#" @click="download(i.urlPath, i.dataName)">  
                      {{i.dataName}}
                    </a>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="选取中标者" min-width="10%">
              <template slot-scope="scope">
                <el-button type="success" @click="confirmBid(scope.row)">选我</el-button>
              </template>
            </el-table-column>
          </el-table>          
        </el-tab-pane>
        <el-tab-pane label="联合体投标" v-if="bid.isAcceptJointBid==='true'">
          <el-table :data="bid.jointReleaseAccounts" border>
            <el-table-column label="联合体成员账号" prop="srcUserAccount" min-width="20%"></el-table-column>
            <el-table-column label="联合投标账号" prop="srcUser" min-width="10%"></el-table-column>
            <el-table-column label="联合投标姓名" prop="srcUserName" min-width="10%"></el-table-column>
            <el-table-column label="投标描述" prop="bidInstruction" min-width="30%"></el-table-column>
            <el-table-column label="投标附件" min-width="20%">
              <template slot-scope="scope">
                <span v-for="(i, j) in scope.row.upDatas" :key="j">
                  <el-tooltip class="item" effect="dark" content="点击下载" placement="top-start">
                    <a href="#" @click="download(i.urlPath, i.dataName)">  
                      {{i.dataName}}
                    </a>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="选取中标者" min-width="10%">
              <template slot-scope="scope">
                <el-button type="success" @click="confirmBid(scope.row)">选我</el-button>
              </template>
            </el-table-column>
          </el-table>          
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
  <div v-else v-loading="loadingTable">
   
  <div style="display:flex; align-items:center; justify-content: space-between; background:#F9F9F9;height:4rem">
        <span style="font-size:1.5rem;color:#4d83e7">|投标中</span>
          <div>
            <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/ptoubiao')" >表头编辑</el-button>
            <el-button size="small" style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button size="small" type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe :default-sort = "{prop: 'code', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(i, j) in json" :key="j" :prop="i.key" :label="i.title" :show-overflow-tooltip="i.key==='name'?false:true" :width="i.key==='name'?'180':''" :fixed="i.key==='name'?'left':false"></el-table-column>
        <el-table-column   label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button @click="cancel(scope.row)" type="danger" size="small" style="width:100%;margin-left:0">撤标</el-button>
            <el-button @click="detail(scope.row)" type="success" size="small" style="width:100%;margin-left:0">查看详情</el-button>
            <el-button @click="skip({'account':scope.row.sourceAccount, 'name':scope.row.sourceName})" type="primary" size="small" style="width:100%;margin-left:0">和招标人聊天</el-button>
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
      radio: [],
      sourceAccount: '',
      bid: {},
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
      address: '',
      startTime: '',
      bidType: '',
      price: '',
      state: '',
      type: '',
      category: '',
      voltage: '',
      major: '',
      info: '',
      json: [],
      jsonAll: {}
    }
  },
  created () {
    this.initData()
  },
  methods: {
    skip (row) {
      this.$router.push('/chat/contact')
      this.$nextTick(() => {
        this.$one.$emit('skipChat', row)
      })
    },
    initData () {
      this.tableData = []
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfProject').then((res) => {
        this.jsonAll = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'projects', 'otherName': 'ptoubiao'})
      .then((res) => {
        // console.log(res.data)
        this.json = []
        for (var i in res.data) {
          this.json.push({
            key: i,
            title: res.data[i]})
        }
        // console.log(this.json)
      }).catch((err) => {
        console.log(err)
      })
        var formData = {'conditions': {'state': {'searchMethod': 'values', 'values': ['投标中']}, 'aboutUsers': {'searchMethod': 'values', 'values': [this.$cookie.get('user')]}}}
        this.$http.post(this.$domain.domain1 + 'electric-design/getProjectAboutUser', formData)
        .then((res) => {
          this.tableData = []
          var array = res.data.filter((i) => i.sourceAccount !== this.$cookie.get('user'))
          if (array !== 0) {
            array.forEach((el, index) => {
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
      this.sourceAccount = row.sourceAccount
      this.bid.jointReleaseAccount = row.jointReleaseAccount
      this.bid.isAcceptJointBid = row.isAcceptJointBid
      this.$http.post(this.$domain.domain1 + 'electric-design/getMultRecordByKeysAndValues', {'table': 'biders', 'keys': ['belongToProjectCode'], 'values': [row.code]})
      .then((res) => {
        console.log(res.data)
        this.bid.personalBidAccounts = []
        this.bid.tenderCompanyBidAccounts = []
        this.bid.jointReleaseAccounts = []
        // res.data.forEach((el, index) => {
        //   if (el.bidType === 'unit') {
        //     this.bid.jointReleaseAccounts.push(el)
        //     this.bid.jointReleaseAccounts[0].srcUser = this.bid.jointReleaseAccounts[0].srcUserAccount
        //     this.bid.jointReleaseAccounts[0].srcUserAccount = this.bid.finalBid
        //   } else {
        //     if (el.srcUserType === 'puser') {
        //       this.bid.personalBidAccounts.push(el)
        //     } else {
        //       this.bid.tenderCompanyBidAccounts.push(el)
        //     }
        //   }
        // })
      }).catch((err) => {
        console.log(err)
      })
      this.$http.post(this.$domain.domain1 + 'electric-design/searchAllUsersByKeyAndValue', {'value': row.sourceAccount, 'key': 'account'}).then((res) => {
        this.info = `姓名:${res.data[0].name}<br>账号:${res.data[0].account}<br>邮箱:${res.data[0].email}`
        this.loadingDetail = false
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
          export_json_to_excel(tHeader, data, '项目投标中信息excel')
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
    confirmBid (row) {
      // console.log(this.radio)
      this.$confirm(`您确定让${row.srcUserName}中标吗`, '确定后无法修改', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post(this.$domain.domain1 + 'electric-design/updateProjectByProjectCode', {'code': this.code, 'data': {'state': '洽谈中', 'toAccounts': Array.isArray(row.name) ? row.name : [row.srcUserAccount]}})
        .then((res) => {
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: `${row.srcUserName}已经中标`
            })
            this.dialogVisible = false
            this.$router.go(0)
          } else {
            this.$message({
              type: 'warning',
              message: `操作失败，原因${res.data.reason}`
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    download (path, name) {
      // window.open(this.$domain.domain1 + 'electric-design/dowloads?fileUrl=' + path)
      this.$http.post(this.$domain.domain1 + 'electric-design/dowload', {'fileUrl': path}, {'responseType': 'blob'})
      .then((res) => {
        let url = window.URL.createObjectURL(new Blob([res.data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    cancel (row) {
      this.$http.post(this.$domain.domain1 + 'electric-design/changeBidUser', {'belongToProjectCode': row.code, 'sourceUserId': this.$cookie.get('user'), data: {'bidState': 'cancel'}})
      .then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '撤标成功'
          })
          this.initData()
        } else {
          this.$message({
            type: 'warning',
            message: `您不是该项目投标发起人，无权进行此操作`
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
