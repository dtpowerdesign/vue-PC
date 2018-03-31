<template>
  <div>
   event-notice
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
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
