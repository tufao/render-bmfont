import * as bmpfont from './bmpfont.js'

var canvas = document.createElement('canvas');
var context = canvas.getContext("2d");
document.body.appendChild(canvas);

var tf = bmpfont.getDefaultTextFormat();
tf.letterSpacing = 4;
tf.color = 'green';

context.drawBitmapText('fonts/arial-32', 'Hello World!', 0, 20, 500, 500, tf);
