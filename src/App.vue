<template>
  <div>
    <a-scene id="scene" background="color: #212" renderer="antialias: true" :physics="`debug:${$store.state.debugPhysics}`">
      <a-assets>
        <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" crossorigin="anonymous">
        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" crossorigin="anonymous">
        <a-mixin id="touchable" collision-filter="group: touchable; collidesWith: default, hands, touchable" grabbable></a-mixin>
        <asset-mixin-controller></asset-mixin-controller>
        <asset-mixin-menu-prims></asset-mixin-menu-prims>
      </a-assets>

      <a-cylinder id="ground" static-body collision-filter="collidesWith: default, touchable" src="#groundTexture" radius="30" height="0.1"></a-cylinder>
      <a-sky id="background" src="#skyTexture" theta-length="90" radius="30"></a-sky>

      <controller-rig></controller-rig>

      <a-box dynamic-body
          mixin="touchable"
          scale="0.5 0.5 0.5"
          position="0.7 1 -2"
          class="collidable"
          stretchable>
        </a-box>
      <a-box dynamic-body
          mixin="touchable"
          scale="0.5 0.5 0.5"
          position="-0.2 1.5 -2"
          class="collidable"
          stretchable>
          <a-sphere scale="0.2 0.5 0.2" position="0.5 -0.5 0.5" material="color:green"></a-sphere>
          <a-sphere scale="0.2 0.5 0.2" position="-0.5 -0.5 -0.5" material="color:red"></a-sphere>
          <a-sphere scale="0.2 0.5 0.2" position="0.5 -0.5 -0.5" material="color:blue"></a-sphere>
          <a-sphere scale="0.2 0.5 0.2" position="-0.5 -0.5 0.5" material="color:yellow"></a-sphere>
      </a-box>
    </a-scene>
  </div>
</template>

<script>
// require('@/components/aframe/intersect-color-change')
require('@/components/static-grabbable')

import AssetMixinMenuPrims from '@/components/menus/assetMixinMenuPrims.vue'
import AssetMixinController from '@/components/controllers/assetMixinController.vue'
import ControllerRig from '@/components/controllers/controllerRig.vue'

export default {
  name: 'app',
  components: {
    AssetMixinMenuPrims,
    AssetMixinController,
    ControllerRig
  },

  data: function () {
    return {
      show: false
    }
  }
}
</script>

<style>
  .a-enter-vr-button {
    position: fixed;
    bottom: 0;
    right: 0;
    display: block;
  }
</style>