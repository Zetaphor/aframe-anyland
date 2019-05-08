<template>
  <div>
    <a-mixin id="new-box"
      geometry="primitive: box; width: 0.2; height: 0.2; depth: 0.2"
      material="color:#FFF" class="collidable"></a-mixin>

    <a-mixin id="new-sphere"
      geometry="primitive: sphere; radius:0.1"
      material="color:#FFF" class="collidable"></a-mixin>

    <a-mixin id="new-cone"
      geometry="primitive: cone; radius-bottom:0.0; radius-top:0.15; height:0.2"
      material="color:#FFF" class="collidable"></a-mixin>
  </div>
</template>

<script>
export default {
  name: 'assetMixinCreateObject'
}
</script>

