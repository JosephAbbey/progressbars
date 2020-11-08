# progressbars

Open source progress bar library made with p5.js.

## Usage:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script>
<script src="https://josephabbey.github.io/progressbars/V2/progressbars.min.js"></script>
```

## Examples:

```
var bar1 = new progressBar({
	where: 'canvas1',
	size: '',
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
	size: '',
	type: 'line',
	background: new color(255),
	color1: new color(240),
	color2: new color('#ff0000'),
	endval: 50,
	time: 500,
});
bar2.draw();
```
