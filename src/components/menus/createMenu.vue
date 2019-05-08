<template>
  <a-entity>
    <a-entity @mousedown="toggleMenu" geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.25" material="color:red" class="collidable" rotation="0 0 0"></a-entity>
    <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" class="collidable" rotation="0 0 0">
    </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: 'createMenu',

  data: function () {
    return {
      showMenu: false
    }
  },

  mounted () {
    let that = this
    this.$bus.on('hideLeftHandMenus', function () {
      that.showMenu = false
    })
  },

  methods: {
    toggleMenu: function () {
      const show = !this.showMenu
      this.$bus.emit('hideLeftHandMenus')
      this.showMenu = show
    }
  }
}
</script>

