// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vant from "vant";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
Vue.config.productionTip = false;
import "@/assets/js/http/http";
import "@/assets/js/http/url";

import "vant/lib/index.css";
Vue.use(Vant);
Vue.use(Antd);
Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
