import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

import materialize from  "materialize-css/dist/js/materialize.min"
import Slicksort from 'vue-slicksort';

import dateFilter from './filters/date.filter'
import curFilter from './filters/cur.filter'

import messagePlugin from './utils/message.plugin'

import VModal from 'vue-js-modal'

import Loader from '@/components/app/Loader'

Vue.use(materialize)
Vue.use(VModal)
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);
Vue.filter('cur', curFilter);
Vue.component('Loader', Loader);
Vue.component('Slicksort', Slicksort);



firebase.initializeApp(
  {
    apiKey: "AIzaSyAZFVczQ4yQ3qs1tg17V-VgVgOD1nAK-oY",
    authDomain: "homo-e00b0.firebaseapp.com",
    databaseURL: "https://homo-e00b0.firebaseio.com",
    projectId: "homo-e00b0",
    storageBucket: "homo-e00b0.appspot.com",
    messagingSenderId: "184110229052",
    appId: "1:184110229052:web:cf7d149074ad8719e98539",
    measurementId: "G-F36TH45QP6"
  }
)

let app

firebase.auth().onAuthStateChanged( () => {
  if(!app) {
    new Vue({
    router,
    store,
    render: h => h(App)
    }).$mount('#app')
  }
  
} )




    VModal.rootInstance = app;

Vue.config.productionTip = false


