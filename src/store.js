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
            registeredEvents: ['fdfdfwfewgwerer']
        }],
        loading: false,
        error: null
    },
    mutations: {
        setLoadedEvents (state,payload) {
            state.loadedEvents = payload
        },
        createEvent(state, payload) {
            state.loadedEvents.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading (state,payload){
            state.loading = payload
        },
        setError (state, payload){
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadEvents({commit}) {
            commit('setLoading',true)
            firebase.database().ref('events').once('value')
            .then ((data)=>{
                const events = []
                const obj = data.val()
                for (let key in obj) {
                    events.push({
                        id:key,
                        title: obj[key].title,
                        description: obj[key].description,
                        imageURL:obj[key].imageURL,
                        date:obj[key].date
                    })
                }
                commit('setLoadedEvents', events)
                commit('setLoading',false)
            })
            .catch (
                (error) => {
                    console.log (error)
                    commit('setLoading',false)
                }
            )
        },
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
            }
            firebase.database().ref('events').push(event)
            .then((data) => {
                const key = data.key
                commit('createEvent', {
                ...event,
            id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })

        },
        signUserUp({
            commit
        }, payload) {
            commit ('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false)
                    commit ('clearError')
                    const newUser = {
                        id: user.user.uid,
                        registeredEvents: []
                    }
                    commit('setUser', newUser)
                })
                .catch(error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                })
        },
        signUserIn ({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('setLoading', false)
                commit ('clearError')
                const newUser = {
                    id: user.user.uid,
                    registeredEvents: []
                }
                commit('setUser', newUser)
            })
            .catch(error => {
                commit('setLoading', false)
                commit('setError', error)
                console.log(error)
            })

        },
        clearError ({commit}) {
            commit ('clearError')
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
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        }
    }

})
