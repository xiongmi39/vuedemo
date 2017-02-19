'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import router from './routers';
import store from './vuex/store';
import Highcharts from 'highcharts';
import VueHighcharts from 'vue-highcharts';

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueHighcharts);

Vue.component('nv-head',require('./components/head.vue'));
Vue.component('nv-bottom',require('./components/bottom.vue'));
const app = new Vue({
  router,
  store
}).$mount('#app')

Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// Vue.component('nv-head', require('./components/head.vue'));