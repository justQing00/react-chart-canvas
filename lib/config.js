'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Caution: In FireFox, layerX/layerY Mouse position relative to the closest positioned
// ancestor element.
// In FireFox, offsetX/offsetY is always 0.
var getEventPosition = exports.getEventPosition = function getEventPosition(event) {
  var x = null;
  var y = null;
  if (navigator.userAgent.indexOf('Firefox') > -1 && (event.layerX || event.layerX === 0)) {
    x = event.layerX;
    y = event.layerY;
  } else if (event.offsetX || event.offsetX === 0) {
    x = event.offsetX;
    y = event.offsetY;
  }
  return { x: x, y: y };
};

var getPixelRatio = exports.getPixelRatio = function getPixelRatio(context) {
  var backingStore = context && (context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio) || 1;
  return (window.devicePixelRatio || 1) / backingStore;
};