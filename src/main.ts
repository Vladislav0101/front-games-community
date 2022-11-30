import { createApp, h, provide } from "vue";
import { createPinia } from "pinia";
import { DefaultApolloClient } from "@vue/apollo-composable";

import ApolloClient from "@/plugins/ApolloClient";
import App from "./App.vue";
import router from "./router";

import "@/assets/styles/index.scss";

const pinia = createPinia();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, ApolloClient);
  },

  render: () => h(App),
});

app.use(pinia);
app.use(router);
app.mount("#app");
