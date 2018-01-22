<template>
  <div>
    <div class="skip">
      <div style="margin-left:2rem" @click="$router.push('/PM-new/3')"><i class="icon iconfont icon-zuo"></i><span>上一步</span></div>
      <div style="margin-right:2rem" @click="$router.push('/PM-new/5')"><span>下一步</span><i class="icon iconfont icon-you"></i></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step'])
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['init4'])
  },
  mounted () {
    this.init4()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skip{
  margin-top:4rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:#4d83e7;
  font-weight:500;
}
</style>
