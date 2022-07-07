import React from 'react'
import Sketch from 'react-p5';
import p5Types from "p5"; //Import this for typechecking and intellisense
import Planet from "./Planet"; //Import this for typechecking and intellisense
import { PlanetInfo } from './Planet';

const canvas = { w: 1000, h: 1000 };

function attractAll(planetoids: Planet[]) {
	
	planetoids.forEach(p => { 
		
		planetoids.forEach(p1 => { 
			if (p != p1) {
				p.attractTo(p1);
			}
		});
	});

}

export default function PlanetsCanvas() {

	var sun = new Planet({ planet: { r: 20, m: 333054 }, draw: { x: canvas.w / 2, y: canvas.h / 2, color: "yellow" }, movement: { a: 0, v: 0, direction: { x: 0, y: 0 } } });
	var mercury = new Planet({ planet: {r: 5, m: 0.0553}, draw: { x: 600, y: 200, color: "gray" }, movement:{ a: 0, v: 0.01, direction: { x: 10, y: 10 } }});
	var venus = new Planet({ planet: {r: 5, m: 0.815}, draw: { x: 0, y: 700, color: "orange" }, movement:{ a: 0, v: 0.01, direction: { x: 10, y: 10 } }});
	var earth = new Planet({ planet: {r: 10, m: 1}, draw: { x: 800, y: 200, color: "#71b780" }, movement:{ a: 0, v: 0.01, direction: { x: 10, y: 10 } }});

	const setup = (p5: any, canvasParentRef: Element) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(canvas.w, canvas.h).parent(canvasParentRef);
	};

	const draw = (p5: any) => {
		p5.background("#282c34");
		
		earth.attractTo(sun);
		mercury.attractTo(sun);
		venus.attractTo(sun);
		attractAll([mercury, venus, earth])
		//earth.attractTo(sun);
		//earth.attractTo(mercury);
		//earth.attractTo(venus);

		//mercury.attractTo(sun);
		//mercury.attractTo(earth);
		//mercury.attractTo(venus);

		//venus.attractTo(sun);
		//venus.attractTo(earth);
		//venus.attractTo(mercury);

		sun.draw(p5);
		earth.draw(p5);
		mercury.draw(p5);
		venus.draw(p5);
	};

	return (
		<Sketch setup={setup} draw={draw} />
	)
}
