import Vue from 'vue';
import Vuex from 'vuex';

import firebase, { googleProvider } from './firebase';

const auth = firebase.auth();
const db = firebase.firestore();

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: undefined,

    messages: [],
  },
  getters: {
    isLoggedIn(state) {
      return state.user !== undefined;
    },
  },
  mutations: {
    setUser(state, { email, displayName }) {
      state.user = { email, name: displayName };
    },
    pushMessage(state, message) {
      state.messages.push(message);

      if (state.messages.length > 100) {
        state.messages.shift();
      }
    },
    deleteMessage(state, id) {
      state.messages = state.messages.filter((m) => m.id !== id);
    },
    resetAuth(state) {
      state.user = undefined;
    },
  },
  actions: {
    sendMessage(_, { text }) {
      if (auth.currentUser) {
        return db.collection('messages')
          .add({
            text,
            time: new Date(),
            user: {
              name: auth.currentUser.displayName,
              uid: auth.currentUser.uid,
            },
          });
      }

      return Promise.reject(new Error('nouser'));
    },
    signInWithGoogle({ commit }) {
      return auth.signInWithPopup(googleProvider).then(() => {
        setTimeout(() => {
          commit('setIsSettingsPanelOpen', false);
        }, 350);
      });
    },
    signOut({ commit }) {
      return auth.signOut()
        .then(() => {
          commit('resetAuth');

          setTimeout(() => {
            commit('setIsSettingsPanelOpen', false);
          }, 350);
        });
    },
  },
});

export default store;
