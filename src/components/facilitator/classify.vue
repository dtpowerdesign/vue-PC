<template>
  <div class="classify">
   <div class="div1">
     <span class="font1">角色:</span><template v-for="i in jobs"><span class="font2"  @click="add1($event)">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">专业:</span><template v-for="i in major"><span class="font2"  @click="add2($event)">{{i}}</span></template>
   </div>   
  </div>
</template>

<script>
import store from '@/vuex/facilitator.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  data () {
    return {
      max: '',
      jobs: [],
      major: [],
      domain: [],
      tags: [],
      jsonAllPuser: {},
      jsonAllCuser: {}
    }
  },
  computed: mapState(['table', 'json']),
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$parent.loadingClassify = true
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataOfClassKey')
        .then((res) => {
          this.jobs = res.data.duties
          this.$parent.loadingClassify = false
        }).catch((err) => {
          console.log(err)
        })
      this.$http.get(this.$domain.domain1 + 'electric-design/getTypeMajors').then((res) => {
        this.major = res.data.majors
      }).catch((err) => {
        console.log(err)
        this.$message({showClose: true,
          message: '网络连接错误',
          type: 'error'
        })
      })
      this.tags = this.$store.state.tags
      this.tag1 = this.$store.state.tag1
      this.tag2 = this.$store.state.tag2
      this.tag3 = this.$store.state.tag3
      this.tag4 = this.$store.state.tag4
      this.tag5 = this.$store.state.tag5
    },
    ...mapMutations([
      'add'
    ]),
    add1 (e) {
      if (this.tags.length < 5) {
        this.tags.push(e.target.innerText)
        this.tag1.push(e.target.innerText)
      } else {
        this.$message({
          message: `最多只能选${this.max}项目`,
          type: 'warning'
        })
      }
    },
    add2 (e) {
      if (this.tags.length < 5) {
        this.tags.push(e.target.innerText)
        this.tag2.push(e.target.innerText)
      } else {
        this.$message({
          message: `最多只能选${this.max}项目`,
          type: 'warning'
        })
      }
    },
    add3 (e) {
      if (this.tags.length < 5) {
        this.tags.push(e.target.innerText)
        this.tag3.push(e.target.innerText)
      } else {
        this.$message({
          message: `最多只能选${this.max}项目`,
          type: 'warning'
        })
      }
    },
    add4 (e) {
      if (this.tags.length < 5) {
        this.tags.push(e.target.innerText)
        this.tag4.push(e.target.innerText)
      } else {
        this.$message({
          message: `最多只能选${this.max}项目`,
          type: 'warning'
        })
      }
    },
    add5 (e) {
      if (this.tags.length < 5) {
        this.tags.push(e.target.innerText)
        this.tag5.push(e.target.innerText)
      } else {
        this.$message({
          message: `最多只能选${this.max}项目`,
          type: 'warning'
        })
      }
    }
  },
  watch: {
    tags () {
      this.$parent.loadingContent = true
      var formData = {'conditions': {'jobs': {'searchMethod': 'values', 'values': this.tag1}, 'major': {'searchMethod': 'values', 'values': this.tag2}}}
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfPuser').then((res) => {
        this.jsonAllPuser = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'pusers', 'otherName': 'puserHeade'})
      .then((res) => {
        this.$store.state.jsonPuser = {}
        for (var i in res.data) {
          this.$store.state.jsonPuser[i] = {
            key: i,
            title: res.data[i]}
        }
      }).catch((err) => {
        console.log(err)
      })
        this.$http.post(this.$domain.domain1 + 'electric-design/getPusersByMultiConditions', formData)
        .then((res) => {
          this.$store.state.tablePuser = []
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {}
              for (var i in this.jsonAllPuser) {
                if (Array.isArray(el[i]) && (i !== 'processRequirements')) {
                  obj[i] = el[i].concat().join(',')
                } else {
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
        this.$store.state.jsonCuser = {}
        for (var i in res.data) {
          this.$store.state.jsonCuser[i] = {
            key: i,
            title: res.data[i]}
        }
      }).catch((err) => {
        console.log(err)
      })
        this.$http.post(this.$domain.domain1 + 'electric-design/getPusersByMultiConditions', formData)
        .then((res) => {
          this.$store.state.tableCuser = []
          if (res.data !== 0) {
            res.data.forEach((el, index) => {
              var obj = {}
              for (var i in this.jsonAllCuser) {
                if (Array.isArray(el[i]) && (i !== 'processRequirements')) {
                  obj[i] = el[i].concat().join(',')
                } else {
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.classify{
  padding:2rem 1.5rem;
  text-align:left;
 -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  border-radius:.3rem .3rem 0 0;
display: flex;
flex-wrap: wrap;
}
.div1{
  height:auto;
  display:flex;
  align-items:center;
  flex-wrap: wrap;
  margin-right: 2rem;
  }

.font1{
    margin-left:1rem;
}
.font2{
    color:#4d83e7;
    margin-left:1rem;
    cursor:pointer;
}
</style>
