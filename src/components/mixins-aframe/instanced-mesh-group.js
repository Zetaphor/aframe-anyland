module.exports.Primitive = window.AFRAME.registerPrimitive('a-instancemeshgroup', {
  defaultComponents: {
    instancedmeshgroup: {},
  },
  mappings: {
    json: 'instancedmeshgroup.json',
    physical: 'instancedmeshgroup.physical',
    clusterPhysicalEls: 'instancedmeshgroup.clusterPhysicalEls',
    rigid: 'instancedmeshgroup.rigid'
  }
});

module.exports.component = window.AFRAME.registerComponent('instancedmeshgroup', {
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

    this.clusterPhysicalEls = {}

    this._v3 = new window.THREE.Vector3()
    this._q = new window.THREE.Quaternion()
    this._oq = new window.THREE.Quaternion()
    this._rot = new window.THREE.Euler()
    this._color = new window.THREE.Color()

    this.setRootInstance = false
    this.rootInstanceEl = document.createElement('a-entity')
    let id = 'root-' + window.generateUid()
    this.rootInstanceEl.setAttribute('id', id)
    this.rootInstanceEl.setAttribute('data-instanceid', this.el.id)
    this.rootInstancePos = new window.THREE.Vector3()

    let rootObjectShapes = []

    for (const type in jsonData.geometryTypes) {
      if (!jsonData.geometryTypes.hasOwnProperty(type)) continue
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
        this.rootInstanceEl.setAttribute('mixin', 'physical-instance-object')
        this.rootInstanceEl.setAttribute('class', 'collides')
        this.rootInstanceEl.setAttribute('collision-filter', 'group: touchable; collidesWith:' + window.vueObj.$store.state.objectCollisionFilter)
        this.rootInstanceEl.setAttribute('body', 'type: dynamic; mass: 5')
        this.rootInstanceEl.setAttribute('material', 'shader: flat; visible: false')
        this.rootInstancePos.set(jsonData.geometryTypes[type][0].position[0], jsonData.geometryTypes[type][0].position[1], jsonData.geometryTypes[type][0].position[2])
        this.setRootInstance = true
      }

      for (let i = 0 ; i < jsonData.geometryTypes[type].length ; i ++) {
        this.clusters[type].setQuaternionAt( i , this._q.setFromEuler(this._rot.fromArray(jsonData.geometryTypes[type][i].rotation)) )
        this.clusters[type].setPositionAt( i , this._v3.fromArray(jsonData.geometryTypes[type][i].position))
        this.clusters[type].setScaleAt( i , this._v3.fromArray(jsonData.geometryTypes[type][i].scale))
        this._color.setHSL(Math.random(), Math.random(), Math.random())
        this.clusters[type].setColorAt( i , this._color)

        let newShape = null

        if (type === 'box') newShape = new window.CANNON.Box(new window.CANNON.Vec3().set(jsonData.geometryTypes[type][i].scale[0] / 2, jsonData.geometryTypes[type][i].scale[1] / 2, jsonData.geometryTypes[type][i].scale[2] / 2))
        else if (type === 'sphere') newShape = new window.CANNON.Sphere(jsonData.geometryTypes[type][i].scale[0])
        else if (type === 'cylinder') newShape = new window.CANNON.Cylinder(jsonData.geometryTypes[type][i].scale[0], jsonData.geometryTypes[type][i].scale[1], jsonData.geometryTypes[type][i].scale[2])

        rootObjectShapes.push({
          shape: newShape,
          offset: new window.THREE.Vector3().subVectors(this._v3.set(jsonData.geometryTypes[type][i].position[0], jsonData.geometryTypes[type][i].position[1], jsonData.geometryTypes[type][i].position[2]), this.rootInstancePos)
        })

        // else {
          // let newClusterEl = document.createElement('a-entity')
          // let id = window.generateUid()

          // newClusterEl.setAttribute('id', id)
          // newClusterEl.setAttribute('data-parentid', rootElId)
          // newClusterEl.setAttribute('data-instanceid', this.el.id)
          // newClusterEl.setAttribute('data-parttotal', jsonData.geometryTypes[type].length)
          // if (type === 'box') newClusterEl.setAttribute('geometry', `primitive:box; width:${jsonData.geometryTypes[type][i].scale[0]}; height:${jsonData.geometryTypes[type][i].scale[1]}; depth:${jsonData.geometryTypes[type][i].scale[2]}`)
          // else if (type === 'sphere') newClusterEl.setAttribute('geometry', `primitive:sphere; radius:${jsonData.geometryTypes[type][i].scale[0]}`)
          // else if (type === 'cylinder') newClusterEl.setAttribute('geometry', `primitive:cylinder; radius:${jsonData.geometryTypes[type][i].scale[0]} height:${jsonData.geometryTypes[type][i].scale[2]}`)
          // newClusterEl.setAttribute('material', 'visible: false')
          // newClusterEl.setAttribute('position', `${jsonData.geometryTypes[type][i].position[0]} ${jsonData.geometryTypes[type][i].position[1]} ${jsonData.geometryTypes[type][i].position[2]}`)
          // newClusterEl.setAttribute('mixin', 'physical-instance-object')
          // newClusterEl.setAttribute('class', 'collides')
          // newClusterEl.setAttribute('collision-filter', 'group: touchable; collidesWith:' + window.vueObj.$store.state.objectCollisionFilter)
          // newClusterEl.setAttribute('body', 'type: dynamic; mass: 5')

          // if (i === 0) {
          //   rootElId = id
          //   prevId = id
          // }
          // else {
          //   newClusterEl.setAttribute('constraint', 'type: lock; collideConnected: false; target: #' + prevId)
          //   prevId = id
          // }

          // if (typeof this.clusterPhysicalEls[type] === 'undefined') this.clusterPhysicalEls[type] = []
          // this.clusterPhysicalEls[type][i] = newClusterEl

          // window._elScene.appendChild(newClusterEl)
        // }
      }
      // if (!this.data.physical) {
      //   if (newBodyShapes.length) {
      //     for (let index = 0; index < newBodyShapes.length; index++) {

      //     }
      //   }
      // }

      window._elScene.object3D.add(this.clusters[type])
    }

    window._elScene.appendChild(this.rootInstanceEl)

    this.rootInstanceEl.addEventListener('body-loaded', function () {
      console.log('Body loaded')
      for (let index = 0; index < rootObjectShapes.length; index++) {
        this.body.addShape(rootObjectShapes[index].shape, rootObjectShapes[index].offset)
      }
      console.log(this.body)
    })

    console.log('Clusters', this.clusters)
  },

  tick: function () {
    for (let index = 0; index < this.rootInstanceEl.body.shapeOffsets.length; index++) {
      // Need to iterate through both the different types of body shapes and set their update position/offset based on the body position/rotation and body.shapeOffsets
    }

    // for (const type in this.clusterPhysicalEls) {
    //   if (!this.clusterPhysicalEls.hasOwnProperty(type)) continue
    //   for (let i = 0; i < this.clusterPhysicalEls[type].length; i++) {
    //     if (!this.clusterPhysicalEls[type][i].body) continue
    //     if (!this.clusterPhysicalEls[type][i].object3D) continue
    //     if (this.clusterPhysicalEls[type][i].body.position.x !== this.clusterPhysicalEls[type][i].body.previousPosition.x || this.clusterPhysicalEls[type][i].body.position.y !== this.clusterPhysicalEls[type][i].body.previousPosition.y ||
    //       this.clusterPhysicalEls[type][i].body.position.z !== this.clusterPhysicalEls[type][i].body.previousPosition.z || this.clusterPhysicalEls[type][i].body.quaternion.x !== this.clusterPhysicalEls[type][i].body.previousQuaternion.x ||
    //       this.clusterPhysicalEls[type][i].body.quaternion.y !== this.clusterPhysicalEls[type][i].body.previousQuaternion.y || this.clusterPhysicalEls[type][i].body.quaternion.z !== this.clusterPhysicalEls[type][i].body.previousQuaternion.z ||
    //       this.clusterPhysicalEls[type][i].body.quaternion.w !== this.clusterPhysicalEls[type][i].body.previousQuaternion.w) {
    //         this.clusters[type].setPositionAt(i, this._v3.set(this.clusterPhysicalEls[type][i].body.position.x, this.clusterPhysicalEls[type][i].body.position.y, this.clusterPhysicalEls[type][i].body.position.z))
    //         this.clusters[type].setQuaternionAt(i , this.clusterPhysicalEls[type][i].body.quaternion)
    //         this.clusters[type].needsUpdate()
    //     }
    //   }
    // }
  }
})
