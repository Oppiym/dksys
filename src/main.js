import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import DateFilter from './filtres/date'
import * as firebase from 'firebase'
import AlertCmp from  './components/Shared/Alert'
import EditEvent from './components/Event/Edit/EditEventDetailsDialog'
import EditEventDate from './components/Event/Edit/EditEventDateDialog'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit', EditEvent)
Vue.component('app-edit-date', EditEventDate)

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
    firebase.auth().onAuthStateChanged ( (user)=> {
        if (user) {
            this.$store.dispatch('autoSignIn', user)
        }
    });
    this.$store.dispatch('loadEvents')
  }
}).$mount('#app')
