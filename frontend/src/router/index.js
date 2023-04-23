import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  // Added a path to userLogin.vue
  {
    path: '/userlogin',
    name: 'userlogin',
    component: () => import('../components/userLogin.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue')
  },
  // Added a path to addService.vue page
  {
    path: '/addservice',
    name: 'addservice',
    props: true,
    component: () => import('../components/addService.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  },
  // Added a path to serviceList.vue for viewers to view only active services
  {
    path: '/servicelist',
    name: 'servicelist',
    component: () => import('../components/serviceList.vue')
  },
  // updateService.vue 
  {
    path: '/updateservice/:id',
    name: 'updateservice',
    component: () => import('../components/updateService.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router