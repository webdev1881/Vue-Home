import firebase from 'firebase/app';

export default {
    state: {
        info: {}
    },
    actions: {
        async updateInfo({dispatch, commit, getters}, toUpdate) {
            try {
              const id = await dispatch('getId')
              const updateData = {...getters.info, ...toUpdate}

              
              
              await firebase.database().ref(`/users/${id}/info`).update(updateData)
              commit('setInfo', updateData)

              console.log({...getters.info});
              console.log({...toUpdate});

            } catch (e) {
              commit('setError', e)
              throw e
            }
          },
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