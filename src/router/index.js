import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Project selector',
    component: () => import('../views/project-selector.vue')
  },
  {
    path: '/project-editor/:project_name',
    name: 'Project editor',
    props: {dd: 'ddd'},
    component: () => import('../views/project-editor.vue')
  },
  {
    path: '/json-maker',
    name: 'JSON M-A-K-E-R',
    component: () => import('../views/json-maker.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
