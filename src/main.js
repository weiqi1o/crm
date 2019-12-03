import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.less';
import Antd from 'ant-design-vue';
import $ from 'jquery'
import './../static/css/theme/index.less'
import VueWechatTitle from 'vue-wechat-title'
import { ColorPicker } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueWechatTitle);
Vue.use(ColorPicker);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
