/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('menu-settings-toggle', {
  schema: {
    shape: { type: 'string', default: 'box' }
  },

  init: function () {
    const el = this.el
    const settingsMenu = document.querySelector('#settingsMenu')
    const primMenu = document.querySelector('#primMenu')

    el.addEventListener('mousedown', function (evt) {
      el.setAttribute('material', 'color', '#EF2D5E')
      let visible = !settingsMenu.getAttribute('visible')
      settingsMenu.setAttribute('visible', visible)
      if (visible) primMenu.setAttribute('visible', false)
    })

    el.addEventListener('mouseup', function (evt) {
      el.setAttribute('material', 'color', 'blue')
    })
  }
});
