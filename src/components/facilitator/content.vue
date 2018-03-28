<template>
  <div class="content">
  <el-tabs>
    <el-tab-pane label="个人用户">
         <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/puser')">个人用户表头编辑</el-button>
      <el-table :data="tablePuser.slice((currentPagePuser-1)*pagesizePuser,currentPagePuser*pagesizePuser)" style="width:100%">
        <el-table-column v-for="(i, j) in jsonPuser" :key="j" :prop="j" :label="i.title" :fixed="j==='name'?'left':false"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="skip({'account':scope.row.account, 'name':scope.row.name})" type="primary" size="small">和他聊天</el-button>
          </template>
        </el-table-column>
     </el-table>
     <el-pagination  class="paging" @size-change="handleSizeChangePuser" @current-change="handleCurrentChangePuser" :current-page="currentPagePuser" :page-sizes="[3, 6, 9, 18]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="tablePuser.length">
     </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="企业用户">
      <el-button size="small" style='margin-right:20px;' type="warning" icon="document" @click="$router.push('/changeTable/cuser')">企业用户表头编辑</el-button>
      <el-table :data="tableCuser.slice((currentPageCuser-1)*pagesizeCuser,currentPageCuser*pagesizeCuser)" style="width:100%">
        <el-table-column v-for="(i, j) in jsonCuser" :key="j" :prop="j" :label="i.title" :fixed="j==='name'?'left':false"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="skip({'account':scope.row.account, 'name':scope.row.name})" type="primary" size="small">和他聊天</el-button>
          </template>
        </el-table-column>        
     </el-table>
     <el-pagination  class="paging" @size-change="handleSizeChangeCuser" @current-change="handleCurrentChangeCuser" :current-page="currentPageCuser" :page-sizes="[3, 6, 9, 18]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="tableCuser.length">
     </el-pagination>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
import store from '@/vuex/facilitator.js'
import { mapState } from 'vuex'
export default {
  store,
  data () {
    return {
      dialogVisible: false,
      currentPagePuser: 1,
      currentPageCuser: 1,
      pagesizePuser: 3,
      pagesizeCuser: 3
    }
  },
  computed: {
    ...mapState(['data', 'tablePuser', 'tableCuser', 'jsonPuser', 'jsonCuser'])},
  // mounted () {
  //   console.log(this.jsonPuser)
  // },
  methods: {
    skip (row) {
      this.$router.push('/chat/contact')
      this.$nextTick(() => {
        this.$one.$emit('skipChat', row)
      })
    },
    handleSizeChangePuser (size) {
      this.pagesizePuser = size
    },
    handleSizeChangeCuser (size) {
      this.pagesizeCuser = size
    },
    handleCurrentChangePuser (currentPage) {
      this.currentPagePuser = currentPage
    },
    handleCurrentChangeCuser (currentPage) {
      this.currentPageCuser = currentPage
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
 
}
ul{
    list-style-type:none;
    margin-left:auto;
    margin-right:auto;
}
.content-style{
    width:30%;
    float:left;
    margin:1rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.content-style:hover{
    -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.content-style>img{
    width:100%;
}
.content-style>.detail1{
    text-align:left;
    font-size:1.5rem;
}
.content-style>.detail2{
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:#909399;
}
.paging{
    margin:1rem auto 1rem auto;
    width:100%;
    /* -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset; */
}
</style>
