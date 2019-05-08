<template>
  <a-entity>
    <!-- <a-entity @mousedown="toggleMenu" geometry="primitive:box; width:0.03; height: 0.03; depth: 0.03;" position="0 0 0.15" material="color:#333" class="collidable" rotation="0 0 0"></a-entity> -->
    <a-entity v-if="showMenu" geometry="primitive:box; width:0.01; height: 0.25; depth: 0.25;" position="0 0.2 0.27" material="color:#333" class="collidable" rotation="0 0 0">
      <a-entity v-for="(prim, index) in prims" :key="index"
        class="collidable"
        :position="prim.position"
        :scale="prim.scale"
        :geometry="`primitive:${prim.type}`"
        :material="`color:${prim.color}`"
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
          type: 'sphere',
          position: '0.03 0.1 0.05',
          scale: '0.02 0.02 0.02',
          color: '#FFF'
        },
        {
          type: 'box',
          position: '0.03 0.1 0.1',
          scale: '0.03 0.03 0.03',
          color: '#FFF'
        },
        {
          type: 'cone',
          position: '0.03 0.1 0.0',
          scale: '0.02 0.03 0.02',
          color: '#FFF'
        }
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
      this.create(this.prims[index].type)
    },

    stopPress: function (index) {
      this.$set(this.prims[index], 'color', '#FFF')
    },

    generatePrimId: function () {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    },

    create: function (type) {
      const newPrim = document.createElement('a-entity')
      const newId = 'prim-'+ this.generatePrimId()

      newPrim.setAttribute('mixin', 'prim-' + type)
      newPrim.setAttribute('id', newId)
      this.$store.commit('addNewObjectPrim', newId)

      const scene = document.querySelector('#scene')
      const leftHand = document.querySelector('#leftHand')

      let position = leftHand.body.position
      position.y += 0.5
      newPrim.setAttribute('position', position);
      scene.appendChild(newPrim)
    }
  }
}
</script>

