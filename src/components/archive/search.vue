<template>
  <div class="search">
   <el-input
    placeholder="搜索你感兴趣的项目或企业"
    @keyup.enter.native="mySearch()"
    v-model="search">
    <i slot="prefix" class="el-input__icon el-icon-search" @click="mySearch()" ></i>
  </el-input>
  </div>
</template>

<script>
import store from '@/vuex/archive.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  data () {
    return {
      search: '',
      jsonAll: {}
    }
  },
  computed: mapState(['table']),
  methods: {
    mySearch () {
      this.$parent.loadingContent = true
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfProject').then((res) => {
        this.jsonAll = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'projects', 'otherName': 'project'})
      .then((res) => {
        this.$store.state.json = {}
        for (var i in res.data) {
          this.$store.state.json[i] = {
            key: i,
            title: res.data[i]}
        }
      }).catch((err) => {
        console.log(err)
      })
        var formData = {'value': this.search}
        this.$http.post(this.$domain.domain1 + 'electric-design/searchProjectsByValue', formData)
        .then((res) => {
          console.log(res.data)
          // var arrData = []
          // res.data.forEach((el, index) => {
          //   if (el.state === '投标中') {
          //     arrData.push(el)
          //   }
          // })
          this.$store.state.table = []
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              if (el.state === '投标中') {
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
                this.$store.state.table.push(obj)
              }
            })
          }
          this.$parent.loadingContent = false
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
      // this.$parent.loadingContent = true
      // var formData = {'value': this.search}
      // this.$http.post(this.$domain.domain1 + 'electric-design/searchProjectsByValue', formData).then((res) => {
      //   this.$store.commit('init')
      //   res.data.forEach((el, index) => {
      //     this.$store.commit('add', el)
      //   })
      //   this.$parent.loadingContent = false
      // }).catch((err) => { console.log(err) })
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
    width:40%;
    text-align:center;
}
.el-icon-search{
    font-size:1.5rem;
}
</style>
