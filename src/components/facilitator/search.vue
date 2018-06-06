<template>
  <div class="search">
   <el-input
    placeholder="搜索你感兴趣的用户"
    @keyup.enter.native="mySearch()"
    v-model="search">
    <i slot="suffix" class="el-input__icon el-icon-search" @click="mySearch()" ></i>
  </el-input>
  </div>
</template>

<script>
import store from '@/vuex/facilitator.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  data () {
    return {
      search: '',
      jsonAllPuser: {},
      jsonAllCuser: {}
    }
  },
  computed: mapState(['tablePuser', 'tableCuser']),
  methods: {
    mySearch () {
      this.$parent.loadingContent = true
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfPuser').then((res) => {
        this.jsonAllPuser = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'pusers', 'otherName': 'puserHeade'})
      .then((res) => {
        this.$store.state.jsonPuser = []
        for (var i in res.data) {
          this.$store.state.jsonPuser.push({
            key: i,
            title: res.data[i]})
        }
      }).catch((err) => {
        console.log(err)
      })
        var formDataPuser = {'table': 'pusers', 'value': this.search}
        this.$http.post(this.$domain.domain1 + 'electric-design/searchTableByValue', formDataPuser)
        .then((res) => {
          console.log(res.data)
          this.$store.state.tablePuser = []
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {}
              for (var i in this.jsonAllPuser) {
                if (Array.isArray(el[i]) && (i !== 'processRequirements')) {
                  obj[i] = el[i].concat().join(',')
                } else if (i === 'role') {
                  obj[i] = (el[i] === 'puser') ? '个人用户' : '企业用户'
                } else {
                // if (i.match(/(Time)$/) && !i.match(/^(all)/) && el[i] !== '暂无数据' && i !== 'acceptableTravelTime') {
                //   el[i].year = el[i].year || 0
                //   el[i].month = el[i].month || 0
                //   el[i].date = el[i].date || 0
                //   obj[i] = [].concat((el[i].year + 1900), (el[i].month + 1), el[i].date).join('/')
                // } else
                  obj[i] = el[i]
                }
              }
              this.$store.state.tablePuser.push(obj)
            })
          }
          this.$parent.loadingContent = false
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })

      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfCuser').then((res) => {
        this.jsonAllCuser = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'cusers', 'otherName': 'cuserHeade'})
      .then((res) => {
        this.$store.state.jsonCuser = []
        for (var i in res.data) {
          this.$store.state.jsonCuser.push({
            key: i,
            title: res.data[i]})
        }
      }).catch((err) => {
        console.log(err)
      })
        var formDataCuser = {'table': 'cusers', 'value': this.search}
        this.$http.post(this.$domain.domain1 + 'electric-design/searchTableByValue', formDataCuser)
        .then((res) => {
          console.log(res.data)
          this.$store.state.tableCuser = []
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {}
              for (var i in this.jsonAllCuser) {
                if (Array.isArray(el[i]) && (i !== 'processRequirements')) {
                  obj[i] = el[i].concat().join(',')
                } else {
                // if (i.match(/(Time)$/) && !i.match(/^(all)/) && el[i] !== '暂无数据' && i !== 'acceptableTravelTime') {
                //   el[i].year = el[i].year || 0
                //   el[i].month = el[i].month || 0
                //   el[i].date = el[i].date || 0
                //   obj[i] = [].concat((el[i].year + 1900), (el[i].month + 1), el[i].date).join('/')
                // } else
                  obj[i] = el[i]
                }
              }
              this.$store.state.tableCuser.push(obj)
            })
          }
          this.$parent.loadingContent = false
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    ...mapMutations([
      'add'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search{
    width:80%;
    text-align:center;
}
.el-icon-search{
    font-size:1.5rem;
}
</style>
