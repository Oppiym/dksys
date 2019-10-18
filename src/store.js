import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadedEvents: [{
                imageURL: 'http://s7606.pcdn.co/wp-content/uploads/2016/04/New-Yorker-1_tcm87-19419.jpg',
                id: 'fdfsfd',
                title: 'meetup in new york',
                date: '2018-12-30'
            },
            {
                imageURL: 'https://i3.photo.2gis.com/images/branch/1/140737493066473_b179.jpg',
                id: 'fd56d',
                title: 'meetup',
                date: '2019-11-20'
            }
        ],
        user: [ {
            id: 'sddadsadsa',
            registeredEvents: ['asfaffedwgewerfe']
        }]
    },
    mutations: {

    },
    actions: {

    },
    getters: {
        loadedEvents(state) {
            return state.loadedEvents.sort((eventA, eventB) => {
                return eventA.date > eventB.date
            })
        },
        featuredEvents(state,getters) {
            return getters.loadedEvents.slice(0,5);
        },
        loadedEvent(state) {
            return (eventId) => {
                return state.loadedEvents.find((event) => {
                    return event.id === eventId
                })
            }
        }
    }

})
