import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/Layouts/DefaultLayout.vue'),
    redirect: '/home',
    children: [
      { path: 'home', component: () => import('@/views/Home.vue') },
      { path: 'eventdoc', component: () => import('@/views/EventDoc.vue') },
      { path: 'eventdoc/:id', component: () => import('@/views/EventDoc.vue') },
      { path: 'registration', component: () => import('@/views/Registration.vue') },
      { path: 'registration/form', component: () => import('@/views/RegistrationForm.vue') },
      { path: 'profile', component: () => import('@/views/Profile.vue') },
    ]
  },
  // 登录和注册页面不需要 Navbar，单独配置
  { path: '/register', component: () => import('@/views/Register.vue') },
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
