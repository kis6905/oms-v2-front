import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Main from './views/Main.vue'
import Project from './views/Project.vue'

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
      path: '/main',
      name: 'main',
      component: Main,
      meta: { transitionName: 'fade' }
    },
    {
      path: '/project',
      name: 'project',
      component: Project,
      meta: { transitionName: 'slide' }
    }
  ]
})
