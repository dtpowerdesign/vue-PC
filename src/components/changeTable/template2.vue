<template>
  <div class="changeTable">
      <el-transfer v-model="value1" :data="data"  @change="handleChange" :titles="['不显示的表头', '显示的表头']" :button-texts="['不显示', '显示']"></el-transfer>
      <div style="margin-top:3rem">
        <el-button @click="confirm()" style="width:100%" type="info">确认</el-button>
        <el-button @click="$router.go(-1)" style="width:100%;margin-left:0;margin-top:1rem" type="success" v-if="$route.path.search('changeTable')!==-1">返回上一级</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    const generateData = _ => {
      var data = []
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfTables', {'tables': ['projects', 'contracts']})
      .then((res) => {
        console.log(res.data)
        for (var i in res.data) {
          data.push({
            'key': i,
            'label': res.data[i].title
          })
        }
      })
      return data
    }
    return {
      data: generateData(),
      value1: ['aboutUsers']
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplainOfTables', {'belongToUser': this.$cookie.get('user'), 'tables': ['contracts', 'projects'], 'otherName': this.$parent.otherName})
      .then((res) => {
        console.log(res.data)
        this.value1 = []
        for (var i in res.data) {
          this.value1.push(i)
        }
        // this.value1 = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    handleChange () {
      console.log(this.value1)
    },
    confirm () {
      var xxx = {}
      xxx[this.$parent.otherName] = this.value1
      this.$http.post(this.$domain.domain1 + 'electric-design/updateTableRecod', {
        'table': 'tableheade',
        'keyNames': ['belongToUser'],
        'keyValues': [this.$cookie.get('user')],
        'newJsonData': xxx
      })
      .then((res) => {
        if (res.data.result) {
          this.$message({
            type: 'success',
            message: '表头修改成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: `表头修改失败原因:${res.data.reason}`
          }).catch((err) => {
            console.log(err)
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
.changeTable{
  width:100%;
}
</style>
