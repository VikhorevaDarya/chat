import { createStore } from "vuex";
//import axios from "axios";

const store = createStore({
  state() {
    return {
      messagesList: [],
      messageData: {
        text: "",
        sender_id: 1,
        channel_id: 1,
        created_at: new Date(),
        nickname_color: "",
      },
    };
  },
  getters: {},
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
      // axios.post(route("api.messages.sendMessage"), {
      //   dialog_id: ctx.state.currentDialog.id,
      //   text: payload.text,
      // });
      // ctx.dispatch("fetchDialogList");
    },
    // showSearch({ commit }) {
    //   commit("set", { isShowSearch: true });
    // },
    // async silentActivation(context, url) {
    //   await sendContentMessage({ action: "silentActivation", data: { url } });
    // },
    // changeScreen({ commit }, screenName) {
    //   return commit("set", {
    //     activeScreen: screenName,
    //     isShowSearch: false,
    //   });
    // },
    // async updateSettings({ commit }, newSettings) {
    //   const { updatedSettings = {} } = await sendContentMessage({
    //     action: "updateSettings",
    //     data: {
    //       newSettings,
    //     },
    //   });
    //   commit("set", {
    //     settings: updatedSettings,
    //   });
    // },
  },
});

export default store;