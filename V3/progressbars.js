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
			if (input.size) {
				this.size = input.size;
			} else {
				this.size = document.getElementById(this.where).offsetWidth;
			}
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

	async draw() {
		const canvas = document.createElement('canvas');
		canvas.width = this.size;
		const ctx = canvas.getContext('2d');
		if (this.type == 'circle') {
			canvas.height = this.size;
			this.size = (3 / 4) * this.size;
			document.getElementById(this.where).appendChild(canvas);
			for (var i = 0; i < this.endval + 1; i++) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = `rgb(
				${this.bg.r},
				${this.bg.g},
				${this.bg.b})`;
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				ctx.lineWidth = 5;
				ctx.strokeStyle = `rgba(
				${0},
				${0},
				${0},
				${0.2})`;
				ctx.lineCap = 'round';
				ctx.beginPath();
				ctx.arc(
					canvas.width / 2,
					canvas.height / 2,
					this.size / 2,
					-Math.PI / 2,
					(Math.PI / 2) * 3
				);
				ctx.stroke();

				ctx.lineWidth = 10;
				var c = lerpColor(this.c1, this.c2, i / 100);
				ctx.strokeStyle = `rgba(
				${c.r},
				${c.g},
				${c.b})`;
				ctx.beginPath();
				ctx.arc(
					canvas.width / 2,
					canvas.height / 2,
					this.size / 2,
					// -Math.PI / 2,
					-90 / 55,
					map(i, 0, 100, -90, 270) / 55
					// (Math.PI / 2) * 3
				);
				ctx.stroke();

				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.font = 'bold 48px sans-serif';
				ctx.fillStyle = '#000000';
				ctx.fillText(i + '%', canvas.width / 2, canvas.height / 2);

				await sleep(this.time / this.endval);
			}
		} else if (this.type == 'line') {
			canvas.height = 20;
			this.size = (3 / 4) * this.size;
			document.getElementById(this.where).appendChild(canvas);
			for (var j = 0; j < this.endval + 1; j++) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = `rgb(
				${this.bg.r},
				${this.bg.g},
				${this.bg.b})`;
				ctx.fillRect(0, 0, canvas.width, canvas.height);

				ctx.lineWidth = 5;
				ctx.strokeStyle = `rgba(
				${0},
				${0},
				${0},
				${0.2})`;
				ctx.lineCap = 'round';
				ctx.beginPath();
				ctx.moveTo(canvas.width / 2 - this.size / 2, canvas.height / 2);
				ctx.lineTo(canvas.width / 2 + this.size / 2, canvas.height / 2);
				ctx.stroke();

				ctx.lineWidth = 10;
				var c = lerpColor(this.c1, this.c2, j / 100);
				ctx.strokeStyle = `rgba(
				${c.r},
				${c.g},
				${c.b})`;
				ctx.beginPath();
				ctx.moveTo(canvas.width / 2 - this.size / 2, canvas.height / 2);
				ctx.lineTo(
					j * (this.size / 100) - this.size / 2 + canvas.width / 2,
					canvas.height / 2
				);
				ctx.stroke();

				await sleep(this.time / this.endval);
			}
		}
	}

	update(newval) {}
}

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
