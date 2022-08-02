<template>
  <div class="message" v-if="isRenderMessage">
    <div class="nickname" v-bind:style="{ color: color }">{{ nickname }}</div>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "MessageComponent",
  props: {
    message: { type: String, default: "" },
    nickname: { type: String, default: "" },
    color: { type: String, default: "" },
  },
  setup(props) {
    const isRenderMessage = props.message !== "\n" && props.message !== "";
    return {
      isRenderMessage,
    };
  },
};
</script>

<style scoped lang="less">
.message {
  display: flex;
  word-break: break-all;
  margin-bottom: 8px;
}
.nickname {
  margin-right: 10px;
  font-family: Inter;
  font-weight: 600;
  font-size: 16px;
  white-space: nowrap;
}
</style>
