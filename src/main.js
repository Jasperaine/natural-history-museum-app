import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "font-awesome/css/font-awesome.min.css";

Vue.config.productionTip = false;

Vue.component(
  "VueFontawesome",
  require("vue-fontawesome-icon/VueFontawesome.vue").default
);

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
