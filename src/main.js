import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import DateFilter from './filtres/date'
import * as firebase from 'firebase'
import AlertCmp from  './components/Shared/Alert'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert',AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB0GjIB4x2ewFE6l01tUWck1w6LtHtK74k',
      authDomain: 'dksys-73c56.firebaseapp.com',
      databaseURL: 'https://dksys-73c56.firebaseio.com',
      projectId: 'dksys-73c56',
      storageBucket: 'dksys-73c56.appspot.com',
      messagingSenderId: '1097420408959',
      appId: '1:1097420408959:web:ea700b9d681ef7f3de974a',
      measurementId: 'G-B673LJXFFZ'
    })
    this.$store.dispatch('loadEvents')
  }
}).$mount('#app')
