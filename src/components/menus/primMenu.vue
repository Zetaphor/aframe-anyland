<template>
  <a-entity>
    <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0.27" material="color:#333" class="collides" rotation="0 0 0">
      <a-entity v-for="(prim, index) in prims" :key="index"
        class="collides"
        :position="prim.position"
        :scale="prim.scale"
        :geometry="`primitive:${prim.type}; arc: ${prim.arc || 0}`"
        :material="`color:${prim.color}`"
        :segments-radial="prim.segmentsRadial ? prim.segmentsRadial : false"
        :segments-tubular="prim.segmentsTubular ? prim.segmentsTubular : false"
        :arc="typeof prim.arc !== 'undefined' ? prim.arc : false"
        :rotation="prim.rotation ? prim.rotation : false"
        @mouseenter="hoverStart(index)"
        @mouseleave="hoverStop(index)"
        @mousedown="startPress(index)"
        @mouseup="stopPress(index)"></a-entity>
    </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: 'primMenu',

  data: function () {
    return {
      showMenu: false,
      prims: [
        {
          name: 'box',
          type: 'box',
          position: '0.03 0.1 0.1',
          scale: '0.03 0.03 0.03',
          color: '#FFF'
        },
        {
          name: 'sphere',
          type: 'sphere',
          position: '0.03 0.1 0.05',
          scale: '0.02 0.02 0.02',
          color: '#FFF'
        },
        {
          name: 'cylinder',
          type: 'cylinder',
          position: '0.03 0.1 0.0',
          scale: '0.02 0.03 0.02',
          color: '#FFF'
        },
        {
          name: 'ring',
          type: 'torus',
          position: '0.03 0.1 -0.05',
          scale: '0.015 0.015 0.015',
          color: '#FFF',
          segmentsTubular: 20,
          rotation: '0 90 0'
        },
        {
          name: 'half-ring',
          type: 'torus',
          position: '0.03 0.1 -0.1',
          scale: '0.015 0.015 0.015',
          color: '#FFF',
          arc: -200,
          rotation: '0 90 0'
        },
      ]
    }
  },

  mounted () {
    let that = this
    this.$bus.on('hideLeftHandMenus', function () {
      that.showMenu = false
    })

    this.$bus.on('showPrimMenu', function () {
      that.showMenu = true
    })

    this.$bus.on('hidePrimMenu', function () {
      that.showMenu = false
    })
  },

  methods: {
    hoverStart: function (index) {
      this.$set(this.prims[index], 'color', 'red')
    },

    hoverStop: function (index) {
      this.$set(this.prims[index], 'color', '#FFF')
    },

    startPress: function (index) {
      this.$set(this.prims[index], 'color', 'green')
      this.create(this.prims[index].name)
    },

    stopPress: function (index) {
      this.$set(this.prims[index], 'color', '#FFF')
    },

    create: function (name) {
      let newId = 'prim-' + window.generateUid()
      let newPrim = document.createElement('a-entity')
      newPrim.setAttribute('mixin', 'prim-' + name)
      newPrim.setAttribute('id', newId)
      newPrim.setAttribute('class', 'collides')
      this.$store.commit('addNewObjectPrim', newId)

      let position = window._elLeftHand.body.position
      position.y += 0.5
      newPrim.setAttribute('position', position)
      window._elScene.appendChild(newPrim)
    }
  }
}
</script>

