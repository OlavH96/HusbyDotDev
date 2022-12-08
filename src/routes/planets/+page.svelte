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
				p.movement.direction.x *= -1;
				p.movement.direction.y *= -1;
			}
		});
	}

	var sun = new Planet({
		planet: { r: 20, m: 333054 },
		draw: { x: canvas.w / 2, y: canvas.h / 2, color: 'yellow' },
		movement: { a: 0, v: 0, direction: { x: 0, y: 0 } }
	});
	var mercury = new Planet({
		planet: { r: 5, m: 0.0553 },
		draw: { x: 600, y: 200, color: 'gray' },
		movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } }
	});
	var venus = new Planet({
		planet: { r: 5, m: 0.815 },
		draw: { x: 0, y: 700, color: 'orange' },
		movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } }
	});
	var earth = new Planet({
		planet: { r: 10, m: 1 },
		draw: { x: sun.drawInfo.x - 100, y: sun.drawInfo.y - 100, color: '#71b780' },
		movement: { a: 0, v: 0.01, direction: { x: -200, y: 0 } }
	});
	var mars = new Planet({
		planet: { r: 10, m: 0.107 },
		draw: { x: 0, y: 0, color: 'red' },
		movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } }
	});

	let planets = [earth];
	//let planets = [mercury, venus, earth, mars];
	let stars: Star[] = [];

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

		handleCollisions(planets);
		//handleEdgeCollision(planets);

		drawStars(stars, p5);
		sun.draw(p5);
		planets.forEach((p) => p.draw(p5));
	};

	const add = (e: any, p5: p5) => {
		if (!(p5.mouseX > 0 && p5.mouseY > 0)) return;

		let color = $planetParams.planetColor;
		if (color == 'random') {
			let possibleColors = ['white', 'red', 'yellow', 'blue', 'green'];
			color = possibleColors[Math.floor(Math.random() * possibleColors.length)];
		}

		planets.push(
			new Planet({
				planet: { r: $planetParams.planetSize, m: $planetParams.planetMass },
				draw: { x: p5.mouseX, y: p5.mouseY, color: color },
				movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } }
			})
		);
	};
</script>

<P5
	sketch={(p5) => {
		p5.draw = () => draw(p5);
		p5.setup = () => setup(p5);
		p5.mouseClicked = (e) => add(e, p5);
	}}
/>

<Settings />

<style>
</style>
