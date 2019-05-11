<template>
  <a-entity
    class="collides"
    @mouseenter="startHover" @mouseleave="stopHover"
    :geometry="`primitive:box; width:${width}; height:${height}; depth:-0.01;`"
    :material="`color:${borderColor}`">
    <a-entity class="collides"
      @mouseenter="startHover" @mouseleave="stopHover" @mousedown="startPress" @mouseup="stopPress"
      position="0 0 0.01"
      :geometry="`primitive:box; width:${width-0.015}; height:${height-0.015}; depth:0.01;`"
      :material="`color:${buttonColor}`">
      <a-text :value="displayLabel" :color="`${fontColor}`" align="center" position="0 0 0.01" :width="`${width * 2}`" :height="`${height * 2}`"></a-text>
    </a-entity>
  </a-entity>
</template>

<script>
export default {
  name: 'guiToggleButton',

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
    },

    displayLabel: function () {
      if (!this.value) return this.disabledLabel
      else return this.enabledLabel
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

    enabledLabel: {
      type: String,
      required: true
    },

    disabledLabel: {
      type: String,
      required: true
    },

    value: {
      type: Boolean,
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
      default: window.key_grey_light
    },

    activeColor: {
      type: String,
      default: window.key_orange
    }
  }
}
</script>

