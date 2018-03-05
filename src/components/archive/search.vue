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
      search: ''
    }
  },
  computed: mapState(['table']),
  methods: {
    mySearch () {
      this.$parent.loadingContent = true
      var formData = {'value': this.search}
      this.$http.post(this.$domain.domain1 + 'electric-design/searchProjectsByValue', formData).then((res) => {
        this.$store.commit('init')
        res.data.forEach((el, index) => {
          this.$store.commit('add', el)
        })
        this.$parent.loadingContent = false
      }).catch((err) => { console.log(err) })
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
