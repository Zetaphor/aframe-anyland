<template>
  <a-entity>
    <a-entity @mousedown="toggleMenu" geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.15" material="color:red" class="collidable" rotation="0 0 0"></a-entity>
    <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" class="collidable" rotation="0 0 0">
      <gui-button v-if="!$store.state.buildMode" rotation="0 90 0" position="0.011 0.1 -0.06" @createObject="createObject" :event="'createObject'" :width="0.1" :height="0.04" text="Create New Object"></gui-button>
      <gui-button v-else rotation="0 90 0" position="0.011 0.1 -0.06" @finishObject="finishObject" :event="'finishObject'" :width="0.1" :height="0.04" text="Done"></gui-button>
    </a-entity>
  </a-entity>
</template>

<script>
import GuiButton from '@/components/gui/guiButton.vue'

export default {
  name: 'createMenu',

  components: {
    GuiButton
  },

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
      if (show && this.$store.state.buildMode) this.$bus.emit('showPrimMenu')
    },

    createObject: function () {
      this.$store.commit('setBuildMode', true)
      this.$bus.emit('showPrimMenu')
      const newObject = document.createElement('a-entity')
    },

    finishObject: function () {
      this.$store.commit('setBuildMode', false)
      this.$bus.emit('hidePrimMenu')

      let primEls = []
      this.$store.state.newObjectPrims.forEach((primId, index) => {
        let primEl = document.querySelector('#' + primId)
        primEls.push({
          position: primEl.getAttribute('position'),
          rotation: primEl.getAttribute('rotation'),
          scale: primEl.getAttribute('scale'),
          geometry: primEl.getAttribute('geometry'),
          material: primEl.getAttribute('geometry')
        })
        primEl.remove()
      })

      console.log(primEls)

      let newObject = document.createElement('a-entity')
      newObject.setAttribute('mixin', 'new-object')
      newObject.setAttribute('geometry', primEls[0].geometry)
      newObject.setAttribute('position', primEls[0].position)
      newObject.setAttribute('rotation', primEls[0].rotation),
      newObject.setAttribute('scale', primEls[0].scale)
      newObject.setAttribute('material', primEls[0].material)
      primEls.forEach((prim, index) => {
        if (!index) return
        // Need to generate position offset by comparing position to the first element in the array, since that is the root object
        let newPrim = document.createElement('a-entity')
        newPrim.setAttribute('geometry', prim.geometry)
        newPrim.setAttribute('position', prim.position)
        newPrim.setAttribute('rotation', prim.rotation)
        newPrim.setAttribute('scale', prim.scale)
        newObject.setAttribute('material', prim.material)
        newObject.appendChild(newPrim)
      })
      console.log(newObject)
      scene.appendChild(newObject)
      this.$store.commit('clearNewObjectPrims')
    }

  }
}
</script>

