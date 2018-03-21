<template>
  <div class="createGroup">
   <el-form :model="form" label-width="80px">
       <el-form-item label="群名称">
           <el-input v-model="form.groupName"></el-input>
       </el-form-item>
      <el-form-item label="群Id">
           <el-input v-model="form.groupId"></el-input>
       </el-form-item>       
       <el-form-item label="群介绍">
           <el-input type="textarea" v-model="form.instraction"></el-input>
       </el-form-item>
       <el-form-item>
           <el-button type="primary" @click="createGroup()">立即创建</el-button>
           <el-button @click="reset()">重置</el-button>
       </el-form-item>
   </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        groupId: '',
        groupName: '',
        instraction: '',
        ownerId: this.$cookie.get('user'),
        userIds: [this.$cookie.get('user')]
      }
    }
  },
  methods: {
    reset () {
      this.form = {
        groupId: '',
        groupName: '',
        instraction: '',
        ownerId: this.$cookie.get('user'),
        userIds: [this.$cookie.get('user')]
      }
    },
    createGroup () {
      this.$http.post(this.$domain.domain1 + 'electric-design/create', this.form)
      .then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '创建成功'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '创建失败'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.createGroup{
    padding: 2rem;
}
</style>
