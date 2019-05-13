<template>
  <a-entity>
    <a-entity @mousedown="toggleMenu" geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.15" material="color:red" class="collides" rotation="0 0 0"></a-entity>
    <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0" material="color:#333" class="collides" rotation="0 0 0">
      <a-text v-if="$store.state.buildMode" color="#FFF" :value="`Total Parts: ${$store.state.newObjectPrims.length}`" position="0.011 0.0 0.07" rotation="0 90 0" width="0.5" height="0.5"></a-text>
      <a-entity fps-counter position="0.015 0.1 0.1" rotation="0 90 0"></a-entity>
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

    this.$bus.on('showCreateMenu', function () {
      that.showMenu = true
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

      let newObjectData = {
        id: window.generateUid(),
        geometryTypes: {}
      }

      let rootEl = document.getElementById(this.$store.state.newObjectPrims[0])

      for (let index = 0; index < this.$store.state.newObjectPrims.length; index++) {
        let newPart = {
          id: 'part-' + window.generateUid()
        }

        let primEl = document.getElementById(this.$store.state.newObjectPrims[index])

        newPart.position = primEl.object3D.position.toArray()
        newPart.rotation = primEl.object3D.rotation.toArray()
        let newPartGeometry = primEl.getAttribute('geometry')

        if (newPartGeometry.primitive === 'box') {
          newPart.scale = [
            newPartGeometry.width * primEl.object3D.scale.x,
            newPartGeometry.height * primEl.object3D.scale.y,
            newPartGeometry.depth * primEl.object3D.scale.z
          ]
        } else if (newPartGeometry.primitive === 'sphere') {
          newPart.scale = [
            newPartGeometry.radius * primEl.object3D.scale.x,
            newPartGeometry.radius * primEl.object3D.scale.y,
            newPartGeometry.radius * primEl.object3D.scale.z
          ]
        } else if (newPartGeometry.primitive === 'cylinder') {
          newPart.scale = [
            newPartGeometry.radius * primEl.object3D.scale.x,
            newPartGeometry.radius * primEl.object3D.scale.y,
            newPartGeometry.height * primEl.object3D.scale.z
          ]
          console.log(newPart.scale)
        }

        newPart.material = primEl.getAttribute('material')

        if (typeof newObjectData.geometryTypes[newPartGeometry.primitive] === 'undefined') newObjectData.geometryTypes[newPartGeometry.primitive] = []
        newObjectData.geometryTypes[newPartGeometry.primitive].push(newPart)
        primEl.remove()
      }

      this.$store.commit('clearNewObjectPrims')

      let newInstancedMesh = document.createElement('a-instancemeshgroup')
      newInstancedMesh.setAttribute('json', JSON.stringify(newObjectData))
      newInstancedMesh.setAttribute('geometry', 'primitive: box')
      newInstancedMesh.setAttribute('body', 'type: dynamic; mass: 5; shape: none;')
      newInstancedMesh.setAttribute('shape__main', 'shape: box; halfExtents: 0.2 0.2 0.2')
      window._elScene.appendChild(newInstancedMesh)
    }
  }
}
</script>

