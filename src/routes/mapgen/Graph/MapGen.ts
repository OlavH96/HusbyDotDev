import { ForEach2DOnSelf, removeItemFromArray } from "$lib/Util";
import type { p5 } from "p5-svelte";
import type Node from "./Node";
import { Splice2D } from '../../../lib/Util';

export enum Direction {
	N = "N",
	E = "E",
	W = "W",
	S = "S",
}

export function createNode(){}

export function lineToSameNames(nodes: Node[][], p5: p5) {

	let nodes1d = nodes.reduce((r1, r2) => [...r1, ...r2]);

	nodes1d.forEach((n) => {
		nodes1d.forEach((n1) => {
			if (n.props.name === n1.props.name)
				n.lineTo(p5, n1);
		});
	});
}

export function sameNameNeighbours(p5: p5, nodes: Node[][]) {

	let nodes1d = nodes.reduce((r1, r2) => [...r1, ...r2]);

	ForEach2DOnSelf(nodes1d, (n, n1) => { 
		if (n.props.name === n1.props.name) {
			n.addNeighbour(n1)
		}
	});

}

export function combineSameNames(nodes: Node[][], p5: p5) {
	let nodes1d = nodes.reduce((r1, r2) => [...r1, ...r2]);

	type duplicate = { name: string;  array: Node[]};
	let duplicates : duplicate[] = []; // name | array

	ForEach2DOnSelf(nodes1d, (n, n1) => { 

		if (n.props.name === n1.props.name && n !== n1) {

			let d = duplicates.find(i => i.name === n1.props.name)
			if (!d) {
				let dupe = { name: n1.props.name, array: [n,n1] };
				duplicates.push(dupe);
			}
			else {
				if(!d.array.includes(n)) d.array.push(n)
				if(!d.array.includes(n1)) d.array.push(n1)
			}
		}
	});

	if (duplicates.length !== 0) {
		console.log("DUPLICATES", duplicates);
		duplicates.forEach(d => {
			console.log("NAME",d.name);
			console.log(d.array.map(d => d.props.name + "-"+d.props.y/100));
			
			
		})
	}
	

	duplicates.forEach(d => {

		let avgX = d.array.map(n => n.props.x).reduce((x1, x2) => (x1 + x2) / 2);
		let avgY = d.array.map(n => n.props.y).reduce((y1, y2) => (y1 + y2) / 2);

		let survivingNode = d.array[0];
		survivingNode.props.x = avgX;
		survivingNode.props.y = avgY;
		//survivingNode.props.neighbours.forEach(n => survivingNode.removeNeighbour(n));
		let deleted = d.array.splice(1);
		console.log("deleted", deleted.map(d => d.props.name+"-"+d.props.y/100));

		let newNeighbors = deleted
			.map(d => d.props.neighbours)
			.reduce((p, c) => [...p, ...c])

		newNeighbors.forEach(n => survivingNode.addNeighbour(n));
		
		deleted.forEach(toDelete => {
			// Cant use foreach as deleting elements in said foreach while youre iterating it causes not all elements to be traversed
			while (toDelete.props.neighbours.length > 0) {
				let n = toDelete.props.neighbours[0];
				n.removeNeighbour(toDelete)
			}
			Splice2D(nodes, toDelete)
		});
		
	});
}

