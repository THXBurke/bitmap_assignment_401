'use strict';

const fs = require('fs');
let bitmap = fs.readFileSync(__dirname + '/../img/' + process.argv[2]);
let transformType = process.argv[3] || 'greyscale';
let bitmapData = {};

//convert buffer header data into js object
bitmapData.headField = bitmap.toString('ascii', 0, 2);
bitmapData.size = bitmap.readUInt32LE(2);
bitmapData.pixelArraysStart = bitmap.readUInt32LE(10);
bitmapData.paletteColors = bitmap.readUInt32LE(46);
bitmapData.compression = bitmap.readUInt32LE(30);

const transform = function(conversion) {
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
    fs.writeFile('img/newimage.js' + transformType + '.bmp', bmp, (err) =>
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
    fs.writeFile('img/newimage_' + transformType + '.bitmap', bmp, (err) => {
      if (err) throw err;
      console.log('done');
    });
  }
  process.stdout.write('error, invalid transformType\n');
};

transform(transformType);


//what I had before our group meeting...


// console.dir(bitmapData.toString('hex'));
// console.log(bitmap.readUInt32LE(2));
// bitmapData.width = (bitmap.readUInt32LE(22));
// console.log(bitmapData);
//
// var colors = {};
// colors.getColors = function () {
//
//   for (var i = 54; i<64; i++) {
//     console.log('colors: ' + bitmap[i]);
//   };
// };
// colors.changeColors = function() {
//   var x = bitmap[58];
//   for (var i=55; i<1078; i = 1+2) {
//     bitmap[i] = x;
//   };
//
//   return bitmap;
// };
//
// colors.getColors();
//
// colors.changeColors = function() {
//
//   for(var i = 55; i<1078; i++) {
//     bitmap.writeUInt32LE(255, i);
//
//     console.log('break');
//     colors.changeColors();
//     colors.getColors();
//     return(bitmap);
//   };
//
// };
//
// colors.changeColors();
//
// fs.writeFileSync(__dirname + '/images/newimage.bmp', bitmap);
