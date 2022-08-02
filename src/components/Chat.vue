<template>
  <div class="chat">
    <MessagesContainer />
    <SendMessageForm
      :channelID="channelID"
      @set-emoji="setEmoji"
      @click="setEmoji"
    />
  </div>
</template>

<script>
import MessagesContainer from "./MessagesContainer.vue";
import SendMessageForm from "./SendMessageForm.vue";
import Pusher from "pusher-js";
import store from "../store.js";

export default {
  name: "ChatComponent",
  props: {
    channelID: { type: Number, default: 0 },
    token: { type: Number, default: 0 },
  },
  components: {
    MessagesContainer,
    SendMessageForm,
  },
  setup(props) {
    const scrollToBottom = () => {
      const messages = document.querySelectorAll(".message");
      const lastMessage = messages.length - 1;
      if (messages.length >= 1) {
        messages[lastMessage].scrollIntoView();
      }
    };

    Pusher.logToConsole = true;

    const pusher = new Pusher("app-key", {
      cluster: "us2",
      wsHost: "chat-wedev.upstream.team",
      wsPort: 443,
      forceTLS: false,
      encrypted: true,
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });

    const channel = pusher.subscribe("chat." + props.channelID);
    channel.bind("new-message", async function (data) {
      await store.commit("set", {
        messagesList: [...store.state.messagesList, data],
      });
      scrollToBottom();
    });
  },
};
</script>

<style scoped lang="less">
@import "../utils/const.less";

.chat {
  max-width: 500px;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: @light-grey;
}
</style>
