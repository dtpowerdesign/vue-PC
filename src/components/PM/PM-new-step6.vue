<template>
  <div>
    <div class="content">
      <el-button @click="publish()">发布</el-button>
    </div>
    <div class="skip">
      <div style="margin-left:2rem" @click="$router.push('/per/PM-new/5')"><i class="icon iconfont icon-zuo"></i><span>上一步</span></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step', 'form', 'qualificationRequirements', 'projectCharacteristics', 'existingData'])
  },
  data () {
    return {}
  },
  methods: {
    publish () {
      var data = {'sourceAccount': this.cookie.get('user'),
        'name': this.form.name,
        'state': this.form.state,
        'sizeAndCapacity': this.form.sizeAndCapacitys,
        'type': this.form.type,
        'category': this.form.categorys,
        'voltagelevel': this.form.voltagelevel,
        'major': [this.form.major],
        'instruction': this.existingData.detail,
        'qualificationRequirements': [{'CET': this.qualificationRequirements.CET}],
        'projectCharacteristics': [{'price': this.projectCharacteristics.price}, {'difficult': this.projectCharacteristics.difficulty}],
        'startTime': this.formatDate(this.form.startTime),
        'endTime': this.formatDate(this.form.endTime)}
      this.$http.post(this.$domain.domain1 + 'electric-design/addProject1', data).then((res) => {
        console.log(res.data)
        if (res.data.result) {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '发布失败',
            type: 'warning'
          })
        }
      }).catch((err) => { console.log(err) })
    },
    formatDate (date) {
      var datee = new Date(date)
      var year = datee.getFullYear()
      var month = datee.getMonth() + 1
      var day = datee.getDate()
      return year + '-' + this.formatTen(month) + '-' + this.formatTen(day)
    },
    formatTen (num) {
      return num > 9 ? (num + '') : ('0' + num)
    },
    ...mapMutations(['init6'])
  },
  mounted () {
    this.init6()
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
</style>
