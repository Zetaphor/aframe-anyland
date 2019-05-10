<template>
  <div>
    <a-mixin id="prim-box"
      geometry="primitive: box; width: 0.2; height: 0.2; depth: 0.2"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      static-body hoverable static-grabbable
      grabbable stretchable></a-mixin>

    <a-mixin id="prim-sphere"
      geometry="primitive: sphere; radius:0.1"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      static-body hoverable static-grabbable
      grabbable stretchable></a-mixin>

    <a-mixin id="prim-cone"
      geometry="primitive: cone; radius-bottom:0.0; radius-top:0.15; height:0.2"
      material="color:#FFF" class="collidable"
      :collision-filter="`group: touchable; collidesWith:${$store.state.newPrimCollisionFilter}`"
      static-body hoverable static-grabbable
      grabbable stretchable></a-mixin>
  </div>
</template>

<script>
export default {
  name: 'assetMixinMenuPrims'
}
</script>

