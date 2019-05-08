<template>
  <a-entity
    class="collidable"
    @mouseenter="startHover" @mouseleave="stopHover" @mousedown="startPress" @mouseup="stopPress"
    :geometry="`primitive:box; width:${width}; height:${height}; depth:-0.03;`"
    :material="`shader: flat; color:${borderColor}`">
    <a-entity class="collidable"
      @mouseenter="startHover" @mouseleave="stopHover" @mousedown="startPress" @mouseup="stopPress"
      position="0 0 0.01"
      :geometry="`primitive:box; width:${width-0.025}; height:${height-0.025}; depth:0.02;`"
      :material="`shader: flat; color:${buttonColor}`">
      <a-text class="collidable" :value="text" :color="`${fontColor}`" align="center" position="0 0 0.01" :width="`${width * 3}`" :height="`${height * 3}`"></a-text>
    </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: 'guiButton',

  data: function () {
    return {
      clicking: false,
      hovering: false
    }
  },

  computed: {
    buttonColor: function () {
      if (this.clicking) return this.activeColor
      else if (this.hovering) return this.hoverColor
      return this.backgroundColor
    }
  },

  methods: {
    startHover: function () {
      this.hovering = true
    },

    stopHover: function () {
      this.hovering = false
    },

    startPress: function () {
      this.clicking = true
    },

    stopPress: function () {
      this.clicking = false
      if (this.useBus) this.$bus.emit(this.event)
      else this.$emit(this.event)
    }
  },

  props: {
    event: {
      type: String,
      required: true
    },
    useBus: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      required: true
    },

    height: {
      type: Number,
      required: true
    },

    text: {
      type: String,
      required: true
    },

    fontColor: {
      type: String,
      default: window.key_white
    },

    borderColor: {
      type: String,
      default: window.key_offwhite
    },

    backgroundColor: {
      type: String,
      default: window.key_grey
    },

    hoverColor: {
      type: String,
      default: window.key_grey_dark
    },

    activeColor: {
      type: String,
      default: window.key_orange
    }
  }
}
</script>
