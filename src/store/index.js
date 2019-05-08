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
    showLeftLaser: false,
    showRightLaser: false,
    laserColor: '#118A7E',
    enableFlying: false,
    moveSpeed: 0.1,
    rotateSpeed: 0.5,
    snapRotation: true,
    snapDegrees: 45
  },

  getters: {
    raycaster: () => {
      return `objects: .collidable; enabled: false; showLine: false`
    },

    raycasterLine: state => {
      return `color: ${state.laserColor};`
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
    },

    setShowLasers (state, val) {
      this.showLasers = val
    },

    setShowLeftLaser (state, val) {
      this.showLeftLaser = val
    },

    setShowRightLaser (state, val) {
      this.showRightLaser = val
    }
  },

  actions: {
    toggleLasers ({ commit }, val) {
      commit('setShowLasers', val)
      let leftHand = document.querySelector('#leftHand')
      let rightHand = document.querySelector('#rightHand')
      leftHand.setAttribute('raycaster', {enabled: val, showLine: val})
      rightHand.setAttribute('raycaster', {enabled: val, showLine: val})
    },

    toggleLeftLaser ({ commit }, val) {
      commit('setShowLeftLaser', val)
      let leftHand = document.querySelector('#leftHand')
      leftHand.setAttribute('raycaster', {enabled: val, showLine: val})
    },

    toggleRightLaser ({ commit }, val) {
      commit('setShowRightLaser', val)
      let rightHand = document.querySelector('#rightHand')
      rightHand.setAttribute('raycaster', {enabled: val, showLine: val})
    }
  }
})