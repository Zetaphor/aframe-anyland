<template>
  <a-entity id="rig"
    :movement-controls="`controls: gamepad; speed:${$store.state.moveSpeed}; fly:${$store.state.enableFlying}`"
    @gripdown="buttonDown('gripPress')"
    @gripup="buttonUp('gripPress')"
    @gripclose="buttonDown('gripSqueeze')"
    @gripopen="buttonUp('gripSqueeze')"
    @trackpaddown="buttonDown('trackpad')"
    @trackpadup="buttonUp('trackpad')"
    @triggerdown="buttonDown('trigger')"
    @triggerup="buttonUp('trigger')"
    @abuttondown="buttonDown('a')"
    @abuttonup="buttonUp('a')"
    @bbuttondown="buttonDown('b')"
    @bbuttonup="buttonUp('b')"
    @xbuttondown="buttonDown('x')"
    @xbuttonup="buttonUp('x')"
    @ybuttondown="buttonDown('y')"
    @ybuttonup="buttonUp('y')"
    @pointup="buttonUp('point')"
    @pointdown="buttonDown('point')"
    @thumbup="buttonUp('thumb')"
    @thumbdown="buttonDown('thumb')"
    @pointingstart="buttonDown('pointing')"
    @pointingend="buttonUp('pointing')"
    @pistolstart="buttonDown('pistol')"
    @pistolend="buttonUp('pistol')"
    @thumbstickdown="buttonDown('thumbstick')"
    @thumbstickup="buttonUp('thumbstick')"
    @mousedown="buttonDown('mouse')"
    @mouseup="buttonUp('mouse')"
    @touchstart="buttonStart('touch')"
    @touchend="buttonStop('touch')">
    <a-entity id="camera" camera position="0 3.2 0"></a-entity>

    <a-entity id="leftHand"
        mixin="controller"
        hand-controls="left"
        laser-controls="hand:left">
      <prim-menu></prim-menu>
      <settings-menu></settings-menu>
      <create-menu></create-menu>
    </a-entity>
    <a-entity id="rightHand"
        mixin="controller"
        hand-controls="right"
        laser-controls="hand:right">
    </a-entity>
  </a-entity>
</template>

<script>
import PrimMenu from '@/components/menus/primMenu.vue'
import SettingsMenu from '@/components/menus/settingsMenu.vue'
import CreateMenu from '@/components/menus/createMenu.vue'

export default {
  name: 'controllerRig',

  components: {
    PrimMenu,
    SettingsMenu,
    CreateMenu
  },

  data: function () {
    return {
      rig: null,
      camera: null,
      snapReady: false,
      gamepad: null
    }
  },

  mounted () {
    window._elLeftHand = document.getElementById('leftHand')
    window._elRightHand = document.getElementById('rightHand')

    this.gamepad = navigator.getGamepads && navigator.getGamepads()[1]

    this.$store.dispatch('toggleLasers', false)

    let that = this
    this.$bus.on('resetZPos', function () {
      let position = that.rig.getAttribute('position')
      position.y = that.$store.state.initialZ
      that.rig.setAttribute('position', position)
    })

    this.rig = document.getElementById('rig')
    this.camera = document.getElementById('camera')
    let position = this.rig.getAttribute('position')
    this.$store.commit('setInitialZ', position.y)
    window.readControllerFrame = true
    requestAnimationFrame(this.checkRotation)
  },

  methods: {
    buttonDown: function (button) {
      // console.log('Down', button)
      if (button === 'y') this.$store.dispatch('toggleLeftLaser', true)
      if (button === 'b') this.$store.dispatch('toggleRightLaser', true)
    },

    buttonUp: function (button) {
      // console.log('Up', button)
      if (button === 'y') this.$store.dispatch('toggleLeftLaser', false)
      if (button === 'b') this.$store.dispatch('toggleRightLaser', false)
    },

    checkRotation: function () {
      requestAnimationFrame(this.checkRotation)
      if (!this.gamepad) this.gamepad = navigator.getGamepads && navigator.getGamepads()[1]
      if (!this.gamepad) return
      if (this.gamepad.axes[0] <= -0.5) this.rotateRig(true)
      else if (this.gamepad.axes[0] >= 0.5) this.rotateRig(false)
      else this.snapReady = true
    },

    rotateRig: function (left = false) {
      let rotation = this.rig.getAttribute('rotation')
      if (this.$store.state.snapRotation && this.snapReady) {
        if (left) rotation.y += this.$store.state.snapDegrees
        else rotation.y -= this.$store.state.snapDegrees
        this.snapReady = false
      } else if (!this.$store.state.snapRotation) {
        if (left) rotation.y += this.$store.state.rotateSpeed
        else rotation.y -= this.$store.state.rotateSpeed
      }
      this.rig.setAttribute('rotation', rotation)
    }
  }
}
</script>

