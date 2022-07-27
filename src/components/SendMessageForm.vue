<template>
  <div class="form">
    <div class="form__textarea-wrapper">
      <textarea
        class="form__textarea"
        placeholder="Write here"
        @keyup.enter="sendMessage"
        v-model="newMessage"
        @input="autoResize"
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

    const setNicknameColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return randomColor;
    };
    const color = "#" + setNicknameColor();

    const sendMessage = () => {
      if (!newMessage.value.startsWith("\n")) {
        const messageData = {
          text: newMessage.value,
          sender_id: 1,
          channel_id: 1,
          created_at: new Date(),
          nickname_color: color,
        };

        store.commit("set", {
          messageData,
        });

        newMessage.value = "";

        store.dispatch("sendMessage");
        console.log(store.state.messagesList);
      }

      const textareas = document.querySelectorAll(".form__textarea");

      for (let i of textareas) {
        i.style.height = "80px";
      }
    };

    const autoResize = () => {
      const textareas = document.querySelectorAll(".form__textarea"),
        hiddenDiv = document.createElement("div");
      let content = null;

      for (let j of textareas) {
        j.classList.add("txtstuff");
      }
      hiddenDiv.classList.add("form__textarea");
      hiddenDiv.style.display = "none";
      hiddenDiv.style.whiteSpace = "pre-wrap";

      for (let i of textareas) {
        (function (i) {
          i.addEventListener("input", function () {
            i.parentNode.appendChild(hiddenDiv);
            content = i.value;
            content = content.replace(/\n/g, "<br>");
            hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';
            hiddenDiv.style.visibility = "hidden";
            hiddenDiv.style.display = "block";
            i.style.height = hiddenDiv.offsetHeight + "px";
            hiddenDiv.style.visibility = "visible";
            hiddenDiv.style.display = "none";
          });
        })(i);
      }
    };
    return {
      sendMessage,
      newMessage,
      autoResize,
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
