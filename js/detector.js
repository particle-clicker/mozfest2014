/** Helper module to draw the detector onto a canvas. Assumes the coordinate
 * system has been placed in the centre of the canvas.
 */
var Detector = (function() {
  'use strict';

  // Define detector components in terms of inner and outer radius.
  var components = {
    tracker: {inner: 20, outer: 100, color: '#FFFF80'},
    ecal: {inner: 102, outer: 140, color: '#00FF00'},
    hcal: {inner: 142, outer: 190, color: '#00FFFF'},
    magnet: {inner: 192, outer: 210, color: '#666666'},
    muon: {inner: 212, outer: 300, color: '#FF0000'}
  };

  var drawComponent = function(ctx, comp) {
    ctx.beginPath();
    ctx.arc(0, 0, comp.outer, 0, Math.PI*2, false);
    ctx.arc(0, 0, comp.inner, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = comp.color;
    ctx.fill();
  };

  var draw = function(ctx) {
    for (var component in components) {
      drawComponent(ctx, components[component]);
    }
  };

  return {
    draw: draw
  };
})();
