<template>
  <div class="tag">
   <span style="float:left;font-size:1.5rem;line-height:2rem;color:#409EFF;margin-left:2rem;">已选:</span>
   <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type" @close="close(tag)">
     {{tag}}
   </el-tag>
  </div>
</template>

<script>
import store from '@/vuex/archive.js'
export default {
  store,
  data () {
    return {
      tags: [],
      tag1: [],
      tag2: [],
      tag3: [],
      tag4: [],
      tag5: []
    }
  },
  mounted () {
    this.tags = this.$store.state.tags
    this.tags = this.$store.state.tags
    this.tag1 = this.$store.state.tag1
    this.tag2 = this.$store.state.tag2
    this.tag3 = this.$store.state.tag3
    this.tag4 = this.$store.state.tag4
    this.tag5 = this.$store.state.tag5
  },
  methods: {
    close (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
      this.tag1.splice(this.tags.indexOf(tag), 1)
      this.tag2.splice(this.tags.indexOf(tag), 1)
      this.tag3.splice(this.tags.indexOf(tag), 1)
      this.tag4.splice(this.tags.indexOf(tag), 1)
      this.tag5.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag{
height:3rem;
display:flex;
  align-items:center;
border-radius:.3rem;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;

}
.el-tag{
    float:left;
    margin-left:1rem;
}
</style>
