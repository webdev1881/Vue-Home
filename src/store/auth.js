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
        async loginGoogle() {
            try {
                var provider = await new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                await firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                });
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