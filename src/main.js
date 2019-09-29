import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Vuelidate from 'vuelidate';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

import  "materialize-css/dist/js/materialize.min"
import  faUserSecret  from '@fortawesome/free-solid-svg-icons'

import dateFilter from './filters/date.filter'
import messagePlugin from './utils/message.plugin'

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(faUserSecret);
Vue.filter('date', dateFilter);
//Vue.use(firebase);

firebase.initializeApp(
  {
  apiKey: "AIzaSyBUrMcmJFWj-L6ZZ3CARn29-117CrZu3HA",
  authDomain: "home-money-8e8e3.firebaseapp.com",
  databaseURL: "https://home-money-8e8e3.firebaseio.com",
  projectId: "home-money-8e8e3",
  storageBucket: "home-money-8e8e3.appspot.com",
  messagingSenderId: "796107806203",
  appId: "1:796107806203:web:80c60daaecc945c6"
  }
)


    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')




Vue.config.productionTip = false


