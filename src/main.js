// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index.js'
import utils from './utils/index.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.prototype.$api = api
Vue.prototype.$utils = utils

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data() {
    return {
      from: this.$route.query.from==undefined? 1 : this.$route.query.from,
      device: this.$route.query.device == undefined? 'device1': this.$route.query.device,
      inSwiper : false,
    }
  },
  mounted: function (){
    console.log("mainJS======from="+this.from+"----------device="+this.device);
  }
})
