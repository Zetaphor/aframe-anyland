AFRAME.registerComponent('gui-button', {
  schema: {
      text: {type: 'string', default: 'text'},
      backgroundColor: {type: 'string', default: '#FFF'},
      hoverColor: {type: 'string', default: '#333'},
      width: {type: 'number', default: 1},
      height: {type: 'number', default: 1},
      depth: {type: 'number', default: 1},
      toggle: {type: 'boolean', default: false}
      // activeColor: {type: 'string', default: key_orange},
  },
  init: function() {
    let data = this.data
    let el = this.el
    const scene = document.querySelector('#scene')
    el.setAttribute('geometry', `primitive: plane; height: ${data.height}; width: ${data.width};`)
    el.setAttribute('material', `color:${data.backgroundColor}`)

    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth)
    this.material = new THREE.MeshStandardMaterial({color: data.backgroundColor})
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    el.setObject3D('mesh', this.mesh)

    let buttonContainer = document.createElement("a-entity")
    buttonContainer.setAttribute('geometry', `primitive: box; width: ${data.width}; height: ${data.height}; depth: 0.02;`)
    buttonContainer.setAttribute('material', `color: ${data.borderColor}`)
    buttonContainer.setAttribute('rotation', '0 0 0')
    buttonContainer.setAttribute('position', '0 0 0.01')

    var buttonEntity = document.createElement("a-entity")
    buttonEntity.setAttribute('geometry', `primitive: box; width: ${(data.width-0.025)}; height: ${(data.height-0.025)}; depth: 0.04;`)
    buttonEntity.setAttribute('material', `color: ${data.backgroundColor}`)
    buttonEntity.setAttribute('rotation', '0 0 0')
    buttonEntity.setAttribute('position', '0 0 0.02')
    el.appendChild(buttonEntity)
    this.buttonEntity = buttonEntity
    el.appendChild(buttonContainer)

    var textEntity = document.createElement("a-text")
    textEntity.setAttribute('geometry', `primitive: plane; width: ${data.width/1.05}; height: ${data.height/1.05};`)
    textEntity.setAttribute('value', data.text)
    textEntity.setAttribute('position', '0 0 0.041')
    el.appendChild(textEntity)

    scene.append(el)

    el.addEventListener('mouseenter', function () {
      if (!(data.toggle)) {
        buttonEntity.setAttribute('material', 'color', data.hoverColor)
      }
    })

    el.addEventListener('mouseleave', function () {
        if (!(data.toggle)) {
          buttonEntity.setAttribute('material', 'color', data.backgroundColor)
        }
    })

    el.addEventListener('click', function () {
      console.log('Clicked!')
    })
  }
})

AFRAME.registerPrimitive( 'a-gui-button', {
  mappings: {
      'width': 'width',
      'height': 'height'
  }
})