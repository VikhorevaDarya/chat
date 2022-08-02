<template>
  <div class="form">
    <div
      class="form__textarea-wrapper"
      :class="{ 'form__textarea-wrapper_focus': isFocus }"
    >
      <textarea
        class="form__textarea"
        placeholder="Write here"
        @keyup.enter="sendMessage"
        v-model="newMessage"
        @input="textareaAutoResize"
        @focus="isFocus = true"
        @blur="isFocus = false"
      />
      <EmojiPicker :setEmoji="setEmoji" />
    </div>
    <div class="form__button" @click="sendMessage">
      <div class="form__button">Send</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import EmojiPicker from "./EmojiPicker.vue";
import store from "../store.js";

export default {
  name: "SendMessageForm",
  props: {
    channelID: { type: Number, default: 0 },
  },
  components: {
    EmojiPicker,
  },
  setup(props) {
    const newMessage = ref("");
    const isFocus = ref(false);
    console.log(store.state.messagesList);

    const setEmoji = (data) => {
      if (data) {
        newMessage.value = newMessage.value + data.native;
      }
    };

    const fetchToSendMessage = () => {
      const url = "https://wedev.upstream.team/api/chat/v1/send-message";
      const data = {
        text: newMessage.value,
        channel_id: props.channelID,
      };
      fetch(`${url}`, {
        method: "post",
        body: JSON.stringify(data),
      });
    };

    const sendMessage = () => {
      const isSendMessage =
        !newMessage.value.startsWith("\n") && newMessage.value !== "";
      if (isSendMessage) {
        fetchToSendMessage();
      }
      newMessage.value = "";

      const textareas = document.querySelectorAll(".form__textarea");
      for (let i of textareas) {
        i.style.height = "55px";
      }
    };

    const autoResize = (e) => {
      e.forEach(function (element) {
        element.style.boxSizing = "border-box";
        const offset = element.offsetHeight - element.clientHeight;
        element.addEventListener("input", function (event) {
          event.target.style.height = "auto";
          event.target.style.height = event.target.scrollHeight + offset + "px";
        });
        element.removeAttribute("data-autoresize");
      });
    };

    const textareaAutoResize = () => {
      const textarea = document.querySelectorAll("textarea");
      const textareaWrapper = document.querySelectorAll(
        "form__textarea-wrapper"
      );
      autoResize(textarea);
      autoResize(textareaWrapper);
    };

    return {
      sendMessage,
      newMessage,
      textareaAutoResize,
      setEmoji,
      isFocus,
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
    background-color: @primary-blue;
    color: @utility-white;
    cursor: pointer;
  }
  &__textarea-wrapper {
    width: 100%;
    display: flex;
    background-color: @utility-white;
    min-height: 55px;
    max-height: 150px;
    margin-bottom: 10px;
    &_focus {
      border: 1px solid @primary-blue;
      box-shadow: @dark-box-shadow;
    }
  }
  &__textarea {
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
    min-height: 55px;
    max-height: 150px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    resize: none;
    padding: 5px;
    border: none;
    outline: none;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-bottom: 10px;
  }
}
</style>
