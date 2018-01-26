<template>
  <div class="content">
   <ul>
     <li v-for="i in data.slice((currentPage-1)*pagesize,currentPage*pagesize)" class="content-style">
       <img :src="i.mainImgPath" alt="">
       <p class="detail1" style="margin-left:.3rem">{{i.name}}</p>
       <div class="detail2"><span style="margin-left:.3rem">{{i.company}}</span><span>{{i.endTime}}</span></div>
     </li>
   </ul>
   <div style="clear:both;"></div>
   <el-pagination class="paging" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 6, 9, 18]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="data.length">
    </el-pagination>
  </div>
</template>

<script>
import store from '@/vuex/archive.js'
import { mapState } from 'vuex'
export default {
  store,
  data () {
    return {
      currentPage: 1,
      pagesize: 3
    }
  },
  computed: mapState(['data']),
  methods: {
    handleSizeChange (size) {
      this.pagesize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
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
    margin:3rem auto 0 auto;
    width:80%;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
