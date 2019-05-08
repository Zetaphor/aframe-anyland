<template>
  <div>
    <a-mixin id="controller" physics-collider
      phase-shift
      collision-filter="group:hands; collidesWith: touchable; collisionForces: false"
      static-body="shape: sphere; sphereRadius: 0.1"
      super-hands="colliderEvent: collisions;
      colliderEventProperty: els;
      colliderEndEvent: collisions;
      colliderEndEventProperty: clearedEls;"
      sphere-collider="objects:.collidable; radius:0.1"
      raycaster="objects: .collidable"
      line="color: #118A7E"></a-mixin>
  </div>
</template>

<script>
export default {
  name: 'mixinController'
}
</script>

