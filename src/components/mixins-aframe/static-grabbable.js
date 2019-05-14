module.exports.component = window.AFRAME.registerComponent('static-grabbable', {
  init: function () {
    let el = this.el
    let hovering = false
    let dynamic = false
    let instanceEls = null

    el.addEventListener('hover-start', function () {
      hovering = true
    })

    el.addEventListener('hover-end', function () {
      hovering = false
    })

    el.addEventListener('mousedown', function () {
      if (hovering) {
        instanceEls = document.getElementById(el.dataset.instanceid).components.instancedmeshgroup.clusterPhysicalEls
        for (const type in instanceEls) {
          if (!instanceEls.hasOwnProperty(type)) continue
          for (let index = 0; index < instanceEls[type].length; index++) {
            instanceEls[type][index].body.mass = 5
            instanceEls[type][index].body.updateMassProperties()
            instanceEls[type][index].body.wakeUp()
          }
        }
        dynamic = true
      }
    })

    el.addEventListener('mouseup', function () {
      if (dynamic) {
        for (const type in instanceEls) {
          if (!instanceEls.hasOwnProperty(type)) continue
          for (let index = 0; index < instanceEls[type].length; index++) {
            instanceEls[type][index].body.mass = 0
            instanceEls[type][index].body.updateMassProperties()
            instanceEls[type][index].body.sleep()
          }
        }
        dynamic = false
      }
    })
  }
});
