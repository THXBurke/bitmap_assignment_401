const fs = require('fs');

var bitmap = fs.readFileSync(_dirname + '/palette-bitmap.bmp');

var bitmapData = {};

bitmapData.headField = bitmap.toString('ascii', 0, 2);

bitmapData.size = bitmap.readUInt32LE(10);

bitmapData.pixelArraysStart = bitmap.readUInt32LE(10);

bitmapData.paletteColors = bitmap.readUInt32LE(46);
bitmapData.height = bitmap.readUInt32E(18);
bitmapData.width = bitmap.readUInt32LE(22);

console.log('first color:' + bitmap[54]);
console.log('alpha' + bitmap[1]);
console.dir(bitmapData);

var colors = {};
///do I need to npm install colors or something?

colors.writeOverColors = function () {
  for (var i=54; i<1078; i++) {
    bitmap.writeUInt8(255, i);
    bitmap.writeUInt8(0, i+1);
    bitmap.writeUInt(0, i+2);
    bitmap.writeUInt8(0, i+3);
  }
  return bitmap;
};
console.log(bitmap);

fs.writeFileSync(__dirname + '/newimage.bmp', bitmap);
