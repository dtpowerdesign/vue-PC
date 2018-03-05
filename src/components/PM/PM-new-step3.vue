<template>
  <div>
    <div class="content">
      <div class="content-item">
        <el-col :span="3"><span style="font-size:1.2rem;color:red">基本信息</span></el-col>
        <el-col :offset="2" :span="19">
          <el-row>
            <el-col :span="12"><p class="confirm-p1">所在公司:{{form.company}}</p></el-col>
            <el-col :span="12"><p class="confirm-p1">招标公司:{{form.company}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><p class="confirm-p1">项目名称:{{form.name}}</p></el-col>
            <el-col :span="12"><p class="confirm-p1">目前状态:{{form.state}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><p class="confirm-p1">类型:{{form.type.join(',')}}</p></el-col>
            <el-col :span="12"><p class="confirm-p1">类别:{{form.categorys.join(',')}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><p class="confirm-p1">规模:{{form.sizeAndCapacitys}}{{form.unit}}</p></el-col>
            <el-col :span="12"><p class="confirm-p1">电压等级:{{form.voltagelevel}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><p class="confirm-p1">开始时间:{{$formDate.formatDate(form.startTime)}}</p></el-col>
            <el-col :span="12"><p class="confirm-p1">结束时间:{{$formDate.formatDate(form.endTime)}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><p class="confirm-p1">设计阶段:{{form.designState}}</p></el-col>
          </el-row>
        </el-col>
      </div>
    </div>
    <div class="content">
      <div class="content-item">
        <el-col :span="3"><span style="font-size:1.2rem;color:red">资质要求</span></el-col>
        <el-col :offset="2" :span="19">
          <el-row>
            <el-col :span="24"><p class="confirm-p2">投标个体性质:{{form.character}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><p class="confirm-p2">工程造价:{{form.lowPrice}}(最低){{form.highPrice}}(最高)</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><p class="confirm-p2">付款方式:{{form.paymentMethods}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><p class="confirm-p2">业绩要求:{{form.performanceReq}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><p class="confirm-p2">所需资质:{{form.aptitude}}</p></el-col>
          </el-row>
          <el-row>
            <el-col :span="24"><p class="confirm-p2">是否接受联合投标:{{form.isAcceptJointBid}}</p></el-col>
          </el-row>
        </el-col>
      </div>
    </div>
    <div class="content">
      <div class="content-item">
        <el-col :span="3"><span style="font-size:1.2rem;color:red">设计结果</span></el-col>
        <el-col :offset="2" :span="19">
          <el-table :data="form.stateUnits" stripe>
            <el-table-column prop="state" label="设计阶段"></el-table-column>
            <el-table-column  label="交付时间">
              <template slot-scope="scope">
                <span>{{$formDate.formatDate(scope.row.endTime)}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="requireResult" label="要求成果"></el-table-column>
          </el-table>
        </el-col>
      </div>
    </div>
    <div><el-button type="primary" @click="dialogVisible = true">我是替别人填写的</el-button><el-button type="success" @click="confirm">我自己发布的</el-button></div>
    <el-dialog title="选择被帮助者" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="helped" multiple filterable :multiple-limit="limit" allow-create default-first-option placeholder="请选择">
        <el-option v-for="(i, j) in helpeds" :key="j" :label="i" :value="i"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="helpConfirm()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="skip">
      <div style="margin-left:2rem" @click="$router.push('/per/PM-new/2')"><i class="icon iconfont icon-zuo"></i><span>上一步</span></div>
      <div style="margin-right:2rem" @click="confirm()"><span>完成</span><i class="icon iconfont icon-you"></i></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step', 'form'])
  },
  data () {
    return {
      dialogVisible: false,
      limit: 1,
      helpeds: ['18730273658', '1802528291@qq.com'],
      helped: []
    }
  },
  methods: {
    confirm () {
      var stateUnits = []
      this.form.stateUnits.forEach((el, index) => {
        stateUnits.push({
          'state': el.state,
          'endTime': this.$formDate.formatDate(el.endTime),
          'requireResult': el.requireResult
        })
      })
      var data = {'sourceAccount': this.cookie.get('user'),
        'tenderCompany': this.form.company,
        'name': this.form.name,
        'state': this.form.state,
        'sizeCapacityNumber': this.form.sizeAndCapacitys,
        'sizeAndCapacity': this.form.unit,
        'bidType': this.form.character,
        'type': this.form.type,
        'category': this.form.categorys,
        'voltagelevel': this.form.voltagelevel1 + '/' + this.form.voltagelevel2 + '/' + this.form.voltagelevel3,
        'major': this.form.major,
        'address': this.form.place,
        'performanceRequirements': this.form.performanceReq1 + '/数量要求:' + this.form.performanceReq2,
        'designProcess': this.form.designState,
        'amountOfInvestment': this.form.lowPrice + '-' + this.form.highPrice,
        'lowestPrice': this.form.lowPrice,
        'highestPrice': this.form.highPrice,
        'qualificationRequirements': [{'资质要求': this.form.aptitude}],
        'startTime': this.$formDate.formatDate(this.form.startTime),
        'endTime': this.$formDate.formatDate(this.form.endTime),
        'payMethod': this.form.paymentMethods + '/' + this.form.paymentScale,
        'isAcceptJointBid': this.form.isAcceptJointBid,
        'isJointState': 'true',
        'processRequirements': stateUnits}
      this.$http.post(this.$domain.domain1 + 'electric-design/addProject1', data).then((res) => {
        console.log(data)
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$parent.$parent.$parent.$parent.initData()
        } else {
          this.$message({
            message: `发布失败,原因${res.data.reason}`,
            type: 'warning'
          })
        }
      }).catch((err) => { console.log(err) })
    },
    helpConfirm () {
      var stateUnits = []
      this.form.stateUnits.forEach((el, index) => {
        stateUnits.push({
          'state': el.state,
          'endTime': this.$formDate.formatDate(el.endTime),
          'requireResult': el.requireResult
        })
      })
      var data = {'sourceAccount': this.helped[0],
        'helpedAccount': this.helped[0],
        'helpAccount': this.$cookie.get('user'),
        'tenderCompany': this.form.company,
        'name': this.form.name,
        'state': '临时态',
        'sizeCapacityNumber': this.form.sizeAndCapacitys,
        'sizeAndCapacity': this.form.unit,
        'bidType': this.form.character,
        'type': this.form.type,
        'category': this.form.categorys,
        'voltagelevel': this.form.voltagelevel1 + this.form.voltagelevel2 + this.form.voltagelevel3,
        'major': this.form.major,
        'address': this.form.place,
        'performanceRequirements': this.form.performanceReq1 + '/数量要求:' + this.form.performanceReq2,
        'designProcess': this.form.designState,
        'amountOfInvestment': this.form.lowPrice + '-' + this.form.highPrice,
        'lowestPrice': this.form.lowPrice,
        'highestPrice': this.form.highPrice,
        'qualificationRequirements': [{'资质要求': this.form.aptitude}],
        'startTime': this.$formDate.formatDate(this.form.startTime),
        'endTime': this.$formDate.formatDate(this.form.endTime),
        'payMethod': this.form.paymentMethods + '/' + this.form.paymentScale,
        'isAcceptJointBid': this.form.isAcceptJointBid,
        'processRequirements': stateUnits}
      this.$http.post(this.$domain.domain1 + 'electric-design/addProject1', data).then((res) => {
        console.log(data)
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$parent.$parent.$parent.$parent.initData()
        } else {
          this.$message({
            message: `发布失败,原因${res.data.reason}`,
            type: 'warning'
          })
        }
      }).catch((err) => { console.log(err) })
    },
    ...mapMutations(['init3'])
  },
  mounted () {
    this.init3()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skip{
  margin-top:4rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:#4d83e7;
  font-weight:500;
}
.content{
  margin:3rem auto 0 auto;
  width:80%;
  display:flex;
}
.content-item{
  width:100%;
  border-top: 1px solid black;
}
.confirm-p1{
  font-size:1.3rem;
  text-align:left;
  color:#409EFF;
}
.confirm-p2{
  font-size:1.2rem;
  text-align:left;
}
</style>
