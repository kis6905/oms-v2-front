import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Service from './views/Service.vue'
import Main from './views/Main.vue'
import Project from './views/Project.vue'
import WeeklyReport from './views/WeeklyReport.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/service',
      name: 'service',
      redirect: '/service/main',
      component: Service,
      meta: { transitionName: 'fade' },
      children: [
        {
          path: 'main',
          component: Main,
          meta: { transitionName: 'fade', props: true }
        },
        {
          path: 'project',
          component: Project,
          meta: { transitionName: 'slide' }
        },
        {
          path: 'weekly_report',
          component: WeeklyReport,
          meta: { transitionName: 'slide' }
        }
      ]
    }
  ]
})
