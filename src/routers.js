import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex'

import Index from './index.vue';
import Detail from './views/detail.vue';
import Readdata from './views/readdata.vue';

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  { path: '/', component: Index },
  { path: '/detail', component: Detail },
  { path: '/readdata', component: Readdata }
]

let router = new VueRouter({
	routes:routes
});

export default router



