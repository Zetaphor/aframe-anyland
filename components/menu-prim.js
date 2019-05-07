/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('menu-prim', {
  schema: {
    shape: { type: 'string', default: 'box' }
  },

  init: function () {
    const el = this.el
    const scene = document.querySelector('#scene')
    const leftHand = document.querySelector('#leftHand')

    el.addEventListener('hover-start', function (evt) {
      console.log('menu-hover')
    })

    el.addEventListener('mousedown', function (evt) {
      el.setAttribute('material', 'color', '#EF2D5E')
      const newPrimEl = document.createElement('a-entity')

      // console.log(this.data)
      // newPrimEl.setAttribute('mixin', 'prim-' + this.data.type);
      newPrimEl.setAttribute('mixin', 'prim-box')

      let position = leftHand.body.position
      position.y += 0.5
      newPrimEl.setAttribute('position', position);
      scene.appendChild(newPrimEl)
    });

    el.addEventListener('mouseup', function (evt) {
      el.setAttribute('material', 'color', 'white')
    });
  }
});
