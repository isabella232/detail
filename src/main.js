import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import { Row, Column } from 'vue-grid-responsive'

import 'vue-select/dist/vue-select.css'
Vue.component('row', Row)
Vue.component('column', Column)



Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
