import React from 'react'
import Sketch from 'react-p5';
import p5Types from "p5"; //Import this for typechecking and intellisense
import Planet from "./Planet"; //Import this for typechecking and intellisense
import { PlanetInfo } from './Planet';

const canvas = { w: 1000, h: 1000 };

export default function PlanetsCanvas() {

	var sun = new Planet({ planet: { r: 50, m: 100 }, draw: { x: canvas.w / 2, y: canvas.h / 2, color: "#FFFFFF" }, movement: { a: 0, v: 0, direction: { x: 0, y: 0 } } });
	let earthInfo = { r: 5, m: 1 } as PlanetInfo;
	var earth = new Planet({ planet: earthInfo, draw: { x: 800, y: 200, color: "#71b780" }, movement:{ a: 0, v: 0.5, direction: { x: 10, y: 10 } }});

	const setup = (p5: any, canvasParentRef: Element) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		p5.createCanvas(canvas.w, canvas.h).parent(canvasParentRef);
	};

	const draw = (p5: any) => {
		p5.background(0);

		earth.attractTo(sun);
		//sun.attractTo(earth);

		sun.draw(p5);
		earth.draw(p5);
	};

	return (
		<Sketch setup={setup} draw={draw} />
	)
}
