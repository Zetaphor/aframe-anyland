<template>
  <a-entity id="rig" movement-controls="speed:0.1; controls:gamepad">
    <a-entity camera look-controls="pointerLockEnabled: true" position="0 3.2 0"></a-entity>

    <a-entity id="leftHand"
        mixin="controller"
        hand-controls="left"
        laser-controls="hand:left">

      <prim-menu></prim-menu>
      <settings-menu></settings-menu>
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

export default {
  name: 'controllerRig',

  components: {
    PrimMenu,
    SettingsMenu
  }
}
</script>

