let cnv = document.getElementById("cnv");
let ctx = cnv.getContext("2d");
let w = cnv.width;
let h = cnv.height;

ctx.strokeStyle = "#00A";
ctx.lineWidth = 5;
let frame = 0;

let speed = 1.0 / 1;
let quant = 2;
let qW = w / quant;

let lines = [];
for (let i = 0; i < qW; i++) {
	lines.push({a: 0, f: Math.sin(i / qW * Math.PI * 3) * 1});
}

// lines[h / 2].a = 100;

let interval = setInterval(update, 1);

function update() {
	// if(frame < 105) lines[0].a = Math.sin(frame * 0.03) * 300;
    lines[0].a = 0;
    lines[0].f = 0;
    lines[qW - 1].a = 0;
    lines[qW - 1].f = 0;
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.moveTo(0, -lines[0].a + h / 2);
    for (let i = 0; i < qW; i++) {
		ctx.lineTo(i * quant, -lines[i].a + h / 2);
		lines[i].a += lines[i].f;
        // lines[i].a *= 0.99;
    }
    ctx.stroke();
    for (let i = 0; i < qW; i++) {
    	let i0 = i - 1;
    	let i1 = i + 1;
    	let div = 0;
    	let force = 0;
    	if(i0 !== -1) {
    		force += lines[i0].a;
    		div++;
    	}
    	if(i1 !== qW) {
    		force += lines[i1].a;
    		div++;
    	}
    	lines[i].f += (force / div - lines[i].a) * speed;
    }
    frame++;
}