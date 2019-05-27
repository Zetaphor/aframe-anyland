window.AFRAME.registerComponent('grab-raycaster', {
  schema: {
    direction: {type: 'vec3', default: {x: 0, y: 0, z: -1}},
    origin: {type: 'vec3', default: {x: 0, y: -0.05, z: 0.1}},
    useWorldCoordinates: {default: false},
    hand: {type: 'string'}
  },

  init: function () {
    let el = this.el
    this.rawInstancedIntersections = []
    this.checkIntersections = this.checkIntersections.bind(this)
    this.clearIntersections = this.clearIntersections.bind(this)
    this.raycaster = new window.THREE.Raycaster()
    this.grabbing = false
    this.grabRoot = null
    this.updateOriginDirection()
    el.addEventListener('mousedown', this.checkIntersections)
    el.addEventListener('mouseup', this.clearIntersections)
  },

  checkIntersections: function () {
    this.raycaster.far = 0.21
    this.updateOriginDirection()
    this.rawInstancedIntersections.length = 0
    this.raycaster.intersectObjects(window._hiddenGeometries, true, this.rawInstancedIntersections)

    if (this.rawInstancedIntersections.length) {
      this.grabRoot = document.getElementById(this.rawInstancedIntersections[0].object.userData.instanceId)
      this.grabRoot.dispatchEvent(new CustomEvent('instance-part-grab', {
        detail: {
          index: this.rawInstancedIntersections[0].object.userData.instanceIndex,
          hand: this.data.hand
        }
      }))
      this.grabbing = true
    }
  },

  clearIntersections: function () {
    if (this.grabbing) this.grabRoot.dispatchEvent(new CustomEvent('instance-part-grab-stop'))
  },

  /**
   * Update origin and direction of raycaster using entity transforms and supplied origin or
   * direction offsets.
   */
  updateOriginDirection: (function () {
    var direction = new window.THREE.Vector3();
    var originVec3 = new window.THREE.Vector3();

    // Closure to make quaternion/vector3 objects private.
    return function updateOriginDirection () {
      var el = this.el;
      var data = this.data;

      if (data.useWorldCoordinates) {
        this.raycaster.set(data.origin, data.direction);
        return;
      }

      // Grab the position and rotation. (As a side effect, this updates el.object3D.matrixWorld.)
      el.object3D.getWorldPosition(originVec3);

      // If non-zero origin, translate the origin into world space.
      if (data.origin.x !== 0 || data.origin.y !== 0 || data.origin.z !== 0) {
        originVec3 = el.object3D.localToWorld(originVec3.copy(data.origin));
      }

      // three.js raycaster direction is relative to 0, 0, 0 NOT the origin / offset we
      // provide. Apply the offset to the direction, then rotation from the object,
      // and normalize.
      direction.copy(data.direction).transformDirection(el.object3D.matrixWorld).normalize();

      // Apply offset and direction, in world coordinates.
      this.raycaster.set(originVec3, direction);
    };
  })()

});