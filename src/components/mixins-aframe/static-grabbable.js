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
        el.body.mass = 5
        el.body.updateMassProperties()
        el.body.wakeUp()
        dynamic = true
      }
    })

    el.addEventListener('mouseup', function () {
      if (dynamic) {
        el.body.mass = 0
        el.body.updateMassProperties()
        el.body.sleep()
        dynamic = false
      }
    })
  }
});
