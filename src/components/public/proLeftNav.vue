<template>
  <div class="proLeftNav">
     <el-menu
      default-active=""
      router
      class="el-menu-vertical-demo"
      background-color="#4d83e7"
      text-color="#fff"
      active-background-color="#409EFF"
      :default-openeds="['per-project']">
      <el-submenu index="per-project">
        <template slot="title">
          <i class="icon iconfont icon-liebiao"></i>
          <span class="fontBig">{{name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="'/per-project/' + Id + '/pandect'">总览</el-menu-item>
          <!-- <el-menu-item :index="'/per-project/' + Id + '/alter'">修改项目信息</el-menu-item> -->
          <el-menu-item :index="'/per-project/' + Id + '/detail'">详细信息</el-menu-item>
          <el-menu-item :index="'/per-project/' + Id + '/file'">项目文件</el-menu-item>
          <el-menu-item :index="'/per-project/' + Id + '/time'">时间统计</el-menu-item>
          <el-menu-item :index="'/per-project/' + Id + '/event'">事件统计</el-menu-item>
          <el-menu-item :index="'/per-project/' + Id + '/member'">成员信息</el-menu-item>
          <el-menu-item :index="'/per-project/' + Id + '/permiss'" v-if="bidder===this.$cookie.get('user')">权限分配</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import store from '@/vuex/perProject'
export default {
  store,
  data () {
    return {
      name: '',
      bidder: ''
    }
  },
  computed: {
    Id () {
      return this.$route.params.code
    }
  },
  mounted () {
    this.initData()
    this.initPre()
  },
  watch: {
    Id () {
      this.initData()
    }
  },
  methods: {
    initPre () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getMultRecordByKeysAndValues',
       {'table': 'biders', 'keys': ['belongToProjectCode'], 'values': [this.$route.params.code]}
       ).then((res) => {
         console.log(res.data)
         res.data.forEach((el, index) => {
           if (el.bidState === 'selected') {
             this.bidder = el.sourceUserId
           }
         })
       }).catch((err) => {
         console.log(err)
       })
    },
    initData () {
      this.$store.state.id = this.Id
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': this.Id}).then((res) => {
        this.name = res.data.name
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.icon{
    color:#fff;
    margin-left:-1.5rem;
    font-size:1.5rem;
}
span{
  font-size:1rem;
}
.fontBig{
  font-size:1.3rem;
  font-weight:100;
}
</style>
