<template>
  <div>
    <a-mixin id="prim-box"
      geometry="primitive: box; width: 0.2; height: 0.2; depth: 0.2"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      hoverable sleepy dynamic-body="mass:0" static-grabbable
      grabbable stretchable></a-mixin>

    <a-mixin id="prim-sphere"
      geometry="primitive: sphere; radius:0.1"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      hoverable sleepy dynamic-body="mass:0" static-grabbable
      grabbable stretchable></a-mixin>

    <a-mixin id="prim-cylinder"
      geometry="primitive: cylinder; height: 0.2; radius: 0.1"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      hoverable sleepy dynamic-body="mass:0" static-grabbable
      grabbable stretchable></a-mixin>

    <a-mixin id="prim-ring"
      geometry="primitive: torus;" segments-tubular="20" scale="0.1 0.1 0.1"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      hoverable sleepy dynamic-body="mass:0" static-grabbable
      grabbable stretchable></a-mixin>

    <a-mixin id="prim-half-ring"
      geometry="primitive: torus; arc: -200" scale="0.1 0.1 0.1"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      hoverable sleepy dynamic-body="mass:0" static-grabbable
      grabbable stretchable></a-mixin>
  </div>
</template>

<script>
export default {
  name: 'assetMixinMenuPrims'
}
</script>

