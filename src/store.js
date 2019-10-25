import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadedEvents: [],
        user: [{
            id: null,
        }],
        loading: false,
        error: null
    },
    mutations: {
        setLoadedEvents(state, payload) {
            state.loadedEvents = payload
        },
        createEvent(state, payload) {
            state.loadedEvents.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        loadEvents({
            commit
        }) {
            commit('setLoading', true)
            firebase.database().ref('events').once('value')
                .then((data) => {
                    const events = []
                    const obj = data.val()
                    for (let key in obj) {
                        events.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageURL: obj[key].imageURL,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
                        })
                    }
                    commit('setLoadedEvents', events)
                    commit('setLoading', false)
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                )
        },
        createEvent({ commit, getters }, payload) {
            const event = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                time: payload.time,
                creatorId: getters.user.id
            }

            let key
            let imageURL

            firebase.database().ref('events').push(event)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    const imageData = firebase.storage().ref('events/' + key + ext).put(payload.image)
                    console.log(imageData)
                    return imageData
                })
                .then ( imageData => {
                    const fullPath = imageData.metadata.fullPath
                    return firebase.storage().ref(fullPath).getDownloadURL()
                })
                .then ( imageURL =>{
                return firebase.database().ref('events').child(key).update({imageURL: imageURL})
               })
                .then(()=> {
                    commit('createEvent', {...event, imageURL: imageURL, id: key})

                })
                .catch((error) => {
                    console.log
                })

        },
        signUserUp({
            commit
        }, payload) {
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false)
                    commit('clearError')
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
        signUserIn({
            commit
        }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false)
                    commit('clearError')
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
        autoSignIn({
            commit
        }, payload) {
            commit('setUser', {
                id: payload.uid,
                registeredEvents: []
            })
        },
        logout({
            commit
        }) {
            firebase.auth().signOut()
            commit('setUser', false)
        },
        clearError({
            commit
        }) {
            commit('clearError')
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
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }


})
