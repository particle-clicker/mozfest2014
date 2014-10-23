/** Helper module for drawing tracks on the canvas. Assumes the coordinate
 * system has been placed in the centre of the canvas.
 */
var Tracks = (function() {
  'use strict';

  var drawCurvedTrack = function(ctx, startX, startY, angle, radius, charge,
                                 curvature) {
    var midpointAngle = angle + charge * curvature;
    var midpointX = startX + radius / 2 * Math.cos(midpointAngle);
    var midpointY = startY + radius / 2 * Math.sin(midpointAngle);
    var endpointX = startX + radius * Math.cos(angle);
    var endpointY = startY + radius * Math.sin(angle);

    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(midpointX, midpointY, endpointX, endpointY);

    return [endpointX, endpointY];
  }; 

  var drawMuonTrack = function(ctx, angle, charge, curvature) {
    var radius = Detector.components.muon.outer + 20;
    var rM = Detector.components.magnet.r;

    ctx.beginPath();
    var magnetPoint = drawCurvedTrack(ctx, 0, 0, angle, rM, charge, curvature);
    drawCurvedTrack(ctx, magnetPoint[0], magnetPoint[1], angle, radius - rM,
                    charge * -1, curvature);
    ctx.stroke();
  };

  var randomAngle = function() {
    return Math.random() * Math.PI * 2;
  };

  var randomRadius = function(comp) {
    var component = Detector.components[comp];
    if (!component) {
      return 0;
    }
    var diff = component.outer - component.inner;
    return Math.random() * diff + component.inner;
  };

  var randomCurvature = function(min, max) {
    return Math.PI / min + Math.random() * (Math.PI / max - Math.PI / min);
  };

  var drawRandomMuon = function(ctx, charge) {
    var angle = randomAngle();
    if (typeof(charge) === "undefined") {
      charge || Math.random() < 0.5 ? -1 : 1;
    }
    var curvature = randomCurvature(10, 5);
    drawMuonTrack(ctx, angle, charge, curvature);
  };

  var drawRandomMuonPair = function(ctx) {
    var angle1 = randomAngle();
    var angle2 = randomAngle();
    var curvature1 = randomCurvature(10, 5);
    var curvature2 = randomCurvature(10, 5);
    drawMuonTrack(ctx, angle1, 1, curvature1);
    drawMuonTrack(ctx, angle2, -1, curvature2);
  };

  return {
    drawRandomMuon: drawRandomMuon,
    drawRandomMuonPair: drawRandomMuonPair
  };
})();
