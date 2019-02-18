import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persistedstate';
import { RootState } from './states-types';
import { ImageModule, UserModule } from './modules';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    version: '1.0.0',
  },
  modules: {
    ImageModule,
    UserModule,
  },
  plugins: [VuexPersist({ storage: window.sessionStorage })],
  mutations: {

  },
  actions: {

  },
});
