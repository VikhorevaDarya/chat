<template>
  <div class="form">
    <div class="form__textarea-wrapper">
      <EmojiPicker :setEmoji="setEmoji" />
      <textarea
        ref="textarea"
        class="form__textarea"
        placeholder="Write here"
        @keyup.enter="sendMessage"
        v-model="newMessage"
        @input="autoResize"
      />
      <Emoji />
    </div>
    <div class="form__button" @click="sendMessage">
      <div class="form__button">Send</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import store from "../store.js";
import EmojiPicker from "./EmojiPicker.vue";

export default {
  name: "SendMessageForm",
  props: {
    channelID: { type: Number, default: 0 },
  },
  components: {
    EmojiPicker,
  },
  setup(props) {
    const setNicknameColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return randomColor;
    };

    const color = "#" + setNicknameColor();
    const newMessage = ref("");

    const setEmoji = (data) => {
      if (data) {
        newMessage.value = newMessage.value + data.native;
      }
    };

    const sendMessage = () => {
      if (!newMessage.value.startsWith("\n")) {
        const messageData = {
          text: newMessage.value,
          sender_id: 1,
          channel_id: props.channelID,
          created_at: new Date(),
          nickname_color: color,
        };

        store.commit("set", {
          messageData,
        });

        newMessage.value = "";

        store.dispatch("sendMessage");
      }

      const textareas = document.querySelectorAll(".form__textarea");

      for (let i of textareas) {
        i.style.height = "80px";
      }
    };

    const autoResize = () => {
      document.querySelectorAll("textarea").forEach(function (element) {
        element.style.boxSizing = "border-box";
        var offset = element.offsetHeight - element.clientHeight;
        element.addEventListener("input", function (event) {
          event.target.style.height = "auto";
          event.target.style.height = event.target.scrollHeight + offset + "px";
        });
        element.removeAttribute("data-autoresize");
      });
    };
    return {
      sendMessage,
      newMessage,
      autoResize,
      setEmoji,
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
  &__textarea-wrapper {
    width: 100%;
    padding: 0 6px 0 18px;
  }
  &__textarea {
    width: 100%;
    max-width: 500px;
    box-sizing: border-box;
    min-height: 80px;
    max-height: 150px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    resize: none;
    padding: 5px;
    border: none;
    outline: none;
    overflow: scroll;
    margin-bottom: 10px;
    &:focus {
      border: 1px solid blue;
    }
  }
}
</style>
