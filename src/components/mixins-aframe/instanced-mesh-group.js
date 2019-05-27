window.AFRAME.registerPrimitive('a-instancemeshgroup', {
  defaultComponents: {
    instancedmeshgroup: {},
  },
  mappings: {
    json: 'instancedmeshgroup.json',
    physical: 'instancedmeshgroup.physical',
    rigid: 'instancedmeshgroup.rigid'
  }
});

window.AFRAME.registerComponent('instancedmeshgroup', {
  mappings: {
    json: {default: ''},
    physical: {default: false},
  },

  schema: {
    json: {type: 'string', default: ''},
    physical: {type: 'boolean', default: false},
    rigid: {type: 'boolean', default: true}
  },

  init: function () {
    const jsonData = JSON.parse(this.data.json)

    this.clusters = {}
    this.hiddenClusters = {}

    this._v3 = new window.THREE.Vector3()
    this._q = new window.THREE.Quaternion()
    this._oq = new window.THREE.Quaternion()
    this._rot = new window.THREE.Euler()
    this._color = new window.THREE.Color()

    this.setRootInstance = false
    this.currentIsRoot = false
    this.rootInstanceEl = document.createElement('a-entity')
    this.rootInstancePos = new window.THREE.Vector3()

    this.editing = false
    this.editingIndex = -1
    this.editHand = ''
    this.editPart = null

    this.debugCounter = 0

    let rootObjectShapes = []

    let totalParts = 0

    for (const type in jsonData.geometryTypes) {
      if (!jsonData.geometryTypes.hasOwnProperty(type)) continue

      totalParts += jsonData.geometryTypes[type].length

      let clusterGeometry = null
      // These values are the defaults that A-Frame uses, new geometries need to match either those or what was set in primMenu
      if (type === 'box') clusterGeometry = new window.THREE.BoxBufferGeometry(1,1,1,1,1,1)
      else if (type === 'sphere') clusterGeometry = new window.THREE.SphereBufferGeometry(1,36,18)
      else if (type === 'cylinder') clusterGeometry = new window.THREE.CylinderBufferGeometry(1,1,36,18)
      let material = new window.THREE.MeshPhongMaterial()

      this.clusters[type] = new window.THREE.InstancedMesh(
        clusterGeometry,
        material,
        jsonData.geometryTypes[type].length, //instance count
        false,                               //is it dynamic
        true,                                //does it have color
        false                                //uniform scale, if you know that the placement function will not do a non-uniform scale, this will optimize the shader
      )

      if (!this.setRootInstance) {
        if (type === 'box') this.rootInstanceEl.setAttribute('geometry', `primitive:box; width:${jsonData.geometryTypes[type][0].scale[0]}; height:${jsonData.geometryTypes[type][0].scale[1]}; depth:${jsonData.geometryTypes[type][0].scale[2]}`)
        else if (type === 'sphere') this.rootInstanceEl.setAttribute('geometry', `primitive:sphere; radius:${jsonData.geometryTypes[type][0].scale[0]}`)
        else if (type === 'cylinder') this.rootInstanceEl.setAttribute('geometry', `primitive:cylinder; radius:${jsonData.geometryTypes[type][0].scale[0]} height:${jsonData.geometryTypes[type][0].scale[2]}`)
        this.rootInstanceEl.setAttribute('position', `${jsonData.geometryTypes[type][0].position[0]} ${jsonData.geometryTypes[type][0].position[1]} ${jsonData.geometryTypes[type][0].position[2]}`)
        let id = 'root-' + window.generateUid()
        this.rootInstanceEl.setAttribute('id', id)
        this.rootInstanceEl.setAttribute('data-instanceid', this.el.id)
        this.rootInstanceEl.setAttribute('mixin', 'physical-instance-object')
        this.rootInstanceEl.setAttribute('class', 'collides')
        this.rootInstanceEl.setAttribute('collision-filter', 'group: touchable; collidesWith:' + window.vueObj.$store.state.objectCollisionFilter)
        if (this.data.physical) this.rootInstanceEl.setAttribute('body', 'type: dynamic; mass: 5')
        else {
          this.rootInstanceEl.setAttribute('body', 'type: dynamic; mass: 0')
          this.rootInstanceEl.setAttribute('static-grabbable', '')
        }
        this.rootInstancePos.set(jsonData.geometryTypes[type][0].position[0], jsonData.geometryTypes[type][0].position[1], jsonData.geometryTypes[type][0].position[2])
        this.setRootInstance = true
        this.currentIsRoot = true
      }

      for (let i = 0; i < jsonData.geometryTypes[type].length; i ++) {
        if (this.currentIsRoot) {
          this.currentIsRoot = false
          continue
        }

        // Create instanced geometry
        this.clusters[type].setQuaternionAt( i , this._q.setFromEuler(this._rot.fromArray(jsonData.geometryTypes[type][i].rotation)) )
        this.clusters[type].setPositionAt( i , this._v3.fromArray(jsonData.geometryTypes[type][i].position))
        this.clusters[type].setScaleAt( i , this._v3.fromArray(jsonData.geometryTypes[type][i].scale))
        this._color.setHSL(Math.random(), Math.random(), Math.random())
        this.clusters[type].setColorAt( i , this._color)

        // Create physics body children
        let newShape = null
        if (type === 'box') newShape = new window.CANNON.Box(new window.CANNON.Vec3().set(jsonData.geometryTypes[type][i].scale[0] / 2, jsonData.geometryTypes[type][i].scale[1] / 2, jsonData.geometryTypes[type][i].scale[2] / 2))
        else if (type === 'sphere') newShape = new window.CANNON.Sphere(jsonData.geometryTypes[type][i].scale[0])
        else if (type === 'cylinder') newShape = new window.CANNON.Cylinder(jsonData.geometryTypes[type][i].scale[0], jsonData.geometryTypes[type][i].scale[1], jsonData.geometryTypes[type][i].scale[2])

        rootObjectShapes.push({
          shape: newShape,
          offset: new window.THREE.Vector3().subVectors(this._v3.set(jsonData.geometryTypes[type][i].position[0], jsonData.geometryTypes[type][i].position[1], jsonData.geometryTypes[type][i].position[2]), this.rootInstancePos)
        })

        // Create hidden raycasting geometry
        let newHiddenGeometry = null
        if (type === 'box') newHiddenGeometry = new window.THREE.BoxBufferGeometry(jsonData.geometryTypes[type][i].scale[0], jsonData.geometryTypes[type][i].scale[1], jsonData.geometryTypes[type][i].scale[2])
        else if (type === 'sphere') newHiddenGeometry = new window.THREE.SphereBufferGeometry(jsonData.geometryTypes[type][i].scale[0], 8, 6)
        else if (type === 'cylinder') newHiddenGeometry = new window.THREE.CylinderBufferGeometry(jsonData.geometryTypes[type][i].scale[0], jsonData.geometryTypes[type][i].scale[1], jsonData.geometryTypes[type][i].scale[2], 5)
        var object = new window.THREE.Mesh(newHiddenGeometry)
        object.name = this.rootInstanceEl.id + '|' + i
        object.userData.instanceId = this.rootInstanceEl.id
        object.userData.instanceIndex = i
        object.userData.hiddenIndex = window._hiddenScene.children.length
        object.position.fromArray(jsonData.geometryTypes[type][i].position)
        object.rotation.fromArray(jsonData.geometryTypes[type][i].rotation)
        window._hiddenScene.add(object)
        object.updateMatrixWorld()
        window._hiddenGeometries.push(object)
      }

      window._elScene.object3D.add(this.clusters[type])
    }

    window._elScene.appendChild(this.rootInstanceEl)
    this.el.setAttribute('data-parttotal', totalParts)

    this.rootInstanceEl.addEventListener('body-loaded', function () {
      for (let i = 0; i < rootObjectShapes.length; i++) {
        this.body.addShape(rootObjectShapes[i].shape, rootObjectShapes[i].offset)
      }
    })

    let that = this
    this.rootInstanceEl.addEventListener('instance-part-grab', function (evt) {
      that.editHand = evt.detail.hand === 'left' ? window._elLeftHand : window._elRightHand
      that.editingIndex = evt.detail.index
      that.editing = true
      that.createEditPart()
    })

    this.rootInstanceEl.addEventListener('instance-part-grab-stop', function () {
      that.editing = false
      that.editHand = null
      that.editingIndex = -1
      that.finalizeEditPart()
    })

    // console.log('Clusters', this.clusters)
  },

  getType: function (type) {
    if (type === window.CANNON.Shape.types.BOX) return 'box'
    else if (type === window.CANNON.Shape.types.SPHERE) return 'sphere'
    else if (type === window.CANNON.Shape.types.CYLINDER) return 'cylinder'
  },

  createEditPart: function () {
    let newId = 'prim-' + window.generateUid()
    let newPrim = document.createElement('a-entity')
    newPrim.setAttribute('mixin', 'prim-' + this.getType(this.rootInstanceEl.body.shapes[this.editingIndex].body.shapes[this.editingIndex].type))
    newPrim.setAttribute('id', newId)
    newPrim.setAttribute('class', 'collides')

    let offset = new window.THREE.Vector3().copy(this.rootInstanceEl.body.shapeOffsets[this.editingIndex]).applyQuaternion(this._q.copy(this.rootInstanceEl.body.shapes[this.editingIndex].body.quaternion))
    let position = new window.THREE.Vector3().copy(this.rootInstanceEl.body.shapes[this.editingIndex].body.position).add(offset)

    newPrim.setAttribute('position', position)
    newPrim.setAttribute('rotation', this.rootInstanceEl.body.shapes[this.editingIndex].body.quaternion)
    window._elScene.appendChild(newPrim)
    this.editPart = newPrim

    this.rootInstanceEl.body.shapes.splice(this.editingIndex, 1)
    this.rootInstanceEl.body.shapeOffsets.splice(this.editingIndex, 1)
    this.rootInstanceEl.body.shapeOrientations.splice(this.editingIndex, 1)
    this.rootInstanceEl.body.computeAABB()
    this.rootInstanceEl.body.updateMassProperties()
    this.rootInstanceEl.body.updateBoundingRadius()
  },

  finalizeEditPart: function () {
    let newPartGeometry = this.editPart.getAttribute('geometry')

    // this.clusters[newPartGeometry.primitive].setPositionAt()
    // Create physics body children
    let newShape = null
    if (newPartGeometry.primitive === 'box') newShape = new window.CANNON.Box(new window.CANNON.Vec3().set(this.editPart.object3D.scale.x / 2, this.editPart.object3D.scale.y / 2, this.editPart.object3D.scale.z / 2))
    else if (newPartGeometry.primitive === 'sphere') newShape = new window.CANNON.Sphere(this.editPart.object3D.scale.x)
    else if (newPartGeometry.primitive === 'cylinder') newShape = new window.CANNON.Cylinder(this.editPart.object3D.scale.x, this.editPart.object3D.scale.y, this.editPart.object3D.scale.z)

    this.rootInstanceEl.body.addShape(newShape, new window.THREE.Vector3().subVectors(new window.THREE.Vector3().copy(this.editPart.object3D.position), this.rootInstancePos))


    // Create hidden raycasting geometry
    let newHiddenGeometry = null
    if (newPartGeometry.primitive === 'box') newHiddenGeometry = new window.THREE.BoxBufferGeometry(this.editPart.object3D.scale.x, this.editPart.object3D.scale.y, this.editPart.object3D.scale.z)
    else if (newPartGeometry.primitive === 'sphere') newHiddenGeometry = new window.THREE.SphereBufferGeometry(this.editPart.object3D.scale.x, 8, 6)
    else if (newPartGeometry.primitive === 'cylinder') newHiddenGeometry = new window.THREE.CylinderBufferGeometry(this.editPart.object3D.scale.x, this.editPart.object3D.scale.y, this.editPart.object3D.scale.z, 5)
    var object = new window.THREE.Mesh(newHiddenGeometry)
    object.name = this.rootInstanceEl.id + '|' + this.rootInstanceEl.body.shapes.length
    object.userData.instanceId = this.rootInstanceEl.id
    object.userData.instanceIndex = this.rootInstanceEl.body.shapes.length
    object.userData.hiddenIndex = window._hiddenScene.children.length
    object.position.copy(this.editPart.object3D.position)
    object.rotation.copy(this.editPart.object3D.rotation)
    window._hiddenScene.add(object)
    object.updateMatrixWorld()
    window._hiddenGeometries.push(object)
  },

  tick: function () {
    let shapeOffset = {}
    let currentHiddenObject = null
    let iterationType = 'box'

    for (let i = 0; i < this.rootInstanceEl.body.shapes.length; i++) {
      if (this.rootInstanceEl.body.shapes[i].type === window.CANNON.Shape.types.BOX) iterationType = 'box'
      else if (this.rootInstanceEl.body.shapes[i].type === window.CANNON.Shape.types.SPHERE) iterationType = 'sphere'
      if (typeof shapeOffset[iterationType] === 'undefined') shapeOffset[iterationType] = 0

      // Update instance geometry position/rotation
      let offset = new window.THREE.Vector3().copy(this.rootInstanceEl.body.shapeOffsets[i]).applyQuaternion(this._q.copy(this.rootInstanceEl.body.shapes[i].body.quaternion))
      let position = this._v3.copy(this.rootInstanceEl.body.shapes[i].body.position).add(offset)
      this.clusters[iterationType].setPositionAt(shapeOffset[iterationType], position)
      this.clusters[iterationType].setQuaternionAt(shapeOffset[iterationType], this._q.copy(this.rootInstanceEl.body.shapes[i].body.quaternion))
      this.clusters[iterationType].needsUpdate()
      shapeOffset[iterationType] += 1

      // Update hidden mesh position/rotation
      currentHiddenObject = window._hiddenScene.getObjectByName(this.rootInstanceEl.id + '|' + i)
      if (currentHiddenObject !== undefined) {
        currentHiddenObject.position.copy(position)
        currentHiddenObject.rotation.copy(this.rootInstanceEl.body.shapes[i].body.quaternion)
        currentHiddenObject.updateMatrixWorld()
      }
    }
  }
})
