import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedEvents: [{
        imageURL: 'http://s7606.pcdn.co/wp-content/uploads/2016/04/New-Yorker-1_tcm87-19419.jpg',
        id: 'fdfsfd',
        title: 'meetup in new york',
        date: new Date()
      },
      {
        imageURL: 'https://i3.photo.2gis.com/images/branch/1/140737493066473_b179.jpg',
        id: 'fd56d',
        title: 'meetup',
        date: new Date()
      }
    ],
    user: [{
      id: null,
      registeredMeetups: []
    }]
  },
  mutations: {
    createEvent(state, payload) {
      state.loadedEvents.push(payload)
    },
    setUser(state, payload) {
      state.user.id = payload
    }
  },
  actions: {
    createEvent({
      commit
    }, payload) {
      const event = {
        title: payload.title,
        location: payload.location,
        imageURL: payload.imageURL,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        id: '34324twetew'
      }

      commit('createEvent', event)
    },
    signUserUp({
      commit
    }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: {
    loadedEvents(state) {
      return state.loadedEvents.sort((eventA, eventB) => {
        return eventA.date > eventB.date
      })
    },
    featuredEvents(state, getters) {
      return getters.loadedEvents.slice(0, 5);
    },
    loadedEvent(state) {
      return (eventId) => {
        return state.loadedEvents.find((event) => {
          return event.id === eventId
        })
      }
    },
    user(state) {
      return state.user
    }
  }

})