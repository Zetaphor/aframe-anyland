import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,

  state: {
    initialZ: null,
    debugPhysics: false,
    buildMode: false,
    showLasers: true,
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
      return state.showLasers ? `color: ${state.laserColor}` : false
    }
  },

  mutations: {
    setFlying (state, val) {
      state.enableFlying = val
    },

    setInitialZ (state, val) {
      state.initialZ = val
    },

    setPhysicsDebug (state, val) {
      state.debugPhysics = val
    }
  }
})