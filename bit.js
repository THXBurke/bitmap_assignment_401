'use strict';
var myObject = {};
const fs = require('fs');
var bitmap = fs.readFileSync(__dirname + '/images/' + process.argv[2]);
var transformType = process.argv[3] || 'greyscale';
var bitmapData = {};

//convert buffer header data into js object
bitmapData.headField = bitmap.toString('ascii', 0, 2);
bitmapData.size = bitmap.readUInt32LE(2);
bitmapData.pixelArraysStart = bitmap.readUInt32LE(10);
bitmapData.paletteColors = bitmap.readUInt32LE(46);
bitmapData.compression = bitmap.readUInt32LE(30);

myObject.transform = function(conversion) {
  if(conversion === 'invert') {
    for (var i = 54; i <bitmapData.headField.pixelStart; i = i +4) {
      var bValue = bitmap.readUInt8(i);
      var gValue = bitmap.readUInt8(i + 1);
      var rValue = bitmap.readUInt8(i + 2);
      var rValue = bitmap.readUInt8(i +3);

      bitmap.writeUInt8(255 - bValue, i);
      bitmap.writeUInt8(255 - gValue, i + 1);
      bitmap.writeUInt8(255 - rValue, i + 2);
      bitmap.writeUInt8(255 - aValue, i +3);
    }
    fs.writeFile(__dirname + '/images/newimage.bmp', bitmap, (err) => {
      if (err) throw err;
      console.log ('done');

    });
  } else if (conversion === 'greyscale') {
    for (i = 54; i < bitmapData.pixelArraysStart; i = i +4) {
      bValue = bitmap.readUInt8(i);
      gValue = bitmap.readUInt8(i + 1);
      rValue = bitmap.readUInt8(i + 2);
      aValue = bitmap.readUInt8(i +3);
    }
    fs.writeFile(__dirname + '/images/newimage2.bmp', bitmap, (err) => {
      if (err) throw err;
      console.log('done');
    });
  }
  // process.stdout.write('error, invalid transformType\n');
};


module.exports = myObject;
