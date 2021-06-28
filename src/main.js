import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionAPI from '@vue/composition-api'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBackward,faPlay,faPause,faSquare,faForward,faVolumeUp,faVolumeDown,faVolumeMute,faSync,faThList,faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import PortalVue from 'portal-vue'
Vue.use(PortalVue)

library.add(faBackward,faPlay,faPause,faSquare,faForward,faVolumeUp,faVolumeDown,faVolumeMute,faSync,faThList,faAngleRight);
// library.add(fab)

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
