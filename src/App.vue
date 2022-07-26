<template>
  <Chat :channelID="1" />
</template>

<script>
import Chat from "./components/Chat.vue";

export default {
  name: "App",
  components: {
    Chat,
  },
};
</script>

<style scoped></style>
