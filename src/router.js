import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Events from '@/components/Event/Events'
import CreateEvents from '@/components/Event/CreateEvents'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
  },
  {
    path: '/events',
    name: 'Events',
    component: Events
},
{
  path: '/events/new',
  name: 'CreateEvents',
  component: CreateEvents
},
{
  path: '/profile',
  name: 'Profile',
  component: Profile
},
{
  path: '/signup',
  name: 'Signup',
  component: Signup
},
{
  path: '/signin',
  name: 'Signin',
  component: Signin
}
  ]
})
