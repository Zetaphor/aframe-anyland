<template>
  <a-mixin id="controller"
    physics-collider
    phase-shift
    :collision-filter="`group:hands; collidesWith: ${$store.state.handCollisionFilter}; collisionForces: false`"
    static-body="shape: sphere; sphereRadius: 0.1"
    super-hands="colliderEvent: collisions;
    colliderEventProperty: els;
    colliderEndEvent: collisions;
    grabStartButtons: triggerdown;
    grabEndButtons: triggerup;
    stretchStartButtons: gripdown;
    stretchEndButtons: gripup;
    colliderEndEventProperty: clearedEls;"
    :raycaster="`objects: ${$store.state.raycastObjectsFilter}`"
    custom-raycaster
    :line="$store.getters.raycasterLine"
    select-objects></a-mixin>
</template>

<script>
export default {
  name: 'assetMixinController'
}
</script>

