import Vue from 'vue'
import App from './App.vue'
import VueBus from 'vue-bus'
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueBus)

Vue.config.ignoredElements = [
  'a-scene',
  'a-assets',
  'a-mixin',
  'a-entity',
  'a-camera',
  'a-sky',
  'a-box',
  'a-cylinder',
  'a-cone',
  'a-sphere',
  'a-text',
  'a-instancedmesh'
]

const windowVue = new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

window.vueObj = windowVue