import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      messagesList: [],
    };
  },
  mutations: {
    set(state, data) {
      Object.assign(state, data);
    },
    update(state, data) {
      state = { ...state, ...data };
    },
  },
});

export default store;
