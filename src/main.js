import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
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
  'a-sphere'
]

new Vue({
  render: h => h(App),
}).$mount('#app')
