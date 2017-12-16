# render-bmfont

Renders an [AngelCode BMFont](http://www.angelcode.com/products/bmfont/) text to canvas.

```js
import * as bmpfont from 'bmpfont.js'

var canvas = document.createElement('canvas');
var context = canvas.getContext("2d");

context.drawBitmapText('fonts/arial-32', 'Hello World!', 10, 20, 200, 30);
```

Currently supported BMFont formats:

- ASCII (text)
- JSON
- XML
- binary

## See Also

See [text-modules](https://github.com/mattdesl/text-modules) for related modules.
