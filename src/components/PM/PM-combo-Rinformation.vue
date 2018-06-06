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
       <span class="font1">设计院</span><br>
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
      <el-col :span="6" :offset="0">
        <p class="font1" style="text-align:left;color:#409EFF"><span>联合体发起人账号:{{inviation.unionUserId}}</span></p>
        <p class="font1" style="text-align:left;color:#409EFF"><span>联合体发起人名字:{{inviation.unionUserName}}</span></p>
        <p class="font1" style="text-align:left;color:#409EFF"><span>我承担的角色:{{inviation.job}}</span></p>
        <p class="font1" style="text-align:left;color:#409EFF"><span>我承担的角色:{{inviation.moneyRate}}</span></p>
      </el-col>
    </el-row>
    <el-button type="warning" style="margin-top:5rem" @click="ignore()">忽略</el-button>
    <el-button type="danger" style="margin-top:5rem" @click="refuse()">残忍拒绝</el-button>
    <el-button type="success" style="margin-top:5rem" @click="accept()">果断加入</el-button>
  </div>  
  <div v-else v-loading="loadingTable">
   
  <div style="display:flex; align-items:center; justify-content: space-between; background:#F9F9F9;height:4rem">
        <span style="font-size:1.5rem;color:#4d83e7">|收到请求</span>
          <div>
            <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/project')" >表头编辑</el-button>
            <el-button size="small" style='margin-right:20px;' type="success" icon="document" @click="handleDownload" >导出excel</el-button>
            <el-button size="small" type="success">打印</el-button>
          </div>
      </div>
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" stripe :default-sort = "{prop: 'number', order: 'descending'}" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" v-loading="downloadLoading">
        <el-table-column type="selection" ></el-table-column>
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
export default {
  data () {
    return {
      loadingDetail: true,
      loadingTable: true,
      currentPage: 1,
      pagesize: 5,
      downloadLoading: false,
      tableData: [],
      multipleSelection: [],
      code: '',
      ucode: '',
      show: false,
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
      json: {},
      jsonAll: {},
      inviation: {}
    }
  },
  created () {
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
      this.$http.post(this.$domain.domain1 + 'electric-design/getunionInviteProjects',
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
              this.$set(obj, 'ucode', el.ucode)
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
  methods: {
    detail (row) {
      console.log(row)
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
      this.ucode = row.ucode
      this.$http.post(this.$domain.domain1 + 'electric-design/searchAllUsersByKeyAndValue', {'value': row.initiator, 'key': 'account'}).then((res) => {
        this.loadingDetail = false
      }).catch((err) => { console.log(err) })
      this.$http.post(this.$domain.domain1 + 'electric-design/getMultRecordByKeysAndValues', {
        'table': 'unionapply',
        'keys': ['code'],
        'values': [this.ucode]
      })
      .then((res) => {
        this.inviation = res.data[0]
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
          export_json_to_excel(tHeader, data, '联合体收到请求信息excel')
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
    accept () {
      this.$http.post(this.$domain.domain1 + 'electric-design/agreeToUnion', {'code': this.ucode})
      .then((res) => {
        // console.log(res.data)
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `成功接收邀请`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `失败原因:${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    refuse () {
      this.$http.post(this.$domain.domain1 + 'electric-design/updateUnionApply', {'code': this.ucode, 'ustate': 'refused'})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `成功拒绝邀请`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `失败原因:${res.data.reason}`
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    ignore () {
      this.$http.post(this.$domain.domain1 + 'electric-design/updateUnionApply', {'code': this.ucode, 'ustate': 'ignored'})
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: `成功忽略邀请`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `失败原因:${res.data.reason}`
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
