module.exports.component = window.AFRAME.registerComponent('menu-prim', {
  schema: {
    shape: {default: 'box' }
  },

  init: function () {
    const el = this.el
    const scene = document.querySelector('#scene')
    const leftHand = document.querySelector('#leftHand')
    const primMenu = document.querySelector('#primMenu')
    let data = this.data

    function checkVisible () {
      return primMenu.getAttribute('visible')
    }

    el.addEventListener('mouseenter', function () {
      el.setAttribute('material', 'color', '#EF2D5E')
    })

    el.addEventListener('mouseleave', function () {
      el.setAttribute('material', 'color', '#FFF')
    })

    el.addEventListener('mousedown', function () {
      if (!checkVisible()) return
      el.setAttribute('material', 'color', 'red')
      const newPrimEl = document.createElement('a-entity')
      newPrimEl.setAttribute('mixin', 'prim-' + data.shape)

      let position = leftHand.body.position
      position.y += 0.5
      newPrimEl.setAttribute('position', position);
      scene.appendChild(newPrimEl)
    });

    el.addEventListener('mouseup', function () {
      if (!checkVisible()) return
      el.setAttribute('material', 'color', '#FFF')
    })
  }
})
