import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Error from '@/views/Error/404'
import perAchi from '@/components/person/person-perAchi'
import register from '@/components/person/person-register'
import Pnew from '@/components/PM/PM-new'
import step1 from '@/components/PM/PM-new-step'
import step2 from '@/components/PM/PM-new-step2'
import step3 from '@/components/PM/PM-new-step3'
import step4 from '@/components/PM/PM-new-step4'
import step5 from '@/components/PM/PM-new-step5'
import step6 from '@/components/PM/PM-new-step6'
import sumary from '@/components/PM/PM-sumary'
import combo from '@/components/PM/PM-combo'
import time from '@/components/statistics/statistics-time'
import discuss from '@/components/statistics/statistics-discuss'
import credit from '@/components/statistics/statistics-credit'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      { path: '/person-perAchi', component: perAchi },
      { path: '/person-register', component: register },
      { path: '/person-register', component: register },
      { path: '/PM-new', component: Pnew, children: [{ path: '', component: step1 }, { path: '2', component: step2 }, { path: '3', component: step3 }, { path: '4', component: step4 }, { path: '5', component: step5 }, { path: '6', component: step6 }] },
      { path: '/PM-sumary', component: sumary }, // eslint-disable-next-line
      { path: '/PM-combo', component: combo }, // eslint-disable-next-line
      { path: '/statistics-time', component: time },
      { path: '/statistics-discuss', component: discuss },
      { path: '/statistics-credit', component: credit },
      { path: '*', component: Error }
    ]
  }, {
    path: '/404',
    component: Error
  }, {
    path: '/1',
    redirect: '/404',
    component: Error
  }]
})
