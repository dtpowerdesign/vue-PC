<template>
  <div class="person-classify">
   <div class="div1">
     <span class="font1">类别:</span><template v-for="i in classes"><span class="font2"  @click="add1($event)">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">类型:</span><template v-for="i in type"><span class="font2" @click="add2($event)">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">设计阶段:</span><template v-for="i in stage"><span class="font2" @click="add3($event)">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">规模容量:</span><template v-for="i in voltage"><span class="font2" @click="add4($event)">{{i}}</span></template>
   </div>
   <div class="div1">
     <span class="font1">线上项目:</span><span class="font2" @click="add6($event)">是</span><span class="font2" @click="add6($event)">否</span>
   </div>   
   <div class="div1">
     <span class="font1">涉及专业:</span><template v-for="i in domain"><span class="font2" @click="add5($event)">{{i}}</span></template>
   </div>
  </div>
</template>

<script>
import store from '@/vuex/tag.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  data () {
    return {
      max: '3',
      classes: [],
      type: [],
      stage: [],
      voltage: [],
      domain: [],
      tags: [],
      jsonAll: {}
    }
  },
  computed: mapState(['table', 'json']),
  created () {
    this.$http.get(this.$domain.domain1 + 'electric-design/getTypeMajors').then((res) => {
      this.classes = res.data.categorys
      this.type = res.data.types
      this.stage = res.data.designProcess
      this.voltage = res.data.sizeAndCapacitys
      this.domain = res.data.majors
      this.$parent.loadingClassify = false
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
    this.tag6 = this.$store.state.tag6
  },
  methods: {
    ...mapMutations([
      'add'
    ]),
    add1 (e) {
      if (this.tags.length < 3) {
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
      if (this.tags.length < 3) {
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
      if (this.tags.length < 3) {
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
      if (this.tags.length < 3) {
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
      if (this.tags.length < 3) {
        this.tags.push(e.target.innerText)
        this.tag5.push(e.target.innerText)
      } else {
        this.$message({
          message: `最多只能选${this.max}项目`,
          type: 'warning'
        })
      }
    },
    add6 (e) {
      if (this.tags.length < 3) {
        if (e.target.innerText === '是') {
          this.tags.push('yes')
          this.tag6.push('yes')
        } else {
          this.tags.push('no')
          this.tag6.push('no')
        }
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
      this.$http.post(this.$domain.domain1 + 'electric-design/getDataFormatOfProject').then((res) => {
        this.jsonAll = res.data
        this.$http.post(this.$domain.domain1 + 'electric-design/getShowKeyAndExplain', {'belongToUser': this.$cookie.get('user'), 'table': 'projects', 'otherName': 'achievement'})
      .then((res) => {
        // console.log(res.data)
        this.$store.state.json = {}
        for (var i in res.data) {
          this.$store.state.json[i] = {
            key: i,
            title: res.data[i]}
        }
        // console.log(this.json)
      }).catch((err) => {
        console.log(err)
      })
        var formData = {'conditions': {'state': {'searchMethod': 'values', 'values': ['洽谈中', '投标中', '投标洽谈', '合同执行中', '合同终止']}, 'aboutUsers': {'searchMethod': 'values', 'values': [this.$cookie.get('user')]}, 'category': {'searchMethod': 'values', 'values': this.tag1}, 'type': {'searchMethod': 'values', 'values': this.tag2}, 'designProcess': {'searchMethod': 'values', 'values': this.tag3}, 'sizeAndCapacity': {'searchMethod': 'values', 'values': this.tag4}, 'major': {'searchMethod': 'values', 'values': this.tag5}, 'isOnlineAchivment': {'searchMethod': 'values', 'values': this.tag6}}}
        this.$http.post(this.$domain.domain1 + 'electric-design/getProjectAboutUser', formData)
        .then((res) => {
          this.$store.state.table = []
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
              this.$store.state.table.push(obj)
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
.person-classify{
    text-align:left;
    /* -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    border-radius:.3rem .3rem 0 0; */
    padding: 1rem 1.5rem;
    display: flex;
    flex-wrap: wrap;
    height:auto;
}
.div1{
  height:auto;
  display:flex;
  align-items:center;
  font-size: 1.2rem;
  flex-wrap: wrap;
  margin-right: 2rem;
  width: 100%;
  margin-bottom: .3rem;
  }
.clearfix{
    clear:both;
    width:0;
    height:0;
}
.font1{
    margin-left:1rem;
    margin-right:1rem;
    padding: .2rem .4rem;
    font-size: 90%;
    color: #fff;
    background-color: #409EFF;
    border-radius: .3rem;
    /* width:8rem;
    text-align: right; */
}
.font2{
    margin-left:0.5rem;
    cursor:pointer;
    margin-left: 1rem;
    color:#409EFF;
    /* padding: .2rem .4rem;
    font-size: 90%;
    color: #fff;
    background-color: #409EFF;
    border-radius: .3rem; */
}
</style>
