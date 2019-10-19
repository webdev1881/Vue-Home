import firebase from 'firebase/app';

export default {

    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit( 'setError', e )
                throw e
            }
        },

        async loginGoogle() {
            try {
                var provider = await new firebase.auth.GoogleAuthProvider();
                provider.addScope('profile');
                provider.addScope('email');
                await firebase.auth().signInWithPopup(provider).then(function (result) {
                    var token = result.credential.accessToken;
                    var user = result.user
                    firebase.database().ref(`/users/${user.uid}`).once('value').then(function(snapshot) {
                        if(!snapshot.val()){
                            firebase.database().ref(`/users/${user.uid}/info`).set({ name: user.email, bill: 0})
                        }
                    })        
                });
                
            } catch (e) {
                throw e
            }
        },


        async loginPhone( phNo) {           

            try {
            let recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container")
            let appVerifier = recaptchaVerifier;
            let phoneNumberString = '+380991516010';
            //let verification = await  window.prompt('Enter verification code')

            await firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
              .then( (confirmationResult) => {

                let verification =  window.prompt('Enter verification code')
                 console.log(this)
            
               
                
                confirmationResult.confirm(verification)

                
              })
              .catch((err) => {
                console.log('sms not sent', err);
                throw err
              }); 
            } catch (e) {
                throw e
            }
                                
        },

        async logout() {
            await firebase.auth().signOut()
        },

        async register({ dispatch }, { email, password, name }) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const id = await dispatch('getId')
                await firebase.database().ref(`/users/${id}/info`).set({ name, bill: 0})
            } catch (e) {
                throw e
            }
        },

        getId() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }







}


// let ob = {};


// for(var k in source.days ) {

//   let day = source.days[k]

//   let concat = `${day.start}-${day.end}`

//   ob[concat] = ([(ob[concat] || '')] +  [k] + ',');



// }

// console.log( ob )



// for(var i in ob) {
//   let weekDay = ob[i].split(',');
  
//   console.log( weekDay )

// };



// const source = {
//     order: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     days: {
//       Monday: {
//         start: 10,
//         end: 19.5
//       },
//       Tuesday: {
//         start: 10.75,
//         end: 23.5
//       },
//       Wednesday: {
//         start: 10.75,
//         end: 23.5
//       },
//       Thursday: {
//         start: 10.75,
//         end: 23.5
//       },
//       Saturday: {
//         start: 9,
//         end: 18
//       },
//       Sunday: {
//         start: 9,
//         end: 18
//       }
//     }
//   }
  
//   const source2 = {
//     order: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     days: {
//       Monday: {
//         start: 9,
//         end: 18.35
//       },
//       Tuesday: {
//         start: 10,
//         end: 19.2
//       },
//       Wednesday: {
//         start: 9,
//         end: 18.35
//       },
//       Thursday: {
//         start: 10,
//         end: 19.2
//       },
//       Saturday: {
//         start: 10,
//         end: 19.2
//       },
//       Sunday: {
//         start: 10,
//         end: 19.2
//       }
//     }
//   }
  
//   const source3 = {
//     order: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//     days: {
//       Monday: {
//         start: 7.5,
//         end: 18.5
//       },
//       Tuesday: {
//         start: 7.5,
//         end: 18.5
//       },
//       Saturday: {
//         start: 7.5,
//         end: 18.5
//       },
//       Sunday: {
//         start: 9,
//         end: 18
//       }
//     }
//   };



  
// <!-- Period 1
// Mon: 10:00 AM - 7:30 PM
// Tue - Thu: 10:45 AM - 11:30 PM
// Sat - Sun: 9:00 AM - 6:00 PM -->

// <!-- Period 2
// Mon: 9:00 AM - 6:21 PM
// Tue: 10:00 AM - 7:11 PM
// Wed: 9:00 AM - 6:21 PM
// Thu: 10:00 AM - 7:11 PM
// Sat - Sun: 10:00 AM - 7:11 PM -->


// <!-- Period 3
// Mon - Tue: 7:30 AM - 6:30 PM
// Sat: 7:30 AM - 6:30 PM
// Sun: 9:00 AM - 6:00 PM -->

