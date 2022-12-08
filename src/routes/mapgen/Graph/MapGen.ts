import type { p5 } from "p5-svelte";
import type Node from "./Node";

export function lineToSameNames(nodes: Node[][], p5: p5) {

	let nodes1d = nodes.reduce((r1, r2) => [...r1, ...r2]);

	nodes1d.forEach((n) => {
		nodes1d.forEach((n1) => {
			if (n.props.name === n1.props.name)
				n.lineTo(p5, n1);
		});
	});
}

export function combineSameNames(nodes: Node[][], p5: p5) {

	let nodes1d = nodes.reduce((r1, r2) => [...r1, ...r2]);

	nodes1d.forEach((n) => {
		nodes1d.forEach((n1) => {
			if (n.props.name === n1.props.name) {

				let avgX = (n.props.x + n1.props.x) / 2;
				let avgY = (n.props.y + n1.props.y) / 2;

				n.props.x = avgX;
				n.props.y = avgY;
				n1.props.x = avgX;
				n1.props.y = avgY;
			}
		});
	});
}

interface ForEach2DOptions<T> {
	rowAction?: (r: T[], index?: number) => void,
	itemAction?: (i: T, index?: number) => void
};
export function ForEach2D<T>(
	array2d: T[][],
	options: ForEach2DOptions<T> = {
		rowAction: r => { },
		itemAction: i => { }
	}){

	array2d.forEach((row, rowIndex) => { 
		if(options.rowAction) options.rowAction(row);
		row.forEach((i, itemIndex) => {
			if(options.itemAction) options.itemAction(i);
		})
	});
}