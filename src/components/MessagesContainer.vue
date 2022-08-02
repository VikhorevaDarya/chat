<template>
  <div class="container" id="interact">
    <Message
      v-for="message in messagesList"
      v-bind:key="message"
      :message="message.message"
      :nickname="message.user_data.name"
      :color="message.user_data.color"
    />
  </div>
</template>

<script>
import Message from "./Message.vue";
import store from "../store.js";
import { computed, watch } from "vue";

export default {
  name: "MessagesContainer",
  components: {
    Message,
  },
  setup() {
    const messagesList = computed(() => store.state.messagesList);

    const scrollToBottom = () => {
      const messages = document.querySelectorAll(".message");
      const lastMessage = messages.length - 1;
      if (messages.length >= 1) {
        messages[lastMessage].scrollIntoView();
      }
    };
    watch(messagesList.value, () => {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    });

    return {
      messagesList,
      scrollToBottom,
    };
  },
};
</script>

<style scoped lang="less">
.container {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
</style>
