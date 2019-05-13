import Vue from 'vue'
import './components'
import './plugins'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from '@/router'
import store from '@/store'
import VCharts from 'v-charts'
import Vuetify from 'vuetify'
sync(store, router)
Vue.use(VCharts)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
