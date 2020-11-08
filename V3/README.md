# progressbars

Open source progress bar library migrated to not use p5.js.

## Usage:

```
<script src="https://josephabbey.github.io/progressbars/V3/progressbars.min.js"></script>
```

## Examples:

```
var bar1 = new progressBar({
  where: 'canvas1',
  type: 'circle',
  background: new color(255),
  color1: new color('#ff0000'),
  color2: new color(00, 00, 255),
  endval: 80,
  time: 800,
});
bar1.draw();
var bar2 = new progressBar({
  where: 'canvas2',
  type: 'line',
  background: new color(255),
  color1: new color('#ff00ff'),
  color2: new color('#ff0000'),
  endval: 50,
  time: 500,
});
bar2.draw();
```
