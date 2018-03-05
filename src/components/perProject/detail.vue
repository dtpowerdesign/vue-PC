<template>
  <div class="detail"> 
   <div class="title"><span style="font-size:2rem">详细信息</span><i class="icon iconfont icon-iconfontquestion"></i></div>
   <div class="content" style="height:10rem">
     <el-col :span="4">
       <p style="text-align:left;color:#409EFF;font-size:2rem;color:red">基本信息</p>
     </el-col>
     <el-col :offset="2" :span="18">
       <div class="detail-div"><span>项目名称:{{name}}</span><span>当前阶段:{{designProcess}}</span></div>
       <div class="detail-div"><span>编号:{{code}}</span><span>电压等级:{{voltagelevel}}</span></div>
       <div class="detail-div"><span>类别:{{category}}</span><span>专业:{{major}}</span></div>
       <div class="detail-div"><span>状态:{{state}}</span><span>类型:{{type}}</span></div>
       <div class="detail-div"><span>开始时间:{{startTime}}</span><span>结束时间:{{endTime}}</span></div>
     </el-col>
   </div>
   <div class="content" style="overflow:auto">
     <el-col :span="4">
       <p style="text-align:left;color:#409EFF;font-size:2rem;color:red">资质要求</p>
     </el-col>
     <el-col :offset="2" :span="18">
       <div class="detail-div"><span>投标个体性质:{{bidType}}</span><span>工程限价:{{lowestPrice}}-{{highestPrice}}</span></div>
       <div class="detail-div"><span>付款方式:{{payMethod}}</span><span>业绩要求:{{performanceRequirements}}</span></div>
     </el-col>
   </div>
   <div class="content" style="overflow:auto">
     <el-col :span="4">
       <p style="text-align:left;color:#409EFF;font-size:2rem;color:red">修改项目信息</p>
     </el-col>
     <el-col :offset="2" :span="2">
      <el-button @click="$router.push('/per-project/' + id + '/alter')" type="success">修改项目信息</el-button>
     </el-col>
   </div>   
   <div class="content" style="overflow:auto">
     <el-col :span="4">
       <p style="text-align:left;color:#409EFF;font-size:2rem;color:red">上传文件</p>
     </el-col>
     <el-col :offset="2" :span="2">
      <el-button @click="$router.push('/per-project/' + id + '/file')" type="success">查看文件详情</el-button>
     </el-col>
   </div>
   <div class="content" style="overflow:auto">
     <el-col :span="4">
       <p style="text-align:left;color:#409EFF;font-size:2rem;color:red">洽谈记录</p>
     </el-col>
     <el-col :offset="2" :span="2">
      <el-button @click="$router.push('/per-project/' + id + '/event')" type="success">查看洽谈记录详情</el-button>
     </el-col>
   </div>
   <div class="content">
     <el-col :span="4">
     <p style="text-align:left;color:#409EFF;font-size:2rem;color:red">设计成果</p>
     </el-col>
     <el-col :offset="2" :span="18">
     <el-table :data="processRequirements">
       <el-table-column prop="state" label="设计阶段"></el-table-column>
       <el-table-column prop="endTime" label="交付时间"></el-table-column>
       <el-table-column prop="requireResult" label="成果要求"></el-table-column>
     </el-table>
     </el-col>
   </div>
  </div>
</template>

<script>
import store from '@/vuex/perProject'
import {mapState} from 'vuex'
export default {
  store,
  data () {
    return {
      name: '',
      code: '',
      state: '',
      voltagelevel: '',
      type: '',
      category: '',
      major: '',
      processRequirements: [],
      designProcess: '',
      startTime: '',
      endTime: '',
      bidType: '',
      lowestPrice: '',
      highestPrice: '',
      payMethod: '',
      performanceRequirements: '',
      qualificationRequirements: []
    }
  },
  computed: {
    ...mapState(['id'])
  },
  mounted () {
    console.log(this.$domain.domain1)
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': this.id}).then((res) => {
        console.log(res.data)
        this.name = res.data.name
        this.code = res.data.code
        this.state = res.data.state
        this.voltagelevel = res.data.voltagelevel
        this.type = res.data.type.join(',')
        this.category = res.data.category.join(',')
        this.major = res.data.major.join(',')
        this.processRequirements = res.data.processRequirements
        this.designProcess = res.data.designProcess
        this.startTime = [].concat((res.data.startTime.year + 1900), (res.data.startTime.month + 1), res.data.startTime.date).join('/')
        this.endTime = [].concat((res.data.endTime.year + 1900), (res.data.endTime.month + 1), res.data.endTime.date).join('/')
        this.bidType = res.data.bidType
        this.lowestPrice = res.data.lowestPrice
        this.highestPrice = res.data.highestPrice
        this.payMethod = res.data.payMethod
        this.performanceRequirements = res.data.performanceRequirements
        this.qualificationRequirements = res.data.qualificationRequirements
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
  width:90%;
  margin:1rem auto;
}
.title{
  border-bottom:1px solid black;
  text-align:left;
}
.icon{
  font-size:2rem;
}
.content{
  border-top:1px solid black;
}
.detail-div{
display:flex;
justify-content:space-around;
font-size:1.5rem;
height:2rem;
}
.detail-div>span{
  width:50%;
text-align:left;
}
</style>
