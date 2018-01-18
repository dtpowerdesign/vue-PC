import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Error from '@/views/Error/404'
import perAchi from '@/components/person/person-perAchi'
import register from '@/components/person/person-register'
import Pnew from '@/components/PM/PM-new'
import sumary from '@/components/PM/PM-sumary'
import combo from '@/components/PM/PM-combo'
import time from '@/components/statistics/statistics-time'
import discuss from '@/components/statistics/statistics-discuss'
import credit from '@/components/statistics/statistics-credit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      { path: '/person-perAchi', component: perAchi },
      { path: '/person-register', component: register },
      { path: '/person-register', component: register },
      { path: '/PM-new', component: Pnew }, // eslint-disable-next-line
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
