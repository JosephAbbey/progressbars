function drawBar(where, size, type, bg, c1, c2, endval) {
	if (size == '') {
		size = document.getElementById(where).offsetWidth;
	}
	const Bar = (canvas) => {
		canvas.setup = async function () {
			if (type == 'circle') {
				canvas.createCanvas(size, size);
				size = (3 / 4) * size;
				canvas.translate(canvas.width / 2, canvas.height / 2);
				for (var i = 0; i < endval + 1; i++) {
					canvas.background(bg);
					canvas.noFill();
					canvas.stroke(0, 20);
					canvas.strokeWeight(5);
					canvas.ellipse(0, 0, size);
					canvas.strokeWeight(10);
					canvas.stroke(lerpColor(c1, c2, map(i, 0, 100, 0, 1)));
					canvas.angleMode(DEGREES);
					canvas.arc(0, 0, size, size, -90, map(i, 0, 100, -90, 270));
					canvas.textAlign(CENTER, CENTER);
					canvas.textSize(size / 7);
					canvas.noStroke();
					canvas.fill(0);
					canvas.text(i + '%', 0, 0);
					await sleep(3);
				}
			} else if (type == 'line') {
				canvas.createCanvas((25 / 32) * size, 12);
				size = (3 / 4) * size;
				canvas.translate(canvas.width / 2, canvas.height / 2);
				for (var j = 0; j < endval + 1; j++) {
					canvas.background(bg);
					canvas.noFill();
					canvas.stroke(0, 20);
					canvas.strokeWeight(5);
					canvas.line(0 - size / 2, 0, 0 + size / 2, 0);
					canvas.strokeWeight(10);
					canvas.stroke(lerpColor(c1, c2, map(j, 0, 100, 0, 1)));
					canvas.line(
						0 - size / 2,
						0,
						map(j, 0, 100, 0, size) - size / 2,
						0
					);
					await sleep(3);
				}
			}
		};
	};
	new p5(Bar, where);
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
