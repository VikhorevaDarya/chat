<template>
  <Picker
    v-show="showEmojiPicker"
    :title="'Emoji'"
    :backgroundImageFn="
      (set, sheetSize) => `/img/emoji/${set}/${sheetSize}.png`
    "
    set="apple"
    emoji="point_up"
    :native="false"
    @select="addEmoji"
    :data="emojiIndex"
  />

  <span
    class="emoji-trigger"
    :class="{ triggered: showEmojiPicker }"
    @mousedown.prevent="toggleEmojiPicker"
  >
    <Smiley />
  </span>
</template>

<script>
import { ref } from "vue";
import Smiley from "../svg/Smiley.vue";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import data from "emoji-mart-vue-fast/data/apple.json";
import "emoji-mart-vue-fast/css/emoji-mart.css";

export default {
  name: "EmojiPicker",
  components: {
    Smiley,
    Picker,
  },
  props: ["setEmoji"],
  setup(props) {
    const showEmojiPicker = ref(false);
    let emojiIndex = new EmojiIndex(data);

    const toggleEmojiPicker = () => {
      showEmojiPicker.value = !showEmojiPicker.value;
    };

    const addEmoji = (emoji) => {
      props.setEmoji(emoji);
    };
    return {
      showEmojiPicker,
      addEmoji,
      toggleEmojiPicker,
      emojiIndex,
    };
  },
};
</script>

<style lang="less">
@import "../utils/const.less";

.emoji-mart {
  height: 250px;
  position: absolute;
  top: 33px;
  right: 10px;
  z-index: 9999;
}
.emoji-mart-bar-preview {
  display: none;
}
.emoji-mart-search {
  display: none;
}
.emoji-mart-category-label {
  display: none;
}
.emoji-trigger {
  margin: 5px;
  cursor: pointer;
  height: 20px;
}
.emoji-trigger path {
  transition: 0.1s all;
}
.emoji-trigger.triggered path {
  fill: @primary-blue;
}
</style>
