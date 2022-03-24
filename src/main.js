import Vue from "vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
const moment = require('moment');
import App from "./App.vue";
import router from "./router";

import './app.scss'

Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

require('moment/locale/en-in');
 
Vue.use(require('vue-moment'), {
    moment
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
