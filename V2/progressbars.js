class color {
	constructor(r, g, b) {
		if ((r || r == 0) && (g || g == 0) && (b || b == 0)) {
			this.r = parseInt(r);
			this.g = parseInt(g);
			this.b = parseInt(b);
		} else if (
			(r || r == 0) &&
			typeof r == 'string' &&
			r.charAt(0) == '#'
		) {
			this.r = parseInt(r.charAt(1) + r.charAt(2), 16);
			this.g = parseInt(r.charAt(3) + r.charAt(4), 16);
			this.b = parseInt(r.charAt(5) + r.charAt(6), 16);
		} else if (r || r == 0) {
			this.r = parseInt(r);
			this.g = parseInt(r);
			this.b = parseInt(r);
		} else {
			console.error('Invalid color constructors.');
		}
		this.canvas;
	}
}

class progressBar {
	constructor(input) {
		if (input == null) {
			console.error('Your progress bar input is null.');
		} else if (input == undefined) {
			console.error('Your progress bar input is undefined.');
		} else if (typeof input == 'string') {
			console.error('Your progress bar input is a string not an object.');
		} else if (typeof input == 'array') {
			console.error('Your progress bar input is an array not an object.');
		} else if (typeof input == 'object') {
			this.where = input.where;
			this.size = input.size;
			this.type = input.type;
			this.bg = input.background;
			this.c1 = input.color1;
			this.c2 = input.color2;
			this.endval = input.endval;
			if (input.time) {
				this.time = input.time;
			} else {
				this.time = input.endval * 3;
			}
		} else {
			console.error('Your progress bar input cannot be read.');
		}
	}

	draw() {
		function lerpColor(c1, c2, amt) {
			return new color(
				map(amt, 0, 1, c1.r, c2.r),
				map(amt, 0, 1, c1.g, c2.g),
				map(amt, 0, 1, c1.b, c2.b)
			);
		}

		function map(X, A, B, C, D) {
			var Y = ((X - A) / (B - A)) * (D - C) + C;
			return Y;
		}

		function sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		if (this.size == '') {
			this.size = document.getElementById(this.where).offsetWidth;
		}
		var input = this;
		const Bar = (canvas) => {
			canvas.setup = async function () {
				if (input.type == 'circle') {
					canvas.createCanvas(input.size, input.size);
					input.size = (3 / 4) * input.size;
					canvas.translate(canvas.width / 2, canvas.height / 2);
					for (var i = 0; i < input.endval + 1; i++) {
						canvas.background(input.bg.r, input.bg.g, input.bg.b);
						canvas.noFill();
						canvas.stroke(0, 20);
						canvas.strokeWeight(5);
						canvas.ellipse(0, 0, input.size);
						canvas.strokeWeight(10);
						var c = lerpColor(input.c1, input.c2, i / 100);
						canvas.stroke(c.r, c.g, c.b);
						canvas.angleMode(p5.DEGREES);
						canvas.arc(
							0,
							0,
							input.size,
							input.size,
							-90 / 55,
							map(i, 0, 100, -90, 270) / 55
						);
						canvas.textAlign(p5.CENTER);
						canvas.textSize(input.size / 7);
						canvas.noStroke();
						canvas.fill(0);
						canvas.text(i + '%', 0, 0);
						await sleep(input.time / input.endval);
					}
				} else if (input.type == 'line') {
					canvas.createCanvas((25 / 32) * input.size, 12);
					input.size = (3 / 4) * input.size;
					canvas.translate(canvas.width / 2, canvas.height / 2);
					for (var j = 0; j < input.endval + 1; j++) {
						canvas.background(input.bg.r, input.bg.g, input.bg.b);
						canvas.noFill();
						canvas.stroke(0, 20);
						canvas.strokeWeight(5);
						canvas.line(
							0 - input.size / 2,
							0,
							0 + input.size / 2,
							0
						);
						canvas.strokeWeight(10);
						var c = lerpColor(input.c1, input.c2, i / 100);
						canvas.stroke(c.r, c.g, c.b);
						canvas.line(
							0 - input.size / 2,
							0,
							j * (input.size / 100) - input.size / 2,
							0
						);
						await sleep(input.time / input.endval);
					}
				}
			};
		};
		this.canvas = new p5(Bar, this.where);
	}

	update(newval) {
		function lerpColor(c1, c2, amt) {
			return new color(
				map(amt, 0, 1, c1.r, c2.r),
				map(amt, 0, 1, c1.g, c2.g),
				map(amt, 0, 1, c1.b, c2.b)
			);
		}

		function map(X, A, B, C, D) {
			var Y = ((X - A) / (B - A)) * (D - C) + C;
			return Y;
		}

		function sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		if (this.size == '') {
			this.size = document.getElementById(this.where).offsetWidth;
		}
		var input = this;
		const Bar = (canvas) => {
			canvas.setup = async function () {
				if (input.type == 'circle') {
					input.size = (3 / 4) * input.size;
					canvas.translate(canvas.width / 2, canvas.height / 2);
					for (var i = input.endval; i < newval + 1; i++) {
						canvas.background(input.bg.r, input.bg.g, input.bg.b);
						canvas.noFill();
						canvas.stroke(0, 20);
						canvas.strokeWeight(5);
						canvas.ellipse(0, 0, input.size);
						canvas.strokeWeight(10);
						var c = lerpColor(input.c1, input.c2, i / 100);
						canvas.stroke(c.r, c.g, c.b);
						canvas.angleMode(p5.DEGREES);
						canvas.arc(
							0,
							0,
							input.size,
							input.size,
							-90 / 55,
							map(i, 0, 100, -90, 270) / 55
						);
						canvas.textAlign(p5.CENTER);
						canvas.textSize(input.size / 7);
						canvas.noStroke();
						canvas.fill(0);
						canvas.text(i + '%', 0, 0);
						await sleep(input.time / input.endval);
					}
				} else if (input.type == 'line') {
					canvas.createCanvas((25 / 32) * input.size, 12);
					input.size = (3 / 4) * input.size;
					canvas.translate(canvas.width / 2, canvas.height / 2);
					for (var j = input.endval; j < newval + 1; i++) {
						canvas.background(input.bg.r, input.bg.g, input.bg.b);
						canvas.noFill();
						canvas.stroke(0, 20);
						canvas.strokeWeight(5);
						canvas.line(
							0 - input.size / 2,
							0,
							0 + input.size / 2,
							0
						);
						canvas.strokeWeight(10);
						var c = lerpColor(input.c1, input.c2, i / 100);
						canvas.stroke(c.r, c.g, c.b);
						canvas.line(
							0 - input.size / 2,
							0,
							j * (input.size / 100) - input.size / 2,
							0
						);
						await sleep(input.time / input.endval);
					}
				}
			};
		};
		this.canvas = new p5(Bar, this.where);
		this.endval = newval;
	}
}
