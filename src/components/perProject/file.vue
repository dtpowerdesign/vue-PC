<template>
  <div class="file">
    <div class="title"><span style="font-size:2rem">项目文件</span><i class="icon iconfont icon-iconfontquestion"></i></div>
    <p style="font-size:1.5rem;color:#4d83e7;text-align:left">目前阶段:{{designProcess}}</p>
    <el-tabs type="border-card">
    <el-tab-pane v-for="(i, j) in processRequirementsName" :label="i" :key="j">
    <ul class="fileUl">
      <li v-for="(k, l) in processRequirementsAll[i]" :key="l">
        <div>
          <img :src="imgTypePath(k.dataName)" alt="">
          {{k.dataName}}
          <div style="display:flex;justify-content:space-around;pointer:curser;color:#409EFF;font-size:1.5rem"><span @click="preview(k.dataPath)">预览</span><span @click="download(k.dataPath)">下载</span><span @click="record(k.dataName)">历史记录</span></div>
        </div>
      </li>
    </ul>
    <div style="display:flex;justify-content:center;align-items:center;margin-top:3rem">
    <span>添加文件的备注</span>
    <el-input placeholder="添加文件的备注" v-model="note" style="width:30%" type="textarea" autosize=""></el-input>
    <el-upload :action='$domain.domain1 + "electric-design/uploadExistProjectData"' name="project" :show-file-list="showFileList"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :on-preview="uploadPrev"
   :data="{
     'projectSourceAccount': sourceAccount,
     'projectCode': id,
     'oprateAccount': $cookie.get('user'),
     'belongToProcess': i,
     'body': note}">
     <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    </div>
    </el-tab-pane>
  </el-tabs>
  <el-dialog title="历史记录" :visible.sync="dialogVisible" width="60%">
    <el-table :data="historyTable">
      <el-table-column prop="date" label="修改日期"></el-table-column>
      <el-table-column prop="time" label="修改时间"></el-table-column>
      <el-table-column prop="people" label="修改者"></el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="preview(scope.row.dataPath)" type="success" size="mini">预览</el-button>
          <el-button @click="download(scope.row.dataPath)" type="success" size="mini">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
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
      dialogVisible: false,
      note: '无备注',
      showFileList: false,
      sourceAccount: '',
      processRequirements: [],
      processRequirementsName: [],
      designProcess: '',
      processRequirementsAll: {},
      historyTable: []
    }
  },
  mounted () {
    this.initData()
  },
  updated () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.post(this.$domain.domain1 + 'electric-design/getProjectByCode', {'code': this.id})
    .then((res) => {
      this.sourceAccount = res.data.sourceAccount
      this.designProcessName = []
      this.processRequirementsAll = {}
      this.designProcess = res.data.designProcess
      this.processRequirements = res.data.processRequirements
      res.data.processRequirements.forEach((el, index) => {
        this.processRequirementsName.push(el.state)
      })
      this.processRequirementsName.forEach((el, index) => {
        this.$http.post(this.$domain.domain1 + 'electric-design/getEventsByMultiConditions', {
          'conditions': {
            'belongToProjectCode': {'searchMethod': 'values', 'values': [this.id]},
            'belongToProcess': {'searchMethod': 'values', 'values': [el]}
          }
        }).then((res) => {
          // console.log(res.data)
          this.$set(this.processRequirementsAll, el, res.data)
        }).catch((err) => {
          console.log(err)
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    },
    uploadSuccess (response, file, fileList) {
      if (response.result) {
        this.$message({
          type: 'success',
          message: `${file.name}上传成功`
        })
        this.initData()
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
    },
    imgTypePath (data) {
      var regexcel = /\.(xlsx)$/
      var regword = /\.(docx)$/
      var regtxt = /\.(txt)$/
      var regpdf = /\.(pdf)$/
      if (regexcel.test(data)) { return './static/excel.jpg' }
      if (regword.test(data)) { return './static/word.jpg' }
      if (regtxt.test(data)) { return './static/txt.jpg' }
      if (regpdf.test(data)) { return './static/pdf.jpg' }
      return './static/other.png'
    },
    download (path) {
      window.open(this.$domain.domain1 + 'electric-design/dowloads?fileUrl=' + path)
    },
    preview (path) {
      window.open(this.$domain.domain1.substring(0) + path)
    },
    record (code) {
      this.dialogVisible = true
      this.$http.post(this.$domain.domain1 + 'electric-design/getHistoryProjectFiles', {
        'projectCode': this.id,
        'fileName': code
      }).then((res) => {
        this.historyTable = []
        res.data.forEach((el, index) => {
          this.historyTable.push({
            'date': [].concat((el.time.year + 1900), (el.time.month + 1), el.time.date).join('/'),
            'time': [].concat(el.time.hours, el.time.minutes, el.time.seconds).join(':'),
            'people': el.sourceUserName,
            'note': el.body,
            'dataPath': el.dataPath
          })
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.file{
  margin:3rem auto 0 auto;
  width:90%;
}
.title{
  border-bottom:1px solid black;
  text-align:left;
}
.icon{
  font-size:2rem;
}
.fileUl{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.fileUl>li{
  list-style-type: none;
  width: 25%;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.fileUl>li:hover{
    -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
.fileUl>li img{
  width: 100%;
}
</style>
