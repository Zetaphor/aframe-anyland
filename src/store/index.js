import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,

  state: {
    buildMode: false,
    showLasers: false,
    laserColor: '#118A7E',
    enableFlying: false,
    moveSpeed: 0.1,
    rotateSpeed: 0.5,
    snapRotation: true,
    snapDegrees: 45
  },

  getters: {
    raycaster: state => {
      return state.showLasers ? 'objects: .collidable' : false
    },

    raycasterLine: state => {
      return state.showLasers ? `color${state.laserColor}` : false
    }
  },

  mutations: {

  }
})