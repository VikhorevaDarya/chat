<template>
  <div class="chat">
    <MessagesContainer />
    <SendMessageForm :channelID="channelID" />
  </div>
</template>

<script>
import MessagesContainer from "./MessagesContainer.vue";
import SendMessageForm from "./SendMessageForm.vue";

export default {
  name: "ChatComponent",
  props: {
    channelID: { type: Number, default: 0 },
  },
  components: {
    MessagesContainer,
    SendMessageForm,
  },
};
</script>

<style scoped lang="less">
@import "../utils/const.less";

.chat {
  max-width: 500px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: @light-grey;
}
</style>
