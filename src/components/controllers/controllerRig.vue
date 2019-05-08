<template>
  <a-entity id="rig" :movement-controls="`controls: gamepad; speed:${$store.state.moveSpeed}; fly:${$store.state.enableFlying}`">
    <a-entity id="camera" camera position="0 3.2 0"></a-entity>

    <a-entity id="leftHand"
        mixin="controller"
        hand-controls="left">
        :laser-controls="$store.state.showLasers ? 'hand:left' : false"
      <prim-menu></prim-menu>
      <settings-menu></settings-menu>
    </a-entity>
    <a-entity id="rightHand"
        mixin="controller"
        hand-controls="right"
        :laser-controls="$store.state.showLasers ? 'hand:right' : false">
    </a-entity>
  </a-entity>
</template>

<script>
import PrimMenu from '@/components/menus/primMenu.vue'
import SettingsMenu from '@/components/menus/settingsMenu.vue'

export default {
  name: 'controllerRig',

  data: function () {
    return {
      rig: null,
      snapReady: false
    }
  },

  mounted () {
    this.rig = document.querySelector('#rig')
    window.readControllerFrame = true
    requestAnimationFrame(this.controllerLoop)
  },

  methods: {
    controllerLoop: function () {
        let gamepad = navigator.getGamepads && navigator.getGamepads()[1]
        if (gamepad) {
          let axes = gamepad.axes
          if (axes[0] <= -0.5) this.rotateRig(true)
          else if (axes[0] >= 0.5) this.rotateRig(false)
          else this.snapReady = true
        }
      requestAnimationFrame(this.controllerLoop)
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
      rig.setAttribute('rotation', rotation)
    }
  },

  components: {
    PrimMenu,
    SettingsMenu
  }
}
</script>

