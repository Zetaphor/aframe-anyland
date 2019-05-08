<template>
  <a-entity>
      <a-entity @mousedown="toggleMenu" geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.20" material="color:blue" class="collidable" rotation="0 0 0"></a-entity>
      <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:blue" class="collidable" rotation="0 0 0">
      </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: 'settingsMenu',

  mounted () {
    let that = this
    this.$bus.on('hideLeftHandMenus', function () {
      that.showMenu = false
    })
  },

  data: function () {
    return {
      showMenu: false
    }
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
