module.exports.Primitive = window.AFRAME.registerPrimitive('a-instancemeshgroup', {
  defaultComponents: {
    instancedmeshgroup: {},
  },
  mappings: {
    json: 'instancedmeshgroup.json',
  }
});

module.exports.component = window.AFRAME.registerComponent('instancedmeshgroup', {
  mappings: {
    json: {default: ''},
  },

  schema: {
    json: {type: 'string', default: ''}
  },

  init: function () {
    const jsonData = JSON.parse(this.data.json)

    console.log('JSON Data', jsonData)

    this.clusters = {}

    this._v3 = new window.THREE.Vector3()
    this._q = new window.THREE.Quaternion()
    this._rot = new window.THREE.Euler()
    this._color = new window.THREE.Color()

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

      for (let i = 0 ; i < jsonData.geometryTypes[type].length ; i ++) {
        this.clusters[type].setQuaternionAt( i , this._q.setFromEuler(this._rot.fromArray(jsonData.geometryTypes[type][i].rotation)) )
        this.clusters[type].setPositionAt( i , this._v3.fromArray(jsonData.geometryTypes[type][i].position))
        this.clusters[type].setScaleAt( i , this._v3.fromArray(jsonData.geometryTypes[type][i].scale))
        this._color.setHSL(Math.random(), Math.random(), Math.random())
        this.clusters[type].setColorAt( i , this._color)
      }
      window._elScene.object3D.add(this.clusters[type])
    }

    console.log('Clusters', this.clusters)
  },
})
