<template>
  <div class="project-event">
    <div class="title"><span style="font-size:2rem">事件统计</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <el-tabs type="border-card">
      <el-tab-pane label="提资"><upload></upload></el-tab-pane>
      <el-tab-pane label="洽谈"><chat></chat></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from '@/vuex/perProject'
import {mapState} from 'vuex'
import upload from '@/components/perProject/event-upload'
import chat from '@/components/perProject/event-chat'
export default {
  store,
  computed: {
    ...mapState(['id'])
  },
  components: {upload, chat},
  data () {
    return {}
  },
  mounted () {
    this.$http.post('http://39.106.34.156:8080/electric-design/getEventsByMultiConditions', {
      'conditions': {
        'belongToProjectCode': {'searchMethod': 'values', 'values': [this.id]},
        'eventType': {'searchMethod': 'values', 'values': ['upload']}
      }
    }
    ).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-event{
     width:90%;
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
</style>
