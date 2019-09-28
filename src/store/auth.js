import firebase from 'firebase/app'
import { register } from 'register-service-worker'

export default {

    actions: {
        async login( {dispatch, commit}, {email, password} ) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                throw e               
            }
        },
        async logout() {
            await firebase.auth().signOut()
        },

        async register( {dispatch}, {email, password, name}) {           
            try {
               firebase.auth().createUserWithEmailAndPassword(email, password)  
            } catch (e) {
                throw e
            }

        }
    }







}