<template>
  <a-mixin id="controller" physics-collider
    phase-shift
    collision-filter="group:hands; collidesWith: touchable; collisionForces: false"
    static-body="shape: sphere; sphereRadius: 0.1"
    super-hands="colliderEvent: collisions;
    colliderEventProperty: els;
    colliderEndEvent: collisions;
    colliderEndEventProperty: clearedEls;"
    :sphere-collider="`objects:${$store.state.raycastObjectsFilter}; radius:0.1`"
    :raycaster="`objects: ${$store.state.raycastObjectsFilter}`"
    :line="$store.getters.raycasterLine"></a-mixin>
</template>

<script>
export default {
  name: 'assetMixinController'
}
</script>

