<template>
  <div class="member">
       <div class="title"><span style="font-size:2rem">成员信息</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <div v-for="(i, j) in data" :key="j" class="member-div">
      <span style="color:red;font-size:1.5rem">{{i.key}}:</span>
      <span v-for="(k, l) in i.value" :key="l" @click="fun(k.account)" style="color:#4d83e7;font-size:1.5rem;margin-left:1rem"><i class="icon iconfont icon-gerenziliao"></i>{{k.name}}</span>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/perProject'
import {mapState} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['id'])
  },
  data () {
    return {
      data: {
        'master': {'key': '主持人', 'value': []},
        'drawer': {'key': '制图者', 'value': []},
        'checker': {'key': '校核人', 'value': []},
        'auditor': {'key': '审核人', 'value': []},
        'projectManager': {'key': '项目经理', 'value': []},
        'platformProjectAnalyst': {'key': '平台分析设计师', 'value': []},
        'workGenerater': {'key': '工程代理', 'value': []}
      }
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post('http://39.106.34.156:8080/electric-design/getProjectMember', {
        'belongToProjectCode': '19'
      })
    .then((res) => {
      console.log(res.data)
      for (var i in this.data) {
        this.data[i].value = res.data[i]
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
.member{
  width: 90%;
  margin: 3rem auto 0 auto;
}
.title{
  text-align:left;
  margin-bottom:2rem;
  position:relative;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.member-div{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top:2rem;
}
</style>
