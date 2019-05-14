module.exports.component = window.AFRAME.registerComponent('instanced-mesh', {
  init: function () {
    require('three-instanced-mesh')(window.THREE)

    var boxGeometry = new window.THREE.BoxBufferGeometry(2,2,2,1,1,1);

    //material that the geometry will use
    var material = new window.THREE.MeshPhongMaterial();

    var totalCubes = 40000

    this._v3 = new window.THREE.Vector3();
    this._q = new window.THREE.Quaternion();
    this._rot = new window.THREE.Euler();
    this._color = new window.THREE.Color();
    this.pi2 = Math.PI * 2;
    this.ticks = 0
    this.maxTicks = 3

    //the instance group
    this.cluster = new window.THREE.InstancedMesh(
      boxGeometry,                 //this is the same
      material,
      totalCubes,                       //instance count
      false,                       //is it dynamic
      true,                        //does it have color
      true,                        //uniform scale, if you know that the placement function will not do a non-uniform scale, this will optimize the shader
    );




    for ( var i = 0 ; i < totalCubes ; i ++ ) {
      this._rot.set(  Math.random() * this.pi2 , Math.random() * this.pi2 , Math.random() * this.pi2 );
      this._q.setFromEuler(this._rot );
      this._v3.set( Math.random() * 2 - 1 , 0.1 , Math.random() * 2 - 1 ).multiplyScalar( 100 )

      this.cluster.setQuaternionAt( i , this._q );
      this.cluster.setPositionAt( i , this._v3 );
      this.cluster.setScaleAt( i , this._v3.set(1,1,1) );
      this._color.setHSL( Math.random() , Math.random() , Math.random() );
      this.cluster.setColorAt( i , this._color );

    }

    window._elScene.object3D.add( this.cluster );
  },

  tick: function () {
    this.ticks = this.ticks + 1
    if (this.ticks === this.maxTicks) {
      for ( var i = 0 ; i < this.cluster.numInstances ; i ++ ){
        this._rot.set(  Math.random() * this.pi2 , Math.random() * this.pi2 , Math.random() * this.pi2 );
        this.cluster.setQuaternionAt( i , this._q.setFromEuler( this._rot ) );
      }

      this.cluster.needsUpdate( 'quaternion' );
      this.ticks = 0
    }
  }
})
