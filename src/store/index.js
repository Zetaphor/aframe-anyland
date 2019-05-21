import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,

  state: {
    handCollisionFilter: 'touchable, newPrims',
    objectCollisionFilter: 'default, hands, touchable',
    newPrimCollisionFilter: 'hands',
    raycastObjectsFilter: '.collides',

    buildMode: false,
    newObjectEl: null,
    newObjectPrims: [],

    debugPhysics: true,
    gravity: -9.8,
    physicsUpdates: 20,
    friction: 0.01,
    bounciness: 0.3,

    showLasers: true,
    showLeftLaser: false,
    showRightLaser: false,
    laserColor: '#118A7E',

    initialZ: null,
    enableFlying: false,
    moveSpeed: 0.1,
    rotateSpeed: 0.5,
    snapRotation: true,
    snapDegrees: 45
  },

  getters: {
    raycasterLine: state => {
      return `color: ${state.laserColor};`
    },

    activeHand: state => {
      if (state.showLeftLaser) return '#leftHand'
      else return '#rightHand'
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
    },

    setSnapRotation (state, snapRotation) {
      state.snapRotation = snapRotation
    }
  },

  actions: {
    toggleLasers ({ dispatch }, val) {
      dispatch('toggleLeftLaser', val)
      dispatch('toggleRightLaser', val)
    },

    toggleLeftLaser ({ commit }, val) {
      commit('setShowLeftLaser', val)
      window._elLeftHand.setAttribute('raycaster', {enabled: val, showLine: val})
      window._elLeftHand.setAttribute('custom-raycaster', {enabled: val, showLine: val})
    },

    toggleRightLaser ({ commit }, val) {
      commit('setShowRightLaser', val)
      window._elRightHand.setAttribute('raycaster', {enabled: val, showLine: val})
      window._elRightHand.setAttribute('custom-raycaster', {enabled: val, showLine: val})
    }
  }
})