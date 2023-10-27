import { createApp } from "vue";
import App from "./App.vue";
import router from "./resources/router";
import store from "./resources/store";

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");

window.Kakao.init("32c148d16c25b3ee3fa4bf5641ae39a9");
