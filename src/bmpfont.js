const createLayout = require('layout-bmfont-text')
const loadFont = require('load-bmfont')

function render(layout, context, image, offsetx, offsety, width, height, color) {
  if (!image || !image.width)
    return

  context.translate(offsetx, offsety + layout.height)

  //now draw glyphs
  layout.glyphs.forEach(glyph => {
    let bitmap = glyph.data
    let [ x, y ] = glyph.position

    //some characters like space/tab might be empty
    //FireFox will error out if we try clipping with 0x0 rects
    if (bitmap.width*bitmap.height === 0)
      return

    //draw the sprite from texture atlas
    context.save()
    
    context.globalCompositeOperation = ""
    context.drawImage(image, 
        bitmap.x, bitmap.y, 
        bitmap.width, bitmap.height,
        x + bitmap.xoffset, y + bitmap.yoffset, 
        bitmap.width, bitmap.height)

    if (color) {
      context.fillStyle = color; // 
      context.globalCompositeOperation = 'source-atop';
      context.fillRect(x + bitmap.xoffset, y + bitmap.yoffset, bitmap.width, bitmap.height)
    }
    
    context.restore()
  })
}

function createFont(textFormat){
  return new Promise(function(resolve, reject) {
       loadFont(textFormat.family + '.fnt', function(err, font) {

        if (err)
          reject(Error(err));
        
        textFormat.font = font;
        var layout = createLayout(textFormat);        
        resolve(layout);
      })
  
  })
}

export function getDefaultTextFormat() {
  var format = {
    family: 'fonts/arial-32',
    width: 500,
    height: 500,
    letterSpacing: 2,
    align: 'left',
    color: null
  };

  return format;
}

//
export function drawText(context, font, text, x, y, width, height, textFormat) {

  return new Promise(function(resolve, reject) {
    if (textFormat == null)
      textFormat = getDefaultTextFormat();

    textFormat.family = font;
    textFormat.text = text;
    textFormat.width = width;
    textFormat.height = height;
    
    createFont(textFormat).then(function(layout){
      
      //load font image
      var image = new Image();
      image.addEventListener('load', function() {
        render(layout, context, image, x, y, width, height, textFormat.color);
        resolve(layout);
      });
      image.crossOrigin = "default";
      image.src = font + '.png'; 

    }, function (error) {
      reject(Error(error));
    })
  })
}

CanvasRenderingContext2D.prototype.drawBitmapText = function(font, text, x, y, width, height, textFormat) {
  drawText(this, font, text, x, y, width, height, textFormat);
}
