import Vue from 'vue'
import App from './App.vue'
import VueBus from 'vue-bus';

Vue.config.productionTip = false
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
  'a-text'
]

new Vue({
  render: h => h(App),
}).$mount('#app')
