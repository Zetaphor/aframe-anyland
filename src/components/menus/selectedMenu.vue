<template>
  <a-entity>
      <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" data-collides rotation="0 0 0">

      </a-entity>
  </a-entity>
</template>

<script>
import GuiToggleButton from '@/components/gui/guiToggleButton.vue'
import GuiButton from '@/components/gui/guiButton.vue'

export default {
  name: 'selectedMenu',

  mounted () {
    let that = this
    this.$bus.on('hideLeftHandMenus', function () {
      that.showMenu = false
    })
  },

  components: {
    GuiButton,
    GuiToggleButton
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
