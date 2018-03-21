import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/chat'
import changeTable from '@/components/changeTable'
import Index from '@/components/index'
import comIndex from '@/components/comindex'
import perProject from '@/components/perProject'
import perregister from '@/components/register/perregister'
import comregister from '@/components/register/comregister'
import login from '@/components/register/login'
import uploadAchieve from '@/components/uploadAchieve/uploadAchieve'
import protocol from '@/views/protocol/protocol'
import archive from '@/components/archive'
import facilitator from '@/components/facilitator'
import Error from '@/views/Error/404'
import perAchi from '@/components/person/person-perAchi'
import comAchi from '@/components/company/company-comAchi'
import register from '@/components/person/person-register'
import Cregister from '@/components/company/company-register'
import Pnew from '@/components/PM/PM-new'
// import Cnew from '@/components/CM/CM-new'
import step1 from '@/components/PM/PM-new-step'
// import Cstep1 from '@/components/CM/CM-new-step'
import step2 from '@/components/PM/PM-new-step2'
// import Cstep2 from '@/components/CM/CM-new-step2'
import step3 from '@/components/PM/PM-new-step3'
// import Cstep3 from '@/components/CM/CM-new-step3'
import stepNoabout2 from '@/components/PM/PM-new-step2-1'
// import CstepNoabout2 from '@/components/CM/CM-new-step2-1'
import step5 from '@/components/PM/PM-new-step5'
import step6 from '@/components/PM/PM-new-step6'
import sumary from '@/components/PM/PM-sumary'
// import Csumary from '@/components/CM/CM-sumary'
import combo from '@/components/PM/PM-combo'
// import Ccombo from '@/components/CM/CM-combo'
import time from '@/components/statistics/statistics-time'
// import Ctime from '@/components/Cstatistics/Cstatistics-time'
import discuss from '@/components/statistics/statistics-discuss'
// import Cdiscuss from '@/components/Cstatistics/Cstatistics-discuss'
import credit from '@/components/statistics/statistics-credit'
// import Ccredit from '@/components/Cstatistics/Cstatistics-credit'
import perProjectPandect from '@/components/perProject/pandect'
import perProjectAlter from '@/components/perProject/alter'
import perProjectDetail from '@/components/perProject/detail'
import perProjectFile from '@/components/perProject/file'
import perProjectTime from '@/components/perProject/time'
import perProjectEvent from '@/components/perProject/event'
import perProjectMember from '@/components/perProject/member'
import perProjectPermiss from '@/components/perProject/permiss'
import apply from '@/components/rong/recent/apply'
import contact from '@/components/rong/recent/contact'
import add from '@/components/rong/friend/add'
import createGroup from '@/components/rong/group/createGroup'
import addGroup from '@/components/rong/group/addGroup'
// import applyGroup from '@/components/rong/group/applyGroup'
import friendList from '@/components/rong/friend/friendList'
import groupList from '@/components/rong/group/groupList'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '',
    redirect: '/login'
  }, {
    path: '/per',
    name: 'Index',
    component: Index,
    children: [
      { path: 'person-perAchi', component: perAchi },
      { path: 'uploadAchieve', component: uploadAchieve },
      { path: 'person-register', component: register },
      { path: 'PM-new', component: Pnew, children: [{ path: '', component: step1 }, { path: '2', component: step2 }, { path: '3', component: step3 }, { path: '2-1', component: stepNoabout2 }, { path: '5', component: step5 }, { path: '6', component: step6 }] },
      { path: 'PM-sumary/:value', component: sumary }, // eslint-disable-next-line
      { path: 'PM-combo/:value', component: combo }, // eslint-disable-next-line
      { path: 'statistics-time', component: time },
      { path: 'statistics-discuss', component: discuss },
      { path: 'statistics-credit', component: credit },
      { path: '*', component: Error }
    ]
  }, {
    path: '/com',
    component: comIndex,
    children: [
      { path: 'company-comAchi', component: comAchi },
      { path: 'uploadAchieve', component: uploadAchieve },
      { path: 'company-register', component: Cregister },
      { path: 'PM-new', component: Pnew, children: [{ path: '', component: step1 }, { path: '2', component: step2 }, { path: '3', component: step3 }, { path: '2-1', component: stepNoabout2 }, { path: '5', component: step5 }, { path: '6', component: step6 }] },
      { path: 'CM-sumary/:value', component: sumary }, // eslint-disable-next-line
      { path: 'CM-combo/:value', component: combo }, // eslint-disable-next-line
      { path: 'Cstatistics-time', component: time },
      { path: 'Cstatistics-discuss', component: discuss },
      { path: 'Cstatistics-credit', component: credit },
      { path: '*', component: Error }
    ]
  }, {
    path: '/per-project/:code',
    component: perProject,
    children: [
      { path: 'pandect', component: perProjectPandect },
      { path: 'alter', component: perProjectAlter },
      { path: 'detail', component: perProjectDetail },
      { path: 'file', component: perProjectFile },
      { path: 'time', component: perProjectTime },
      { path: 'event', component: perProjectEvent },
      { path: 'member', component: perProjectMember },
      { path: 'permiss', component: perProjectPermiss }
    ]
  }, {
    path: '/archive',
    component: archive
  }, {
    path: '/facilitator',
    component: facilitator
  }, {
    path: '/perregister',
    component: perregister
  }, {
    path: '/comregister',
    component: comregister
  }, {
    path: '/login',
    component: login
  }, {
    path: '/protocol',
    component: protocol
  }, {
    path: '/chat',
    component: Chat,
    children: [
      { path: 'apply', component: apply },
      { path: 'contact', component: contact },
      { path: 'add', component: add },
      { path: 'friendList', component: friendList },
      { path: 'createGroup', component: createGroup },
      { path: 'addGroup', component: addGroup },
      { path: 'groupList', component: groupList }
    ]
  }, {
    path: '/changeTable/:value',
    component: changeTable
  }, {
    path: '/1',
    redirect: '/404',
    component: Error
  }]
})
