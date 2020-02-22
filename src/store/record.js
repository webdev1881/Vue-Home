import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const id = await dispatch('getId')
        console.log( record );
        return await firebase.database().ref(`/users/${id}/records`).push(record)
        
        
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getId')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}       
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getId')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return {...record, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
