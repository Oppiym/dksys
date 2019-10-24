import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Events from '@/components/Event/Events'
import CreateEvents from '@/components/Event/CreateEvents'
import Event from '@/components/Event/Event'
import Clubs from '@/components/Club/Clubs'
import CreateClubs from '@/components/Club/CreateClubs'
import Club from '@/components/Club/Club'
import News from '@/components/News/News'
import CreateNews from '@/components/News/CreateNews'
import Article from '@/components/News/Article'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import AuthGuard from '@/router/auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
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
      component: CreateEvents,
      beforeEnter: AuthGuard
    },
    {
      path: '/events/:id',
      name: 'Event',
      component: Event,
      props: true
    }, {
      path: '/clubs',
      name: 'Clubs',
      component: Clubs
    },
    {
      path: '/clubs/new',
      name: 'CreateClubs',
      component: CreateClubs
    },
    {
      path: '/events/:id',
      name: 'Club',
      component: Club,
      props: true
    }, {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/news/new',
      name: 'CreateNews',
      component: CreateNews
    },
    {
      path: '/news/:id',
      name: 'Article',
      component: Article,
      props: true
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
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
