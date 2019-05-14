<template>
  <a-entity>
      <a-entity @mousedown="toggleMenu" geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.20" material="color:blue" class="collides" rotation="0 0 0"></a-entity>
      <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" class="collides" rotation="0 0 0">
        <gui-toggle-button rotation="0 90 0" position="0.011 0.1 0.07" :event="'toggleFlying'" @toggleFlying="toggleFlying" :width="0.1" :height="0.04" :value="$store.state.enableFlying" :disabledLabel="'Enable Flying'" :enabledLabel="'Disable Flying'"></gui-toggle-button>
        <gui-button rotation="0 90 0" position="0.011 0.1 -0.06" :event="'resetZPos'" :useBus="true" :width="0.1" :height="0.04" text="Reset Z Position"></gui-button>
        <gui-toggle-button rotation="0 90 0" position="0.011 -0.1 0.07" :event="'togglePhysicsDebug'" @togglePhysicsDebug="togglePhysicsDebug" :width="0.1" :height="0.04" :value="$store.state.debugPhysics" :disabledLabel="'Enable Wireframes'" :enabledLabel="'Disable Wireframes'"></gui-toggle-button>
        <gui-toggle-button rotation="0 90 0" position="0.011 -0.1 -0.06" :event="'toggleSnapRotation'" @toggleSnapRotation="toggleSnapRotation" :width="0.1" :height="0.04" :value="$store.state.snapRotation" :disabledLabel="'Enable Snap Turning'" :enabledLabel="'Enable Smooth Turning'"></gui-toggle-button>
      </a-entity>
  </a-entity>
</template>

<script>
import GuiToggleButton from '@/components/gui/guiToggleButton.vue'
import GuiButton from '@/components/gui/guiButton.vue'

export default {
  name: 'settingsMenu',

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
    },

    toggleFlying: function () {
      this.$store.commit('setFlying', !this.$store.state.enableFlying)
    },

    togglePhysicsDebug: function () {
      this.$store.commit('setPhysicsDebug', !this.$store.state.debugPhysics)
    },

    toggleSnapRotation: function () {
      this.$store.commit('setSnapRotation', !this.$store.state.snapRotation)
    }
  }
}
</script>
