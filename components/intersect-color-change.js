/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('intersect-color-change', {
  init: function () {
    var el = this.el;
    var material = el.getAttribute('material');
    var initialColor = material.color;
    var self = this;

    el.addEventListener('mousedown', function (evt) {
      console.log('mousedown');
      el.setAttribute('material', 'color', '#EF2D5E');
    });

    el.addEventListener('mouseup', function (evt) {
      console.log('mouseup');
      el.setAttribute('material', 'color', 'white');
    });
  }
});
