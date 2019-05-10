<template>
  <a-entity>
    <a-entity @mousedown="toggleMenu" geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.15" material="color:red" class="collidable" rotation="0 0 0"></a-entity>
    <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" class="collidable" rotation="0 0 0">
      <a-text color="#FFF" :value="`Total Parts: ${$store.state.newObjectPrims.length}`" position="0.011 0.0 0.07" rotation="0 90 0" width="0.5" height="0.5"></a-text>
      <a-entity fps-counter position="0.011 0.1 0.1" rotation="0 90 0"></a-entity>
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
    },

    finishObject: function () {
      this.$store.commit('setBuildMode', false)
      this.$bus.emit('hidePrimMenu')

      if (!this.$store.state.newObjectPrims.length) return

      let primEls = []
      for (let index = 0; index < this.$store.state.newObjectPrims.length; index++) {
        let primEl = document.getElementById(this.$store.state.newObjectPrims[index])
        primEls.push({
          position: primEl.getAttribute('position'),
          rotation: primEl.getAttribute('rotation'),
          scale: primEl.getAttribute('scale'),
          geometry: primEl.getAttribute('geometry'),
          material: primEl.getAttribute('material')
        })
        primEl.remove()
      }

      let newObject = document.createElement('a-entity')
      let newObjectId = 'obj-' + window.generateUid()
      newObject.setAttribute('id', newObjectId)
      newObject.setAttribute('position', primEls[0].position)
      newObject.setAttribute('material', primEls[0].material)
      newObject.setAttribute('dynamic-body', 'mass: 0')
      newObject.setAttribute('static-grabbable', '')
      newObject.setAttribute('sleepy', '')
      newObject.setAttribute('grabbable', '')
      newObject.setAttribute('stretchable', '')
      newObject.setAttribute('hoverable', '')
      newObject.setAttribute('collision-filter', `group: touchable; collidesWith:${this.$store.state.objectCollisionFilter}`)
      newObject.setAttribute('class', 'collidable')

      if (primEls.length === 1) {
        newObject.setAttribute('geometry', primEls[0].geometry)
        newObject.setAttribute('rotation', primEls[0].rotation)
        newObject.setAttribute('scale', primEls[0].scale)
      } else {
        let rootPos = primEls[0].position
        for (let index = 0; index < primEls.length; index++) {
          let newPrim = document.createElement('a-entity')
          newPrim.setAttribute('id', 'prim-' + window.generateUid())
          newPrim.setAttribute('position', {
            x: (rootPos.x - primEls[index].position.x),
            y: (rootPos.y - primEls[index].position.y),
            z: (rootPos.z - primEls[index].position.z)
          })
          newPrim.setAttribute('geometry', primEls[index].geometry)
          newPrim.setAttribute('rotation', primEls[index].rotation)
          newPrim.setAttribute('scale', primEls[index].scale)
          newPrim.setAttribute('material', primEls[index].material)
          newObject.appendChild(newPrim)
        }
      }

      this.$store.commit('clearNewObjectPrims')

      window._elScene.appendChild(newObject)

      newObject.addEventListener('body-loaded', function() {
        newObject.setAttribute('data-objjson', JSON.stringify(window.aFrameSerialize(newObjectId)))
      })
    }
  }
}
</script>

