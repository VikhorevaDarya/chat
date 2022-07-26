<template>
  <div class="form">
    <div class="form__textarea">
      <textarea
        class="form__textarea"
        placeholder="Write here"
        @keyup.enter="sendMessage"
        v-model="newMessage"
      />
      <textarea-autosize
        placeholder="Type something here..."
        ref="myTextarea"
        v-model="value"
        :min-height="30"
        :max-height="350"
      />
    </div>
    <div class="form__button" @click="sendMessage">
      <div class="form__button">Send</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import store from "../store.js";

export default {
  name: "SendMessageForm",
  setup() {
    const newMessage = ref("");
    const sendMessage = () => {
      if (!newMessage.value.startsWith("\n")) {
        store.commit("set", {
          message: newMessage.value,
        });
        newMessage.value = "";
        store.dispatch("sendMessage");
      }
    };
    return {
      sendMessage,
      newMessage,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../utils/const.less";

.form {
  position: relative;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &__button {
    width: 30px;
    height: 15px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @coupons-shadow-backround;
    color: @utility-white;
    cursor: pointer;
  }
  &__textarea {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
