import Vue from 'vue';
import iview from 'iview';
import App from './App.vue';
import router from './router';
import store from './store';
import * as THREE from 'three';
import Stats from 'stats.js';
import TWEEN from '@tweenjs/tween.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'iview/dist/styles/iview.css';

Vue.use(iview)

window.THREE = THREE;
window.Stats = Stats;
window.TWEEN = TWEEN;

require('three/examples/js/controls/OrbitControls');
require('@/assets/lib/ThreeBSP');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
