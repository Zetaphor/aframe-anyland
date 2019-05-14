<template>
  <a-entity>
      <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" class="collides" rotation="0 0 0">
        <a-text color="#FFF" :value="`Object Parts: ${partTotal}`" position="0.011 0.0 0.07" rotation="0 90 0" width="0.5" height="0.5"></a-text>
        <gui-button rotation="0 90 0" position="0.011 0.1 -0.06" @closeMenu="closeMenu" :event="'closeMenu'" :width="0.1" :height="0.04" text="Close"></gui-button>
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

    this.$bus.on('selectObject', function (objectId) {
      that.openMenu(objectId)
    })
  },

  components: {
    GuiButton,
    GuiToggleButton
  },

  data: function () {
    return {
      showMenu: false,
      selectionId: '',
      partTotal: 0
    }
  },

  methods: {
    openMenu: function (objectId) {
      this.$bus.emit('hideLeftHandMenus')
      let selection = document.getElementById(objectId)
      this.selectionId = objectId
      this.partTotal = selection.dataset.parttotal
      this.showMenu = true
    },

    closeMenu: function () {
      this.showMenu = false
      if (this.$store.state.buildMode) {
        this.$bus.emit('showCreateMenu')
        this.$bus.emit('showPrimMenu')
      }
    }
  }
}
</script>
