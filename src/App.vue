<template>
  <div>
    <a-scene id="scene" background="color: #212" renderer="antialias: true" :physics="`debug:${$store.state.debugPhysics}; gravity:${$store.state.gravity}; iterations: ${$store.state.physicsUpdates}; friction: ${$store.state.iterations}; restitution: ${$store.state.bounciness}`">
      <a-assets>
        <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" crossorigin="anonymous">
        <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" crossorigin="anonymous">
        <a-mixin id="touchable" :collision-filter="`group: touchable; collidesWith:${$store.state.objectCollisionFilter}`" grabbable></a-mixin>
        <asset-mixin-controller></asset-mixin-controller>
        <asset-mixin-menu-prims></asset-mixin-menu-prims>
      </a-assets>

      <a-cylinder id="ground" static-body collision-filter="collidesWith: default, touchable" src="#groundTexture" radius="30" height="0.1"></a-cylinder>
      <!-- <a-sky id="background" src="#skyTexture" theta-length="90" radius="30"></a-sky> -->

      <controller-rig></controller-rig>

      <!-- <a-entity dynamic-body id="testCube" geometry-merger="preserveOriginal: false"
          geometry="primitive: box;"
          data-parentid="testCube"
          mixin="touchable"
          scale="0.5 0.5 0.5"
          position="0.7 1 -2"
          class="collides"
          sleepy
          stretchable>
        </a-entity>
      <a-entity dynamic-body id="testObject" geometry-merger="preserveOriginal: false"
          geometry="primitive: box;"
          data-parentid="testObject"
          mixin="touchable"
          scale="0.5 0.5 0.5"
          position="-0.2 1.5 -2"
          sleepy
          class="collides"
          stretchable>
          <a-sphere scale="0.2 0.5 0.2" position="0.5 -0.5 0.5" material="color:green"></a-sphere>
          <a-sphere scale="0.2 0.5 0.2" position="-0.5 -0.5 -0.5" material="color:red"></a-sphere>
          <a-sphere scale="0.2 0.5 0.2" position="0.5 -0.5 -0.5" material="color:blue"></a-sphere>
          <a-sphere scale="0.2 0.5 0.2" position="-0.5 -0.5 0.5" material="color:yellow"></a-sphere>
      </a-entity> -->

      <a-entity class="collides" instanced-mesh></a-entity>
      <!-- <a-entity class="collides" sleepy mixin="touchable" dynamic-body="mass:0" static-grabbable geometry="primitive:box; width: 0.9; height: 0.5; depth:0.05;" position="-0.2 1.5 -4" rotation="-30 0 0" material="color: #333;">
        <a-entity id="keyboard" super-keyboard="hand: .keyboard-hand; imagePath:./img" position="0 0 0.06"></a-entity>
      </a-entity> -->
    </a-scene>
  </div>
</template>

<script>
// require('@/components/mixins-aframe/intersect-color-change')
require('@/components/mixins-aframe/static-grabbable')
// require('@/components/mixins-aframe/select-objects')
require('@/components/instanced-mesh')

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

  mounted () {
      window._elScene = document.getElementById('scene')
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