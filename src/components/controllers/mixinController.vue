<template>
  <a-mixin id="controller" physics-collider
    phase-shift
    collision-filter="group:hands; collidesWith: touchable; collisionForces: false"
    static-body="shape: sphere; sphereRadius: 0.1"
    super-hands="colliderEvent: collisions;
    colliderEventProperty: els;
    colliderEndEvent: collisions;
    colliderEndEventProperty: clearedEls;"
    sphere-collider="objects:.collidable; radius:0.1"
    :raycaster="$store.getters.raycaster"
    :line="$store.getters.raycasterLine"></a-mixin>
</template>

<script>
export default {
  name: 'mixinController'
}
</script>

