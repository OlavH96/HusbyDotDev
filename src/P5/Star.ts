import p5 from 'p5';
export default class Star {

	x: number;
	y: number;
	size: number;
	color: string;
	maxX: number;
	maxY: number;
	speedScale: number;
	constructor(x: number, y: number, maxX: number, maxY: number, speedScale: number = 1, size: number = 5, color: string = "white")
	{
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.maxX = maxX;
		this.maxY = maxY;
		this.speedScale = speedScale;
	}
	
	draw(p5: p5) {
		if (this.x > this.maxX) this.x = 0;
		if (this.y > this.maxY) this.y = 0;
		p5.fill(this.color);
		star(p5, this.x, this.y, this.size, this.size/2, 5);
	}
	move(x: number, y: number) {
		this.x += x*this.speedScale;
		this.y += y*this.speedScale;
	}
}

// https://p5js.org/examples/form-star.html
function star(p5: p5, x: number, y: number, radius1:number, radius2:number, npoints:number) {
	let angle = 2*Math.PI / npoints;
	let halfAngle = angle / 2.0;
	p5.beginShape();
	for (let a = 0; a < 2*Math.PI; a += angle) {
	  let sx = x + Math.cos(a) * radius2;
	  let sy = y + Math.sin(a) * radius2;
	  p5.vertex(sx, sy);
	  sx = x + p5.cos(a + halfAngle) * radius1;
	  sy = y + p5.sin(a + halfAngle) * radius1;
	  p5.vertex(sx, sy);
	}
	p5.endShape("close");
  }