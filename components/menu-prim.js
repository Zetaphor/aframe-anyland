/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('menu-prim', {
  schema: {
    shape: {default: 'box' }
  },

  init: function () {
    const el = this.el
    const scene = document.querySelector('#scene')
    const leftHand = document.querySelector('#leftHand')
    let data = this.data

    el.addEventListener('mouseenter', function (evt) {
      el.setAttribute('material', 'color', '#EF2D5E')
    })

    el.addEventListener('mouseleave', function (evt) {
      el.setAttribute('material', 'color', '#FFF')
    })

    el.addEventListener('mousedown', function (evt) {
      el.setAttribute('material', 'color', '#red')
      const newPrimEl = document.createElement('a-entity')
      newPrimEl.setAttribute('mixin', 'prim-' + data.shape)

      let position = leftHand.body.position
      position.y += 0.5
      newPrimEl.setAttribute('position', position);
      scene.appendChild(newPrimEl)
    });

    el.addEventListener('mouseup', function (evt) {
      el.setAttribute('material', 'color', '#FFF')
    });
  }
});
