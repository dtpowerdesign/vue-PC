<template>
  <div class="statistics-time">
    <div class="title"><span style="font-size:2rem">时间统计</span><i class="icon iconfont icon-iconfontquestion"></i><span class="date">{{date}}</span></div>
    <el-tabs type="border-card" style="position:relative">
      <el-tab-pane label="周">
        <div style="display:flex;justify-content:space-between"><span style="font-size:1.5rem;color:#4d83e7">2018年1月</span><span><i class="icon iconfont icon-shang"></i><i class="icon iconfont icon-xia"></i></span></div>
      </el-tab-pane>
      <el-tab-pane label="月">
        <div style="display:flex;justify-content:space-between"><span style="font-size:1.5rem;color:#4d83e7">2018年1月</span><span><i class="icon iconfont icon-shang"></i><i class="icon iconfont icon-xia"></i></span></div>
        <ul class="ul1">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li class="style1">六</li>
        <li class="style1">日</li>
        </ul>
        <ul class="ul1" id="func"></ul>
      </el-tab-pane>
      <el-tab-pane label="年">年</el-tab-pane>
      
    </el-tabs>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: '2018年1月17日',
      frag: {}
    }
  },
  created () {
    this.frag = document.createDocumentFragment()
    for (let i = 0; i < 30; i++) {
      var li = $(`<li style="float:left;width:13%;"></li>`)
      var div2 = $(`<div></div>`)
      div2.html(`<div>投标中<div>`)
      div2.css({'font-size': '1rem', 'display': 'flex', 'align-items': 'center', 'justify-content': 'center', 'height': '6rem'})
      div2.css({'color': 'yellow'})
      var div1 = $('<div @click="funn()"></div>')
      div1.html(i + 1)
      div1.addClass('divMD')
      // div1.css({'font-size': '1.5rem', 'background': '#e1eafb'})
      // var span = $(`<div style="font-size:1.5rem;background:#e1eafb">${i}</div>`)
      li.append(div1)
      li.append(div2)
      this.frag.append(li[0])
      console.log(div1.attr('@click'))
    }
  },
  mounted () {
    $('#func').append(this.frag)
  },
  methods: {
    funn () {
      alert(1)
      console.log(1)
      this.date = $(this).text()
      console.log($(this).text())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics-time{
   width:90%;
  margin: 3rem auto;
  background-color:#ebeef5;
}
.title{
  text-align:left;
  margin-bottom:2rem;
  position:relative;
}
.icon{
  font-size:2rem;
  margin-left:1rem;
}
.date{
  position:absolute;top:5rem;right:1rem;z-index:1;font-size:1.5rem
}
.icon-shang,.icon-xia{
  color:#4d83e7
}
.ul1{
  list-style-type:none;
}
.ul1>li{
  float:left;
  width:13%;
}
.style1{
  color:#e6a23c;
}
.divMD{
  font-size: 1.5rem;
   background: #e1eafb
}
</style>
