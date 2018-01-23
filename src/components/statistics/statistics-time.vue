<template>
  <div class="statistics-time">
    <div class="title"><span style="font-size:2rem">时间统计</span><i class="icon iconfont icon-iconfontquestion"></i><span class="date">{{year}}年{{month}}月{{day}}日</span></div>
    <el-tabs type="border-card" style="position:relative" class="tab">
      <el-tab-pane label="周">
        <div style="display:flex;justify-content:space-between"><span style="font-size:1.5rem;color:#4d83e7">{{year}}年{{month}}月{{week}}周</span><span><i class="icon iconfont icon-shang" @click="lastWeek()"></i><i class="icon iconfont icon-xia" @click="nextWeek()"></i></span></div>
        <ul class="time">
          <li>6:00</li>
          <li>12:00</li>
          <li>18:00</li>
          <li>24:00</li>
        </ul>
        <ul class="ul1">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li class="style1">六</li>
        <li class="style1">日</li>
        </ul>
        <ul class="ul1">
          <li v-for="i in Week[week-1]">
            <div class="div1" @click="funn($event)">{{i.date}}</div>
            <div class="div-thing">{{i.content}}</div>
            <div class="div-thing"></div>
            <div class="div-thing">{{i.content}}</div>
            <div class="div-thing">{{i.content}}</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="月">
        <div style="display:flex;justify-content:space-between"><span style="font-size:1.5rem;color:#4d83e7">{{year}}年{{month}}月</span><span><i class="icon iconfont icon-shang" @click="lastMonth()"></i><i class="icon iconfont icon-xia" @click="nextMonth()"></i></span></div>
        <ul class="ul1">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li class="style1">六</li>
        <li class="style1">日</li>
        </ul>
        <ul class="ul1" id="func">
          <li v-for="i in data">
            <div class="div1" @click="funn($event)">{{i.date}}</div>
            <div class="div2">{{i.content}}</div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="年">
        <div style="display:flex;justify-content:space-between"><span style="font-size:1.5rem;color:#4d83e7">{{year}}年</span><span><i class="icon iconfont icon-shang" @click="lastYear()"></i><i class="icon iconfont icon-xia" @click="nextYear()"></i></span></div>
        <ul class="ul-month">
          <li v-for="i in test">
            <span style="font-size:1.5rem;color:#da6363;" >{{i}}月</span>
            <ul class="ul-day">
              <li v-for="j in data" :class="{qiatanLine: j.date===1||j.date===6,kaigongLine: j.date===12,jiezhiLine: j.date===20}">
               <span>{{j.date}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="lines">
          <li style="color:#69a1fe;font-size:.8rem">——洽谈日期</li>
          <li style="color:#39c45d;font-size:.8rem">——开工日期</li>
          <li style="color:#e75e3a;font-size:.8rem">——截止日期</li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      week: '1',
      data: [
        {'date': 1, 'content': '开始施工'},
        {'date': 2, 'content': '开始施工'},
        {'date': 3, 'content': '开始施工'},
        {'date': 4, 'content': '开始施工'},
        {'date': 5, 'content': '开始施工'},
        {'date': 6, 'content': '开始施工'},
        {'date': 7, 'content': '开始施工'},
        {'date': 8, 'content': '开始施工'},
        {'date': 9, 'content': '开始施工'},
        {'date': 10, 'content': '开始施工'},
        {'date': 11, 'content': '开始施工'},
        {'date': 12, 'content': '开始施工'},
        {'date': 13, 'content': '开始施工'},
        {'date': 14, 'content': '开始施工'},
        {'date': 15, 'content': '开始施工'},
        {'date': 16, 'content': '开始施工'},
        {'date': 17, 'content': '开始施工'},
        {'date': 18, 'content': '开始施工'},
        {'date': 19, 'content': '开始施工'},
        {'date': 20, 'content': '开始施工'},
        {'date': 21, 'content': '开始施工'},
        {'date': 22, 'content': '开始施工'},
        {'date': 23, 'content': '开始施工'},
        {'date': 24, 'content': '开始施工'},
        {'date': 25, 'content': '开始施工'},
        {'date': 26, 'content': '开始施工'},
        {'date': 27, 'content': '开始施工'},
        {'date': 28, 'content': '开始施工'},
        {'date': 29, 'content': '开始施工'},
        {'date': 30, 'content': '开始施工'},
        {'date': 31, 'content': '开始施工'}
      ],
      Week: [[], [], [], [], []]
    }
  },
  created () {
  },
  mounted () {
    this.week = ~~((this.day - 1) / 7) + 1
    for (let i = 0; i < this.data.length; i++) {
      if (i <= 6) {
        this.Week[0].push(this.data[i])
      } else if (i <= 13) {
        this.Week[1].push(this.data[i])
      } else if (i <= 20) {
        this.Week[2].push(this.data[i])
      } else if (i <= 27) {
        this.Week[3].push(this.data[i])
      } else if (i <= this.data.length) {
        this.Week[4].push(this.data[i])
      }
    }
  },
  methods: {
    funn (e) {
      $(e.target).addClass('active').parent().siblings().find('.div1').removeClass('active')
      this.date = '2018' + '年' + '1' + '月' + e.target.innerText + '日'
      console.log($(e.target))
    },
    lastYear () {
      if (this.year === 2010) {
        this.$message({
          message: '我让你减了吗',
          type: 'warning'
        })
      } else {
        this.year--
      }
    },
    nextYear () {
      if (this.year === new Date().getFullYear()) {
        this.$message({
          message: '没有下一年了',
          type: 'warning'
        })
      } else {
        this.year++
      }
    },
    lastMonth () {
      if (this.month === 1) {
        this.year--
        this.month = 12
      } else {
        this.month--
      }
    },
    nextMonth () {
      if (this.year === new Date().getFullYear() && this.month === (new Date().getMonth() + 1)) {
        this.$message({
          message: '没有下一个月了哦',
          type: 'warning'
        })
      } else if (this.month === 12) {
        this.year++
        this.month = 1
      } else {
        this.month++
      }
    },
    lastWeek () {
      if (this.week === 1) {
        this.lastMonth()
        this.week = 5
      } else {
        this.week--
      }
    },
    nextWeek () {
      if (this.year === new Date().getFullYear() && this.month === (new Date().getMonth() + 1) && this.week === (~~((new Date().getDate() - 1) / 7) + 1)) {
        this.$message({
          message: '这已经是最新一周了哦',
          type: 'warning'
        })
      } else if (this.week === 5) {
        this.week = 1
        this.nextMonth()
      } else {
        this.week++
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.statistics-time{
   width:90%;
  margin: 3rem auto 0 auto;
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
  position:absolute;
  top:5rem;
  right:1rem;
  z-index:1;
  font-size:1.5rem
}
.icon-shang,.icon-xia{
  color:#4d83e7
}
.ul1{
  list-style-type:none;
  margin-left:6rem;
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
.div1{
  font-size:1.5rem;
  background-color:#e1eafb;
}
.active{
  background-color:blue!important;
}
.div2{
  font-size: 1rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
}
.div-thing{
border-bottom:2px solid gray;
height:6rem;
display: flex;
  align-items: center;
  justify-content: center;
}
.time{
  list-style-type:none;
  float:left;
  margin-top:3.3rem;
}
.time>li{
  margin-top:5rem;
}
.ul-month{
  list-style-type: none;
}
.ul-month>li{
  width:23%;
  float:left;
}
.ul-day{
  list-style-type: none;
}
.ul-day>li{
  box-sizing:border-box;
  float:left;
  width:13%;
  height:1.3rem;
}
.qiatanLine{
  border-bottom:2px solid #69a1fe;
}
.kaigongLine{
  border-bottom:2px solid #39c45d;
}
.jiezhiLine{
  border-bottom:2px solid #e75e3a;
}
.lines{
  list-style-type:none;
  float:left;
  margin-top:-13rem;
}
.tab{
  border-radius:.3rem;
  -webkit-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 15px 10px -10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
}
</style>
