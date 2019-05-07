/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('static-grabbable', {
  init: function () {
    let el = this.el
    let self = this
    let hovering = false
    let dynamic = false

    el.addEventListener('hover-start', function (evt) {
      hovering = true
    })

    el.addEventListener('hover-end', function (evt) {
      hovering = false
    })

    el.addEventListener('mousedown', function (evt) {
      if (hovering) {
        el.removeAttribute('static-body')
        el.setAttribute('dynamic-body', '')
        dynamic = true
      }
    })

    el.addEventListener('mouseup', function (evt) {
      if (dynamic) {
        el.removeAttribute('dynamic-body')
        el.setAttribute('static-body', '')
        dynamic = false
      }
    })
  }
});
