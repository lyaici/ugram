import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';
import '../node_modules/normalize.css/normalize.css';

library.add(faSearch, faPlus, faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
