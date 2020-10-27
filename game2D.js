let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
let w = cnv.width = window.innerWidth;
let h = cnv.height = window.innerHeight;
let img = ctx.createImageData(w, h);
let data = img.data;

let frame = 0;

let speed = 1.0 / 1;

let amp = [];
let vel = [];

for (let i = 0; i < w; i++) {
	amp.push([]);
	vel.push([]);
	for (let j = 0; j < h; j++) {
		amp[i][j] = Math.random();
		vel[i][j] = 0;
	}
}

// amp[w / 2][h / 2] = 10;

let interval = setInterval(update, 1);

function update() {
	if(frame < 300) {
		for (let i = 0; i < w; i++) {
			// amp[i][h - 1] = Math.sin(frame * 0.25) * 2;
		}
	}
	ctx.clearRect(0, 0, w, h);
	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			amp[i][j] += vel[i][j];
			let dataIndex = (i + j * w) * 4;
			let color = Math.max(0, Math.min(amp[i][j], 1)) * 255;
			let red = color;
			let green = color;
			let blue = color;
			data[dataIndex] = red;
            data[dataIndex + 1] = green;
            data[dataIndex + 2] = blue;
            data[dataIndex + 3] = 255;
		}
	}
	for (let i = 0; i < w; i++) {
		for (let j = 0; j < h; j++) {
			let i0 = i - 1;
			let i1 = i + 1;
			let j0 = j - 1;
			let j1 = j + 1;
			let div = 0;
			let force = 0;
			if(i0 !== -1) {
				force += amp[i0][j];
				div++;
			}
			if(i1 !== w) {
				force += amp[i1][j];
				div++;
			}
			if(j0 !== -1) {
				force += amp[i][j0];
				div++;
			}
			if(j1 !== h) {
				force += amp[i][j1];
				div++;
			}
			vel[i][j] += (force / div - amp[i][j]) * speed;
		}
	}
	ctx.putImageData(img, 0, 0);
	frame++;
}