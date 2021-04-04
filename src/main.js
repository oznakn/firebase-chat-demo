import Vue from 'vue';

import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

new Vue({
  render: (h) => h(App),
  store,
  methods: {
    getWidth() {
      return window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    },
    getHeight() {
      return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    },
  },
  computed: {
    isMobile() {
      return this.getWidth() <= 1000;
    },
  },
}).$mount('#app');
