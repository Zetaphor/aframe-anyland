<template>
  <a-entity>
    <a-entity id="primMenuToggle" menu-prim-toggle geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.15" material="color:#333" class="collidable" rotation="0 0 0"></a-entity>
    <a-entity id="primMenu" visible="false" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" class="collidable" rotation="0 0 0">
      <a-sphere scale="0.02 0.02 0.02" position="0.03 0.1 0.05" material="color:#FFF" class="collidable" menu-prim="shape:sphere"></a-sphere>
      <a-box scale="0.03 0.03 0.03" position="0.03 0.1 0.1" material="color:#FFF" class="collidable" menu-prim="shape:box"></a-box>
      <a-cone scale="0.02 0.03 0.02" position="0.03 0.1 0.0" material="color:#FFF" class="collidable" menu-prim="shape:cone"></a-cone>
    </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: 'primMenu'
}
</script>

