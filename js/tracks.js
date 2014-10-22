/** Helper module for drawing tracks on the canvas. Assumes the coordinate
 * system has been placed in the centre of the canvas.
 */
var Tracks = (function() {
  'use strict';

  /** Create a new Track with endpoint given by `angle` and `radius`. The
   * `charge` and `velocity` (of the corresponding particle) are used to
   * determine the curvature of the track with respect to a given magnet.
   */
  var Track = function(angle, radius, charge, velocity) {
    
  };

  /** Draw a track from the origin (0, 0) to a certain location (x, y).
   * The track will bend depending on its velocity and charge and on the
   * magnet's radius.
   *
   * Parameters:
   *  ctx          - The context to be drawn on
   *  x            - Horizontal coordinate of the track's endpoint
   *  y            - Vertical coordinate of the track's endpoint
   *  v            - The particle's velocity
   *  q            - The particle's charge. Can be 0, 1 or -1
   *  magnetRadius - Radius of the magnet. Used to determine whether the track
   *                 bends twice
   */
  var drawTrack = function(ctx, x, y, v, q, magnetRadius) {
    var r = Math.sqrt(x * x + y * y);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    if (q === 0) {  // Uncharged particles don't care about magnetic fields
      ctx.lineTo(x, y);
    } else {
      if (r > magnetRadius) {  // Track goes beyond the magnet
      } else {  // Track is fully within magnet
        ctx.quadraticCurveTo(x/2, y + q * y / 2, x, y);
      }
    }
    ctx.stroke();
  };


  var drawRandomTrack = function(ctx, w, h) {
    var x = Math.random() * w - w / 2;
    var y = Math.random() * h - h / 2;
    var q = Math.floor(Math.random() * 3 - 1);
    drawTrack(ctx, x, y, 0, q, 500);
  };


  // Export functionality
  return {
    drawTrack: drawTrack,
    drawRandomTrack: drawRandomTrack
  };
})();
