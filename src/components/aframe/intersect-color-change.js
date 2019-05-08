module.exports.component = window.AFRAME.registerComponent('intersect-color-change', {
  init: function () {
    var el = this.el

    el.addEventListener('mousedown', function () {
      el.setAttribute('material', 'color', '#EF2D5E')
    });

    el.addEventListener('mouseup', function () {
      el.setAttribute('material', 'color', 'white')
    })
  }
})
