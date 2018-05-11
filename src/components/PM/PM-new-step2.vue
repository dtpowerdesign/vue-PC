<template>
  <div class="PM-new-step2">
    <div style="margin-top:2rem">
      <el-radio v-model="form.dataOrProject" label="project">项目任务</el-radio> 
      <el-radio v-model="form.dataOrProject" label="data">资料任务</el-radio>
    </div>
    <div class="data" v-if="form.dataOrProject==='data'">
    <div class="title"><span>任务基本信息</span><a :href="help1" class="help" >不会填?点我</a></div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="100px" style="width:100%"> 
        <el-form-item label="任务名称">
          <el-col :span="9">
            <el-input v-model="form.name"></el-input>
          </el-col>         
          <!-- <el-col :offset="5" :span="5">是否接受联合投标</el-col>
          <el-col :span="5">
           <el-switch v-model="form.isAcceptJointBid" active-text="是" inactive-text="否" inactive-value="false" active-value="true"></el-switch>
          </el-col>               -->
        </el-form-item>
        <el-form-item label="发布公司">
          <el-col :span="9">
            <el-input v-model="form.company"></el-input>
          </el-col>
          <el-col class="line" :offset="5" :span="2">类别</el-col>
          <el-col :span="8">
            <el-select v-model="form.categorys" placeholder="请选择类别" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in categorys" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="即时发布">
          <el-col :span="9">
            <el-select v-model="form.state"  placeholder="请选择" style="width:100%">
            <el-option v-for="(i,j) in states" :key="j" :label="i.label" :value="i.value"></el-option>
          </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-col :span="9">
            <el-select v-model="form.type" multiple placeholder="请选择类型" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in type" :key="j" :label="i" :value="i"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="5" :span="2">涉及专业</el-col>
          <el-col :span="8">
            <el-select v-model="form.major" multiple placeholder="请选择涉及专业" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in major" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-col :span="9">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>          
          <el-col :offset="5" :span="2">结束时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input  v-model="form.instruction" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目描述"></el-input>
        </el-form-item>        
        <el-form-item label="项目要求">
          <el-input  v-model="form.requirement" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目要求"></el-input>
        </el-form-item>                
      </el-form>
    </div>      
    <div class="title">付款相关<a :href="help3" class="help">不会填?点我</a></div>
    <div class="content">
      <el-form :model="form" label-width="180px" style="width:100%">
        <el-form-item label="付款方式/付款比例">
          <el-col :span="12" style="display:flex;justify-content:space-between">
            <el-select v-model="form.paymentMethods" placeholder="选择" style="width:40%">
              <el-option v-for="(i,j) in paymentMethods" :key="j" :value="i" :label="i"></el-option>
            </el-select>
            <el-select v-model="form.paymentScale" placeholder="自填或选择" style="width:40%" filterable allow-create default-first-option>
              <el-option v-for="(i,j) in paymentScale" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-switch v-model="form.hasInvoice" active-text="有发票(未选择时默认为无发票)" inactive-text="" active-value="yes" inactive-value="no"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="付款描述">
          <el-input v-model="form.payDiscible" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入付款描述"></el-input>
        </el-form-item>
      </el-form>
    </div>
    </div>
    <div v-else>
    <div class="title"><span>任务基本信息</span><a :href="help1" class="help">不会填?点我</a></div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="100px" style="width:100%"> 
        <el-form-item label="项目名称">
          <el-col :span="9">
            <el-input v-model="form.name"></el-input>
          </el-col>         
          <el-col :offset="5" :span="5">是否接受联合投标</el-col>
          <el-col :span="5">
           <el-switch v-model="form.isAcceptJointBid" active-text="是" inactive-text="否" inactive-value="false" active-value="true"></el-switch>
          </el-col>              
        </el-form-item>
        <el-form-item label="发布公司">
          <el-col :span="9">
            <el-input v-model="form.company"></el-input>
          </el-col>
          <el-col class="line" :offset="5" :span="2">类别</el-col>
          <el-col :span="8">
            <el-select v-model="form.categorys" placeholder="请选择类别" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in categorys" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="即时发布">
          <el-col :span="4">
            <el-select v-model="form.state"  placeholder="请选择" >
            <el-option v-for="(i,j) in states" :key="j" :label="i.label" :value="i.value"></el-option>
          </el-select>
          </el-col>
          <el-col class="line" :span="1">规模</el-col>
          <el-col :span="4">
            <el-input v-model="form.sizeAndCapacitys" placeholder="请输入规模的数值" type="number"></el-input>
          </el-col>
          <el-col :span="4">
            <el-select v-model="form.unit"  placeholder="请选择单位" >
            <el-option v-for="(i,j) in unit" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="0" :span="3">委托设计阶段</el-col>
          <el-col :span="8">
            <el-select v-model="form.designState" style="width:100%" multiple filterable allow-create default-first-option @input="initStateUnits">
              <el-option v-for="(i, j) in designState" :key="j"  :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="类型">
          <el-col :span="9">
            <el-select v-model="form.type" multiple placeholder="请选择类型" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in type" :key="j" :label="i" :value="i"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="5" :span="2">涉及专业</el-col>
          <el-col :span="8">
            <el-select v-model="form.major" multiple placeholder="请选择涉及专业" style="width:100%" filterable allow-create default-first-option>
            <el-option v-for="(i,j) in major" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="电压等级">
          <el-col :span="9">
            <el-select v-model="form.voltagelevel1" style="width:30%">
              <el-option v-for="(i,j) in voltagetype" :key="j" :label="i" :value="i"></el-option>
            </el-select>
            <el-input v-model="form.voltagelevel2" style="width:35%" type="number"></el-input>
            <el-select v-model="form.voltagelevel3" placeholder="请选择电压等级" style="width:30%">
              <el-option v-for="(i,j) in voltagelevel" :key="j" :label="i" :value="i"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="5" :span="2">开始时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="项目地点">
          <el-col :span="9">
            <el-input v-model="form.place"></el-input>
          </el-col>
          <el-col :offset="5" :span="2">结束时间</el-col>
          <el-col :span="8">
            <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="委托费限价">
          <el-col :span="9">
          <el-input v-model="form.lowPrice" placeholder="最低" style="width:30%;"></el-input>
          <span>/万元</span>
          <span style="font-size:1.2rem;color:red">到</span>
          <el-input v-model="form.highPrice" placeholder="最高" style="width:30%;"></el-input>
          <span>/万元</span>
          </el-col>       
          <el-col :offset="5" :span="2">目前状态</el-col>
          <el-col :span="8">
            <el-select v-model="form.projectNowState" style="width:100%">
              <el-option v-for="(i, j) in projectNowStates"  :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>          
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input  v-model="form.instruction" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目描述"></el-input>
        </el-form-item>        
        <el-form-item label="项目要求">
          <el-input  v-model="form.requirement" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入项目要求"></el-input>
        </el-form-item>                
      </el-form>
    </div>
    <div class="title"><span>项目资质要求</span><a :href="help2" class="help">不会填?点我</a></div>
    <div class="content">
      <el-form :model="form" label-width="140px" style="width:100%">
        <el-form-item label="接标个体性质">
          <el-col :span="9">
          <el-select v-model="form.character" placeholder="请选择个体性质" style="width:100%">
            <el-option v-for="(i,j) in character" :key="j" :value="i" :label="i"></el-option>
          </el-select>
          </el-col>
          <el-col :offset="2" :span="3">业绩要求</el-col>
          <el-col :span="6">
            <el-select v-model="form.performanceReq1" placeholder="请选择业绩要求" style="width:100%"  filterable allow-create default-first-option>
              <el-option v-for="(i,j) in performanceReq" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
          <!-- <el-col :span="3"></el-col> -->
          <el-col :span="4">
            <el-input v-model="form.performanceReq2" style="width:100%" placeholder="数量要求"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="所需资质">
            <el-input v-model="form.aptitude"></el-input>
            <!-- <el-select v-model="" placeholder="请选择所需资质" style="width:100%">
              <el-option v-for="(i,j) in aptitude" :key="j" :value="i" :label="i"></el-option>
            </el-select>           -->
        </el-form-item>
      </el-form>
    </div>
    <div class="title">付款相关<a :href="help3" class="help">不会填?点我</a></div>
    <div class="content">
      <el-form :model="form" label-width="180px" style="width:100%">
        <el-form-item label="付款方式/付款比例">
          <el-col :span="12" style="display:flex;justify-content:space-between">
            <el-select v-model="form.paymentMethods" placeholder="选择" style="width:40%">
              <el-option v-for="(i,j) in paymentMethods" :key="j" :value="i" :label="i"></el-option>
            </el-select>
            <el-select v-model="form.paymentScale" placeholder="自填或选择" style="width:40%" filterable allow-create default-first-option>
              <el-option v-for="(i,j) in paymentScale" :key="j" :value="i" :label="i"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-switch v-model="form.hasInvoice" active-text="有发票(未选择时默认为无发票)" inactive-text="" active-value="yes" inactive-value="no"></el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="付款描述">
          <el-input v-model="form.payDiscible" type="textarea" :autosize="{ minRows: 4}" placeholder="请输入付款描述"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="title">项目设计成果要求<a :href="help4" class="help">不会填?点我</a></div>
    <div class="content" style="display:block">
      <div style="color:#F56C6C;font-size:1.2rem">注意:项目发布成功后才能上传项目已有文件</div>
      <el-form :model="form" label-width="80px" style="width:100%">
        <!-- <el-radio v-model="radio" label="1">平台推荐</el-radio>
        <el-radio v-model="radio" label="2">自定义</el-radio> -->
        <el-table :data="form.stateUnits" stripe style="margin-top:2rem">
          <el-table-column label="设计阶段" min-width="18%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.state">
                <el-option v-for="(i, j) in designState" :key="j" :label="i" :value="i"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="开始时间" min-width="18%">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.startTime" :disabled="disabled" type="date" placeholder="选择日期"></el-date-picker>
            </template>
          </el-table-column>          
          <el-table-column label="结束时间" min-width="18%">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.endTime" :disabled="disabled" type="date" placeholder="选择日期"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="要求成果" min-width="36%">
            <template slot-scope="scope">
              <el-input type="textarea" autosize :disabled="disabled" v-model="scope.row.requireResult"></el-input>  
            </template>            
          </el-table-column>
          <el-table-column label="操作" min-width="10%">
             <template slot-scope="scope">
               <el-button type="primary"  size="small" @click="myDelete(scope.row)">
                 <i class="icon iconfont icon-cha" style="font-size:1rem;color:white" ></i>
                 </el-button>
             </template>
          </el-table-column>
        </el-table>
        <!-- <el-button type="primary" @click="addStateUnits()">增加设计阶段</el-button> -->
      </el-form>
    </div>
    </div>
    <div class="skip">
      <div style="margin-left:2rem" @click="$router.push('/per/PM-new')"><i class="icon iconfont icon-zuo"></i><span>上一步</span></div>
      <div style="margin-right:2rem" @click="$router.push('/per/PM-new/3')"><span>下一步</span><i class="icon iconfont icon-you"></i></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step', 'form', 'states', 'designState', 'type', 'categorys', 'sizeAndCapacitys', 'voltagelevel', 'voltagetype', 'major', 'unit', 'character', 'performanceReq', 'priceType', 'aptitude', 'paymentMethods', 'paymentScale', 'projectNowStates'])
  },
  data () {
    return {
      help1: this.$domain.domain1 + 'electric-design/public/templets/taskbasemsg.html',
      help2: this.$domain.domain1 + 'electric-design/public/templets/projectrequriment.html',
      help3: this.$domain.domain1 + 'electric-design/public/templets/payabout.html',
      help4: this.$domain.domain1 + 'electric-design/public/templets/resultrequriment.html',
      disabled: false,
      radio: '2'
    }
  },
  methods: {
    ...mapMutations(['init2', 'addStateUnits', 'myDelete', 'initStateUnits'])
  },
  mounted () {
    this.init2()
  },
  watch: {
    radio () {
      if (this.radio === '1') {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    designState () {
      this.$store.state.stateUnits = []
      this.designState.forEach((el, index) => {
        this.$store.state.stateUnits.push(
          { state: el, endTime: '未填', requireResult: '未填' }
        )
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon{
  font-size: 2rem;
}
.skip{
  font-size: 2rem;
  margin-top:4rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:#4d83e7;
  font-weight:500;
}
.help{
  margin-left:1rem;
  color:#409EFF;
  font-size: 1rem;
}
.title{
  display:flex;
  justify-content:flex-start;
  width:80%;
  margin:1rem auto 0 auto;
  font-weight:400;
  font-size:1.5rem;
  border-bottom: 1px solid black;
  align-items: center;
}
.content{
  margin:1rem auto 0 auto;
  width:80%;
  display:flex;
}
</style>
