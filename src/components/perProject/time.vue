<template>
  <div class="project-time">
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
          <li v-for="(i, iIndex) in weekday" :key="iIndex">
            <div class="div1" @click="funn($event)">{{i.dayOfMonth}}</div>
            <div class="div-thing">{{i.time1}}</div>
            <div class="div-thing">{{i.time2}}</div>
            <div class="div-thing">{{i.time3}}</div>
            <div class="div-thing">{{i.time4}}</div>
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
          <li v-for="(i, iIndex) in monthday" :key="iIndex">
            <div class="div1" @click="funn($event)">{{i.dayCode}}</div>
            <div class="div2"><ul style="list-style-type:none"><li v-for="(k, kIndex) in i.content" :key="kIndex">{{k}}</li></ul></div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="年">
        <div style="display:flex;justify-content:space-between"><span style="font-size:1.5rem;color:#4d83e7">{{year}}年</span><span><i class="icon iconfont icon-shang" @click="lastYear()"></i><i class="icon iconfont icon-xia" @click="nextYear()"></i></span></div>
        <ul class="ul-month">
          <li v-for="(i, iIndex) in yearday" :key="iIndex">
            <span style="font-size:1.5rem;color:#da6363;" >{{i.mon}}月</span>
            <ul class="ul-day">
              <li v-for="(j, jIndex) in i.days" :key="jIndex" :class="{qiatanLine: j.eventCode===1,kaigongLine: j.eventCode===2,jiezhiLine: j.eventCode===3}">
               <span>{{j.dayCode}}</span>
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
import store from '@/vuex/perProject'
import {mapState} from 'vuex'
export default {
  store,
  computed: {
    ...mapState(['id'])
  },
  data () {
    return {
      weekday: [],
      monthday: [],
      yearday: [],
      test: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      week: Math.ceil((new Date().getDate() + 6 - new Date().getDay()) / 7)
    }
  },
  created () {
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.initWeek()
      this.initMonth()
      this.initYear()
    },
    initWeek () {
      this.weekday = []
      this.$http.post('http://39.106.34.156:8080/electric-design/getEventsAndDatesByweek', {
        'projectCode': this.id, 'year': this.year, 'month': this.month, 'week': this.week
      }).then((res) => {
        res.data.forEach((el, index) => {
          var obj = {}
          obj.dayOfMonth = el.dayOfMonth
          for (let i = 0; i <= 5; i++) {
            if (el.hours[i].events) {
              obj.time1 = el.hours[i].events[0].name
            }
          }
          for (let i = 6; i <= 11; i++) {
            if (el.hours[i].events) {
              obj.time2 = el.hours[i].events[0].name
            }
          }
          for (let i = 12; i <= 17; i++) {
            if (el.hours[i].events) {
              obj.time3 = el.hours[i].events[0].name
            }
          }
          for (let i = 18; i <= 23; i++) {
            if (el.hours[i].events) {
              obj.time4 = el.hours[i].events[0].name
            }
          }
          this.weekday.push(obj)
        })
      }).catch((err) => { console.log(err) })
    },
    initMonth () {
      this.monthday = []
      this.$http.post('http://39.106.34.156:8080/electric-design/getEventsAndDatesByMonth', {
        'projectCode': this.id, 'year': this.year, 'month': this.month
      }).then((res) => {
        for (let i = 1; i < res.data[0].dayOfWeek; i++) {
          let obj = {}
          obj.dayCode = ''
          obj.content = []
          this.monthday.push(obj)
        }
        res.data.forEach((el, index) => {
          var obj = {}
          obj.dayCode = el.dayCode
          obj.content = []
          for (let i = 0; i <= 23; i++) {
            if (el.hours[i].events) {
              el.hours[i].events.forEach((a) => {
                obj.content.push(a.name)
              })
            }
          }
          this.monthday.push(obj)
        })
      }).catch((err) => { console.log(err) })
    },
    initYear () {
      this.yearday = []
      this.$http.post('http://39.106.34.156:8080/electric-design/getEventsByUserAccountAndYear', {
        'projectCode': this.id, 'year': this.year
      }).then((res) => {
        res.data.forEach((el, index) => {
          var obj = {}
          obj.mon = el.monthCode
          obj.days = el.days
          obj.days.forEach((ell, index) => {
            if (ell.events) {
              ell.events.forEach((elll, index) => {
                if (elll.eventCode <= 10 && elll.eventCode >= 5) {
                  ell.eventCode = 1
                }
                if (elll.eventCode <= 13 && elll.eventCode >= 11) {
                  ell.eventCode = 2
                }
                if (elll.eventCode <= 4 && elll.eventCode >= 1) {
                  ell.eventCode = 3
                }
              })
            }
          })
          this.yearday.push(obj)
        })
      }).catch((err) => { console.log(err) })
    },
    maxDate (y, m) {
      if ((y % 400 === 0) || ((y % 4 === 0) && (y % 100 !== 0))) {
        switch (m) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            return 31
          case 2:
            return 29
          default :
            return 30
        }
      } else {
        switch (m) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            return 31
          case 2:
            return 28
          default :
            return 30
        }
      }
    },
    funn (e) {
      $(e.target).addClass('active').parent().siblings().find('.div1').removeClass('active')
      this.day = e.target.innerText
    },
    lastWeek () {
      this.subWeek()
      this.initWeek()
    },
    nextWeek () {
      this.addWeek()
      this.initWeek()
    },
    lastMonth () {
      this.subMonth()
      this.initMonth()
    },
    nextMonth () {
      this.addMonth()
      this.initMonth()
    },
    lastYear () {
      this.subYear()
      this.initYear()
    },
    nextYear () {
      this.addYear()
      this.initYear()
    },
    subWeek () {
      if (this.week === 1) {
        this.subMonth()
        this.week = Math.ceil((this.maxDate(this.year, this.month) + 6 - new Date(this.year, this.month, this.maxDate(this.year, this.month)).getDay()) / 7)
      } else {
        this.week--
      }
    },
    addWeek () {
      if (this.week === Math.ceil((this.maxDate(this.year, this.month) + 6 - new Date(this.year, this.month, this.maxDate(this.year, this.month)).getDay()) / 7)) {
        this.addMonth()
        this.week = 1
      } else {
        this.week++
      }
    },
    subMonth () {
      if (this.month === 1) {
        this.month = 12
        this.year--
      } else {
        this.month--
      }
    },
    addMonth () {
      if (this.month === 12) {
        this.month = 1
        this.year++
      } else {
        this.month++
      }
    },
    subYear () {
      this.year--
    },
    addYear () {
      this.year++
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.project-time{
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
  height: 8rem;
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
