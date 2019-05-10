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
    },

    finishObject: function () {
      this.$store.commit('setBuildMode', false)
      this.$bus.emit('hidePrimMenu')

      if (!this.$store.state.newObjectPrims.length) return

      let primEls = []
      this.$store.state.newObjectPrims.forEach((primId) => {
        let primEl = document.querySelector('#' + primId)
        primEls.push({
          position: primEl.getAttribute('position'),
          rotation: primEl.getAttribute('rotation'),
          scale: primEl.getAttribute('scale'),
          geometry: primEl.getAttribute('geometry'),
          material: primEl.getAttribute('material')
        })
        primEl.remove()
      })

      let newObjectId = 'obj-' + window.generateUid()
      let newObject = document.createElement('a-entity')
      newObject.setAttribute('id', newObjectId)
      newObject.setAttribute('position', primEls[0].position)
      newObject.setAttribute('material', primEls[0].material)
      // newObject.setAttribute('dynamic-body', '')
      newObject.setAttribute('static-body', '')
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
        primEls.forEach((prim) => {
          let newPrim = document.createElement('a-entity')
          let newPrimId = 'prim-' + window.generateUid()
          newPrim.setAttribute('id', newPrimId)
          newPrim.setAttribute('position', {
            x: (rootPos.x - prim.position.x),
            y: (rootPos.y - prim.position.y),
            z: (rootPos.z - prim.position.z)
          })
          newPrim.setAttribute('geometry', prim.geometry)
          newPrim.setAttribute('rotation', prim.rotation)
          newPrim.setAttribute('scale', prim.scale)
          newPrim.setAttribute('material', prim.material)
          newObject.appendChild(newPrim)
        })
      }

      this.$store.commit('clearNewObjectPrims')

      let scene = document.querySelector('#scene')
      scene.appendChild(newObject)

      newObject.addEventListener('body-loaded', function() {
        newObject.setAttribute('data-objjson', JSON.stringify(window.aFrameSerialize(newObjectId)))
      })
    }
  }
}
</script>

