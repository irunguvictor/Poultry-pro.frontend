// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // Stores user information
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      // Perform login logic (e.g., API call)
      // On success:
      commit('setUser', user);
    },
    logout({ commit }) {
      // Perform logout logic
      commit('clearUser');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
  },
});
