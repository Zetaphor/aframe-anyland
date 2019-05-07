/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('menu-prim-toggle', {
  schema: {
    shape: { type: 'string', default: 'box' }
  },

  init: function () {
    const el = this.el
    const primMenu = document.querySelector('#primMenu')
    const settingsMenu = document.querySelector('#settingsMenu')

    el.addEventListener('mousedown', function (evt) {
      el.setAttribute('material', 'color', '#EF2D5E')
      let visible = !primMenu.getAttribute('visible')
      primMenu.setAttribute('visible', visible)
      if (visible) settingsMenu.setAttribute('visible', false)
    })

    el.addEventListener('mouseup', function (evt) {
      el.setAttribute('material', 'color', '#333')
    })
  }
});
