<template>
  <div class="Info">
   <i class="icon iconfont icon-gerenziliao"></i><span>{{name}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Alpen'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Info{
    text-align:right;
}
</style>
