<template>
  <div>
   <el-button @click="uploadVisibleSelf=true" type="primary">上传文件</el-button>
      <el-dialog width="30%" title="上传文件" :visible.sync="uploadVisibleSelf">
          <el-select v-model="fileType" placeholder="请选择分类" style="width:100%">
            <el-option v-for="(i, j) in fileTypes" :key="j" :value="i" :label="i"></el-option>
          </el-select>
          <el-input v-model="body" placeholder="请输入备注"></el-input>
          <el-upload :action='$domain.domain1 + "electric-design/uploadProjectFiles"' name="project" multiple :show-file-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-preview="uploadPrev"
            :data="{
              'oprateAccount': this.$cookie.get('user'),
              'fileType': fileType,
              'projectCode': this.id,
              'body': this.body,
              'eventtype': (fileType==='合同洽商单')?'chat':'provide'
              }">
           <el-button size="small" type="primary" style="width:100%">点击上传</el-button>
         </el-upload>  
           <el-button size="small" type="warning" @click="uploadVisibleSelf=false">退出上传</el-button>
   </el-dialog>   
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
    return {
      uploadVisibleSelf: false,
      body: '',
      fileType: '其他',
      fileTypes: ['合同', '提资单', '合同洽商单', '会议机要', '工程评审单', '校审单', '工程联络单', '其他']
    }
  },
  methods: {
    uploadSuccess (response, file, fileList) {
      if (response.result) {
        this.$message({
          type: 'success',
          message: `${file.name}上传成功`
        })
        this.$router.go(0)
      } else {
        this.$message({
          type: 'warning',
          message: `${file.name}上传失败,原因:${response.reason}`
        })
      }
      console.log(response)
    },
    uploadError (err, file, fileList) {
      this.$message({
        type: 'warning',
        message: `${file.name}上传失败`
      })
      console.log(err)
    },
    uploadPrev (file) {
      console.log(file.response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
