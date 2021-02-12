import Vue from 'vue'
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'es', // Default locale
  // We use `date-fns` under the hood
})
import App from './App.vue'
import nota from './components/nota/nota.vue'
Vue.component(nota)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
