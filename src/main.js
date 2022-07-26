import { createApp } from "vue";
import App from "./App.vue";
import VueTextareaAutosize from "vue-textarea-autosize";

import "./assets/main.css";

const app = createApp(App);

app.mount("#app");
app.use(VueTextareaAutosize);
