<template>
  <a-entity id="rig" movement-controls="speed:0.1; controls:gamepad">
    <a-entity camera look-controls="pointerLockEnabled: true" position="0 3.2 0"></a-entity>

    <a-entity id="leftHand"
        mixin="controller"
        hand-controls="left"
        laser-controls="hand:left">

      <a-entity id="settingsMenuToggle" menu-settings-toggle geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.20" material="color:blue" class="collidable" rotation="0 0 0"></a-entity>
      <a-entity id="settingsMenu" visible="false" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:blue" class="collidable" rotation="0 0 0">
      </a-entity>

      <prim-menu></prim-menu>
    </a-entity>
    <a-entity id="rightHand"
        mixin="controller"
        hand-controls="right"
        laser-controls="hand:right">
    </a-entity>
  </a-entity>
</template>

<script>
require('@/components/aframe/menu-prim')
require('@/components/aframe/menu-prim-toggle')
require('@/components/aframe/menu-settings-toggle')
import PrimMenu from '@/components/menu/primMenu.vue'

export default {
  name: 'controllerRig',

  components: {
    PrimMenu
  }
}
</script>

