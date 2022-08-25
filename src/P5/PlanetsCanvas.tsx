import React from 'react'
import Sketch from 'react-p5';
import p5Types from "p5"; //Import this for typechecking and intellisense
import Planet from "./Planet"; //Import this for typechecking and intellisense
import { PlanetInfo } from './Planet';

let div : Element = document.getElementsByClassName("planets")[0];
console.log(div);

const canvas = { w: window.innerWidth, h: window.innerHeight };

function attractAll(planetoids: Planet[]) {

	planetoids.forEach(p => {

		planetoids.forEach(p1 => {
			if (p != p1) {
				p.attractTo(p1);
			}
		});
	});

}
function handleCollisions(planetoids: Planet[]) {

	planetoids.forEach(p => {

		planetoids.filter(p1 => p1 !== p).forEach(p1 => {
			if (p.isCollision(p1)) {
				planetoids.push(p.combine(p1));
				planetoids.splice(planetoids.indexOf(p), 1);
				planetoids.splice(planetoids.indexOf(p1), 1);
			}
		});
	});

}

function handleEdgeCollision(planetoids: Planet[]) {
	planetoids.forEach(p => {

		if (p.drawInfo.x > canvas.w || p.drawInfo.x <= 0 || p.drawInfo.y > canvas.h || p.drawInfo.y <= 0 ) {
			p.movement.direction.x *= -1;
			p.movement.direction.y *= -1;
		}

	});

}

export default function PlanetsCanvas() {

	var sun = new Planet({ planet: { r: 20, m: 333054 }, draw: { x: canvas.w / 2, y: canvas.h / 2, color: "yellow" }, movement: { a: 0, v: 0, direction: { x: 0, y: 0 } } });
	var mercury = new Planet({ planet: { r: 5, m: 0.0553 }, draw: { x: 600, y: 200, color: "gray" }, movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } } });
	var venus = new Planet({ planet: { r: 5, m: 0.815 }, draw: { x: 0, y: 700, color: "orange" }, movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } } });
	var earth = new Planet({ planet: { r: 10, m: 1 }, draw: { x: 800, y: 200, color: "#71b780" }, movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } } });
	var mars = new Planet({ planet: { r: 10, m: 0.107 }, draw: { x: 0, y: 0, color: "red" }, movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } } });

	let planets = [earth];
	//let planets = [mercury, venus, earth, mars];

	const setup = (p5: any, canvasParentRef: Element) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(canvas.w, canvas.h).parent(canvasParentRef);
	};

	const draw = (p5: any) => {
		p5.background("#282c34");

		attractAll(planets)
		planets.forEach(p => p.attractTo(sun));

		handleCollisions(planets)
		//handleEdgeCollision(planets);

		sun.draw(p5);
		planets.forEach(p => p.draw(p5));
	};
	const add = (p5: any) => {
		console.log(p5);
		if (!(p5.mouseX > 0 && p5.mouseY > 0)) return;

		planets.push(
			new Planet({ planet: { r: 10, m: 0.107 }, draw: { x: p5.mouseX, y: p5.mouseY, color: "white" }, movement: { a: 0, v: 0.001, direction: { x: 0, y: 0 } } })
		);
	}

	return (
		<div>
			<Sketch setup={setup} draw={draw} mouseClicked={add} />
		</div>
	)
}
