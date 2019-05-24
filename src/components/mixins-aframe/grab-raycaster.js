window.AFRAME.registerComponent('grab-raycaster', {
  schema: {
    direction: {type: 'vec3', default: {x: 0, y: 0, z: -1}},
    origin: {type: 'vec3', default: {x: 0, y: -0.05, z: 0.1}},
    useWorldCoordinates: {default: false}
  },

  init: function () {
    let el = this.el
    this.rawInstancedIntersections = []
    this.dirty = false
    this.setDirty = this.setDirty.bind(this);

    this.raycaster = new window.THREE.Raycaster();
    this.updateOriginDirection();

    el.addEventListener('mousedown', this.setDirty)
  },

  tick: function () {
    if (this.dirty) this.checkIntersections()
  },

  setDirty: function () {
    this.dirty = true
  },

  checkIntersections: function () {
    this.dirty = false
    this.raycaster.far = 0.21
    this.updateOriginDirection()
    let rawInstancedIntersections = []
    this.raycaster.intersectObjects(window._hiddenScene.children, true, rawInstancedIntersections);
    if (rawInstancedIntersections.length) console.log(rawInstancedIntersections[0])
    // Get ID and child index of rootElement with physics, dispatchEvent on that element telling it to watch X hand
    // Fire another event on mouseup telling it to stop watching that hand
    // On tick when watching update offset
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
