<script lang="ts">
	import type p5 from 'p5';
	import P5 from 'p5-svelte';
	import { planetParams } from '$lib/stores';
	import Planet from './P5/Planet';
	import Star from './P5/Star';
	import Settings from './Settings.svelte';
	const canvas = { w: window.innerWidth, h: window.innerHeight };

	function attractAll(planetoids: Planet[]) {
		planetoids.forEach((p) => {
			planetoids.forEach((p1) => {
				if (p != p1) {
					p.attractTo(p1);
				}
			});
		});
	}

	function updatePositions(planetoids: Planet[]) {
		planetoids.forEach((p) => p.updatePosition());
	}

	function drawStars(stars: Star[], p5: p5) {
		stars.forEach((star) => star.draw(p5));
		stars.forEach((star) => star.move(1, 0));
	}
	function removePlanet(planetoids: Planet[], ...planets: Planet[]) {
		planets.forEach((p) => {
			planetoids.splice(planetoids.indexOf(p), 1);
		});
	}

	function handleCollisions(planetoids: Planet[]) {
		planetoids.forEach((p) => {
			planetoids
				.filter((p1) => p1 !== p)
				.forEach((p1) => {
					if (p.isCollision(p1)) {
						if (p.planetInfo.r <= 2) removePlanet(planetoids, p);
						if (p1.planetInfo.r <= 2) removePlanet(planetoids, p1);

						//	let angle = p.angle(p1)

						//if (angle < Math.PI / 2) {
						//// Splinter if sharp angle
						//let numSplinters = 3;
						//let combined = p.combine(p1);
						//combined.planetInfo.r /= numSplinters;
						//combined.planetInfo.m /= numSplinters;
						//for (let num = 0; num <= numSplinters; num++) {
						//let newPlanet = combined;
						//newPlanet.drawInfo.x += newPlanet.planetInfo.r*num;
						//newPlanet.drawInfo.y += newPlanet.planetInfo.r*num;
						//planetoids.push(newPlanet);
						//}

						//removePlanet(planetoids, p,	p1)

						//}
						//else {
						planetoids.push(p.combine(p1));
						removePlanet(planetoids, p, p1);
						//}
					}
				});
		});
	}

	function handleEdgeCollision(planetoids: Planet[]) {
		planetoids.forEach((p) => {
			if (
				p.drawInfo.x > canvas.w ||
				p.drawInfo.x <= 0 ||
				p.drawInfo.y > canvas.h ||
				p.drawInfo.y <= 0
			) {
				p.movement.v.x *= -1;
				p.movement.v.y *= -1;
			}
		});
	}

	var sun = new Planet({
		planet: { r: 20, m: 50000 },
		draw: { x: canvas.w / 2, y: canvas.h / 2, color: 'yellow' },
		movement: { v: { x: 0, y: 0 } }
	});
	var mercury = new Planet({
		planet: { r: 5, m: 0.0553 },
		draw: { x: 600, y: 200, color: 'gray' },
		movement: { v: { x: 0, y: 0.001 } }
	});
	var venus = new Planet({
		planet: { r: 5, m: 0.815 },
		draw: { x: 0, y: 700, color: 'orange' },
		movement: { v: { x: 0.001, y: 0 } }
	});
	var earth = new Planet({
		planet: { r: 10, m: 1000 },
		draw: { x: sun.drawInfo.x - 100, y: sun.drawInfo.y - 100, color: '#71b780' },
		movement: { v: { x: 0, y: 0.01 } }
	});
	var mars = new Planet({
		planet: { r: 10, m: 0.107 },
		draw: { x: 0, y: 0, color: 'red' },
		movement: { v: { x: 0, y: 0.001 } }
	});

	let planets = [earth];
	//let planets = [mercury, venus, earth, mars];
	let stars: Star[] = [];

	// Drag state for setting initial velocity
	let dragStart: { x: number; y: number } | null = null;
	let isDragging = false;

	const setup = (p5: any) => {
		stars = setupStars(canvas.w, canvas.h);
		p5.createCanvas(canvas.w, canvas.h);
	};

	const setupStars = (maxX: number, maxY: number) => {
		let stars: Star[] = [];
		let size = 4;
		let density = 0.00005;
		let numLayers = 3;
		for (let layer = 0; layer <= numLayers; layer++) {
			for (let x = 0; x < maxX; x++) {
				for (let y = 0; y < maxY; y++) {
					if (Math.random() < density) {
						let star = new Star(x, y, maxX, maxY, 0.5 / layer, size / layer);
						stars.push(star);
					}
				}
			}
		}
		return stars;
	};

	const draw = (p5: p5) => {
		//console.log(this.props.options.planetSize);

		p5.background('black');

		attractAll(planets);
		planets.forEach((p) => p.attractTo(sun));

		updatePositions(planets);

		handleCollisions(planets);
		//handleEdgeCollision(planets);

		drawStars(stars, p5);
		sun.draw(p5);
		planets.forEach((p) => p.draw(p5));

		// Draw velocity arrow and planet preview during drag
		if (isDragging && dragStart) {
			// Draw planet preview at drag start position
			let color = $planetParams.planetColor;
			if (color == 'random') {
				color = 'white'; // Use white for preview when random
			}
			p5.fill(color);
			p5.circle(dragStart.x, dragStart.y, 2 * $planetParams.planetSize);
			
			// Draw velocity arrow
			p5.stroke('white');
			p5.strokeWeight(2);
			p5.line(dragStart.x, dragStart.y, p5.mouseX, p5.mouseY);
			// Draw arrowhead
			let angle = Math.atan2(p5.mouseY - dragStart.y, p5.mouseX - dragStart.x);
			let arrowSize = 10;
			p5.fill('white');
			p5.noStroke();
			p5.push();
			p5.translate(p5.mouseX, p5.mouseY);
			p5.rotate(angle);
			p5.triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
			p5.pop();
		}
	};

	const add = (e: any, p5: p5) => {
		if (!(p5.mouseX > 0 && p5.mouseY > 0) || !dragStart) return;

		let color = $planetParams.planetColor;
		if (color == 'random') {
			let possibleColors = ['white', 'red', 'yellow', 'blue', 'green'];
			color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
		}

		// Calculate velocity from drag distance and direction
		let velocityScale = 0.05; // Adjust this to control sensitivity
		let vx = (p5.mouseX - dragStart.x) * velocityScale;
		let vy = (p5.mouseY - dragStart.y) * velocityScale;

		planets.push(
			new Planet({
				planet: { r: $planetParams.planetSize, m: $planetParams.planetMass },
				draw: { x: dragStart.x, y: dragStart.y, color: color },
				movement: { v: { x: vx, y: vy } }
			})
		);

		// Reset drag state
		dragStart = null;
		isDragging = false;
	};

	const onMousePressed = (p5: p5) => {
		if (p5.mouseX > 0 && p5.mouseY > 0) {
			dragStart = { x: p5.mouseX, y: p5.mouseY };
			isDragging = true;
		}
	};

	const onMouseReleased = (e: any, p5: p5) => {
		if (isDragging) {
			add(e, p5);
		}
	};
</script>

<P5
	sketch={(p5) => {
		p5.draw = () => draw(p5);
		p5.setup = () => setup(p5);
		p5.mousePressed = () => onMousePressed(p5);
		p5.mouseReleased = (e) => onMouseReleased(e, p5);
	}}
/>

<Settings />

<style>
</style>
