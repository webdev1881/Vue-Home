import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getId')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async updateCategory({commit, dispatch}, {title, id, descript}) {
      try {
        const uid = await dispatch('getId')
        //console.log({title, descript, id});
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, descript})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategories({commit, dispatch}, categories) {
      try {
        const uid = await dispatch('getId')

        console.log( firebase.database().ref(`/users/${uid}/categories`) );
        

        await firebase.database().ref(`/users/${uid}/categories`).remove()
        
        categories.forEach( async (item, i, arr)=> {        
          let title = item.title;
          let descript = item.descript
          
          await firebase.database().ref(`/users/${uid}/categories`).push({title, descript})          
        } )
      //  console.log( categories );
      //  await firebase.database().ref(`/users/${uid}/categories`).update(categories).set()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteCategory({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getId')
        //console.log(id);
        await firebase.database().ref(`/users/${uid}/categories`).child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {title, descript}) {
      try {
        const uid = await dispatch('getId')
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, descript})
        return {title, descript, id: category.key}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
