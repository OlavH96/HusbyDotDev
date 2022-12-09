import type { MapGenParam } from '../../lib/stores';
import Node from './Graph/Node';
export function renderNodes(params: MapGenParam[]) {
	let y = 100;
	let nodes: Node[][] = [];
	params.forEach((param) => {
		let rowNodes = param.nodes.map(
			(n, i) => new Node({ x: 100 * (i + 1), y: y, name: n.name, color: param.color, neighbours: [] })
		);
		rowNodes.reduce((p, c) => { p.addNeighbour(c); return c; })
		//rowNodes.reduce((p, c) => {
		//p.lineTo(p5, c);
		//return c;
		//});
		nodes.push(rowNodes);
		y += 100;
	});
	return nodes;

}