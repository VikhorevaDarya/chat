import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      messagesList: [],
      messageData: {
        user_data: {
          id: 1,
          color: "",
          name: "",
        },
        message: "",
      },
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
  actions: {
    sendMessage(ctx) {
      ctx.state.messagesList.push(ctx.state.messageData);
    },
  },
});

export default store;
