"use strict"

var ndarray = require("ndarray")
var ops = require("ndarray-ops")

module.exports = function getPixels(url, cb) {
  var img = new Image()
  img.onload = function() {
    var canvas = document.createElement("canvas")
    canvas.width = img.width
    canvas.height = img.height
    var context = canvas.getContext("2d")
    context.drawImage(img)
    var pixels = context.getImageData(0, 0, img.width, img.height)
    cb(null, ndarray.ctor(new Uint8Array(pixels.data), [img.width, img.height, 4], [4, 4*img.width, 1], 0))
  }
  img.onerror = function(err) {
    cb(err)
  }
  img.src = url
}
