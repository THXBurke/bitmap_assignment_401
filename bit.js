'use strict';

var fs = require('fs');
var bitmap = fs.readFileSync(__dirname + '/images/palette-bitmap.bmp');
var bitmapData = {};

// bitmapData.headField = bitmap.toString('ascii', 0, 2);
//convert buffer header data into js object
bitmapData.headField = bitmap.toString('ascii',0,2);
bitmapData.size = bitmap.readUInt32LE(2);
bitmapData.pixelArraysStart = bitmap.readUInt32LE(10);
bitmapData.paletteColors = bitmap.readUInt32LE(46);

console.dir(bitmapData.toString('hex'));
console.log(bitmap.readUInt32LE(2));
bitmapData.width = (bitmap.readUInt32LE(22));

var colors = {};
colors.getColors = function () {

  for (var i = 54; i<64; i++) {
    console.log('colors: ' + bitmap[i]);
  };
};
colors.changeColors = function() {
  var x = bitmap[58];
  for (var i=55; i<1078; i = 1+2) {
    bitmap[i] = x;
  };

  return bitmap;
};

colors.getColors();

colors.changeColors = function() {

  for(var i = 55; i<1078; i++) {
    bitmap.writeUInt32LE(255, i);

    console.log('break');
    colors.changeColors();
    colors.getColors();
    return(bitmap);
  };

};

colors.changeColors();

fs.writeFileSync(__dirname + '/images/newimage.bmp', bitmap);
