<template>
  <div>
    <div class="content">
      <p style="text-align:left;width:100%">项目发布的信息过多，如果您有疑惑，可以联系平台工作人员，他们会帮您填写，您也可以联系已经注册的用户帮您填写。当填写信息后，点击下一步，检查信息无误会点击确认即可发布</p>
      <div style="margin:1rem auto">
        <el-button type="primary" @click="dialogVisible=true">联系平台人员</el-button>
        <el-button type="primary" @click="dialogVisible=true">联系指定用户</el-button>
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>后台人员ckj联系电话：xxx</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <p style="text-align:left;width:100%">如果您没有疑惑或者已经熟悉发布流程，您也可以自己填写</p>
      <div style="margin:1rem auto">
        <el-button type="primary" @click="$router.push('/per/PM-new/2')">我自己填写</el-button>
      </div>
    </div>
    <div class="skip">
      <div style="margin-left:2rem" @click="$router.push('/per/PM-new/1')"><i class="icon iconfont icon-zuo"></i><span>上一步</span></div>
      <div style="margin-right:2rem" @click="$router.push('/per/PM-new/3')"><span>下一步</span><i class="icon iconfont icon-you"></i></div>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/step.js'
import {mapState, mapMutations} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['step', 'form'])
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations(['init2'])
  },
  mounted () {
    this.init2()
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
.content{
  margin:3rem auto 0 auto;
  width:80%;
}
</style>
