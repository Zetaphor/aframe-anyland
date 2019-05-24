<template>
  <a-mixin id="controller"
    physics-collider
    phase-shift
    :collision-filter="`group:hands; collidesWith: ${$store.state.handCollisionFilter}; collisionForces: false`"
    static-body="shape: none;"
    shape__hand="shape: box; halfExtents: 0.05 0.04 0.1; offset: 0 -0.01 0"
    super-hands="colliderEvent: collisions;
    colliderEventProperty: els;
    colliderEndEvent: collisions;
    grabStartButtons: triggerdown;
    grabEndButtons: triggerup;
    stretchStartButtons: gripdown;
    stretchEndButtons: gripup;
    colliderEndEventProperty: clearedEls;"
    :raycaster="`objects: ${$store.state.raycastObjectsFilter}`"
    :custom-raycaster="`objects: ${$store.state.raycastObjectsFilter}`"
    :line="$store.getters.raycasterLine"
    select-objects></a-mixin>
</template>

<script>
export default {
  name: 'assetMixinController'
}
</script>

