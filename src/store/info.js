import firebase from 'firebase/app';

export default {
    state: {
        info: {}
    },
    actions: {
        async fetchinfo( {dispatch, commit} ){
            const id = await dispatch('getId')           
            const info = (await firebase.database().ref(`/users/${id}/info`).once('value')).val()
            commit('setInfo', info)
        }
    },
    mutations: {
        setInfo( state, info ) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    getters: {
        info: s => s.info
    }
}