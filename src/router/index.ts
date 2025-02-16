import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BadegesComponent from '../views/badgesComponent.vue'
import ExampleComponent from '../views/exampleComponent.vue'
const routes: Array<RouteRecordRaw> = [
 
  {
    path: '/badges',
    name: 'badges',
    component: BadegesComponent
  },
  {
    path: '/example',
    name: 'exampleComponent',
    component: ExampleComponent
  },
  {
    path: '/:pathMatch(.*)*',  // 捕获所有未匹配的路径
    redirect: '/example'  // 重定向到 "/example" 页面
  },
  {
    path: '/',
    redirect: '/example'  // 访问根路径时重定向到 "/example"
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
