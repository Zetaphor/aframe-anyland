module.exports.component = window.AFRAME.registerComponent('static-grabbable', {
  init: function () {
    let el = this.el
    let hovering = false
    let dynamic = false

    el.addEventListener('hover-start', function () {
      hovering = true
    })

    el.addEventListener('hover-end', function () {
      hovering = false
    })

    el.addEventListener('mousedown', function () {
      if (hovering) {
        el.removeAttribute('static-body')
        el.setAttribute('dynamic-body', '')
        dynamic = true
      }
    })

    el.addEventListener('mouseup', function () {
      if (dynamic) {
        el.removeAttribute('dynamic-body')
        el.setAttribute('static-body', '')
        dynamic = false
      }
    })
  }
});
