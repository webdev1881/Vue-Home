import firebase from 'firebase/app'
import { register } from 'register-service-worker'

export default {

    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
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
                    var user = result.user;
                });
            } catch (e) {
                throw e
            }
        },


        async loginPhone({ dispatch, commit }, phNo) {

            this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

            const appVerifier = this.recaptchaVerifier;
            const phoneNumberString = "+380991516010";
            firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
                .then(confirmationResult => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    let prompt = this.alertCtrl.create({
                        title: 'Enter the Confirmation code',
                        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
                        buttons: [
                            {
                                text: 'Cancel',
                                handler: data => { console.log('Cancel clicked'); }
                            },
                            {
                                text: 'Send',
                                handler: data => {
                                    confirmationResult.confirm(data.confirmationCode)
                                        .then(function (result) {
                                            // User signed in successfully.
                                            console.log(result.user);
                                            // ...
                                        }).catch(function (error) {
                                            // User couldn't sign in (bad verification code?)
                                            // ...
                                        });
                                }
                            }
                        ]
                    });
                    prompt.present();
                })
                .catch(function (error) {
                    console.error("SMS not sent", error);
                });


            // var code = getCodeFromUserInput();
            // confirmationResult.confirm(code).then(function (result) {
            //   // User signed in successfully.
            //   var user = result.user;
            //   // ...
            // }).catch(function (error) {
            //   // User couldn't sign in (bad verification code?)
            //   // ...
            // });






            // firebase.auth().languageCode = 'it';
            // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            //     'size': 'invisible',
            //     'callback': function(response) {
            //       // reCAPTCHA solved, allow signInWithPhoneNumber.
            //       onSignInSubmit();
            //     }
            // });
            // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        },

        async logout() {
            await firebase.auth().signOut()
        },

        async register({ dispatch }, { email, password, name }) {
            try {
                firebase.auth().createUserWithEmailAndPassword(email, password)
            } catch (e) {
                throw e
            }

        }
    }







}