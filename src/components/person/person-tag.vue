<template>
  <div class="person-tag">
   <span style="font-size:1.5rem;line-height:2rem;color:#409EFF;margin-left:1.3rem;">已选:</span>
   <el-tag v-for="(tag, index) in tags" :key="index" type="danger" closable style="color:#fff" color="#909399" @close="close(tag)">
     {{tag}}
   </el-tag>
  </div>
</template>

<script>
import store from '@/vuex/tag.js'
export default {
  store,
  data () {
    return {
      tags: [],
      tag1: [],
      tag2: [],
      tag3: [],
      tag4: [],
      tag5: [],
      tag6: []
    }
  },
  mounted () {
    this.tags = this.$store.state.tags
    this.tag1 = this.$store.state.tag1
    this.tag2 = this.$store.state.tag2
    this.tag3 = this.$store.state.tag3
    this.tag4 = this.$store.state.tag4
    this.tag5 = this.$store.state.tag5
    this.tag6 = this.$store.state.tag6
  },
  methods: {
    close (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.tag1.splice(this.tags.indexOf(tag), 1)
      this.tag2.splice(this.tags.indexOf(tag), 1)
      this.tag3.splice(this.tags.indexOf(tag), 1)
      this.tag4.splice(this.tags.indexOf(tag), 1)
      this.tag5.splice(this.tags.indexOf(tag), 1)
      this.tag6.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.person-tag{
  /* margin-top:2rem; */
  /* height:3rem; */
  display:flex;
  align-items:center;
  justify-content: flex-start;
  /* border-radius:.3rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset; */
  padding:0 0 1rem 1rem;
}
.el-tag{
    margin-left:1rem;
}
</style>
