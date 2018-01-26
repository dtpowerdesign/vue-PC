<template>
  <div class="classify">
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
     <span class="font1">涉及专业:</span><template v-for="i in domain"><span class="font2" @click="add5($event)">{{i}}</span></template>
   </div>
   <div class="clearfix"></div>
  </div>
</template>

<script>
import store from '@/vuex/archive.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  data () {
    return {
      classes: [],
      type: [],
      stage: [],
      voltage: [],
      domain: [],
      tags: []
    }
  },
  computed: mapState(['table']),
  mounted () {
    this.$http.get('http://39.106.34.156:8080/electric-design/getTypeMajors').then((res) => {
      this.classes = res.data.categorys
      this.type = res.data.types
      this.stage = res.data.designProcess
      this.voltage = res.data.sizeAndCapacitys
      this.domain = res.data.majors
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
  methods: {
    ...mapMutations([
      'add'
    ]),
    add1 (e) {
      if (this.tags.length < 5) {
        this.tags.push(e.target.innerText)
        this.tag1.push(e.target.innerText)
      } else {
        this.$message({
          message: '最多只能选5项',
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
          message: '最多只能选5项',
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
          message: '最多只能选5项',
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
          message: '最多只能选5项',
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
          message: '最多只能选5项',
          type: 'warning'
        })
      }
    }
  },
  watch: {
    tags () {
      var formData = {'conditions': {'category': {'searchMethod': 'values', 'values': this.tag1}, 'type': {'searchMethod': 'values', 'values': this.tag2}, 'designProcess': {'searchMethod': 'values', 'values': this.tag3}, 'sizeAndCapacity': {'searchMethod': 'values', 'values': this.tag4}, 'major': {'searchMethod': 'values', 'values': this.tag5}}}
      this.$http.post('http://39.106.34.156:8080/electric-design/getProjectsByMultiConditions', formData)
      .then(res => {
        console.log(res.data)
        this.$store.commit('init')
        res.data.forEach((el, index) => {
          this.$store.commit('add', el)
        })
        this.$store.state.length = res.data.length
      }).catch(err => { console.log(err) })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.classify{
  padding:2rem auto;
  text-align:left;
 -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  border-radius:.3rem .3rem 0 0;

}
.div1{
  float:left;
  height:2rem;
  display:flex;
  align-items:center;
  }
.clearfix{
    clear:both;
    width:0;
    height:0;
}
.font1{
    margin-left:2rem;
}
.font2{
    color:#4d83e7;
    margin-left:0.5rem;
    cursor:pointer;
}
</style>
