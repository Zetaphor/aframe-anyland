import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,

  state: {
    objectCollisionFilter: 'default, hands, touchable',
    raycastObjectsFilter: '.collidable',

    buildMode: false,
    newObjectEl: null,
    newObjectPrims: [],

    initialZ: null,
    debugPhysics: true,
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
    generateUid: function () {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
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

    setShowLeftLaser (state, val) {
      state.showLeftLaser = val
    },

    setShowRightLaser (state, val) {
      state.showRightLaser = val
    },

    setBuildMode (state, val) {
      state.buildMode = val
    },

    addNewObjectPrim (state, primId) {
      state.newObjectPrims.push(primId)
    },

    removeNewObjectPrim (state, primId) {
      state.newObjectPrims.splice(state.newObjectPrims.indexOf(primId), 1)
    },

    clearNewObjectPrims (state) {
      state.newObjectPrims = []
    }
  },

  actions: {
    toggleLasers ({ dispatch }, val) {
      dispatch('toggleLeftLaser', val)
      dispatch('toggleRightLaser', val)
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