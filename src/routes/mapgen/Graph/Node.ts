import type p5 from 'p5';
import { removeItemFromArray } from '../../../lib/Util';
export type NodeProps = {
	name: string;
	x: number;
	y: number;
	color: string;
	neighbours: Node[]
};
export default class Node {
	props: NodeProps;
	/**
	 *
	 */
	constructor(props: NodeProps) {
		this.props = props;
	}

	draw(p5: p5): void {
		let textSize = 16;
		let circleSize = 20;
		p5.push();
		p5.fill(this.props.color);
		p5.stroke(this.props.color);
		p5.textSize(textSize);
		p5.text(this.props.name, this.props.x + textSize, this.props.y - textSize);

		p5.circle(this.props.x, this.props.y, circleSize);
		p5.fill("white");
		p5.circle(this.props.x, this.props.y, circleSize*0.8);
		p5.pop();
	}
	addNeighbour(other: Node) {
		if (this.props.neighbours.includes(other)) return;
		this.props.neighbours.push(other);
		other.addNeighbour(this);
	}
	removeNeighbour(other: Node) {
		if (!this.props.neighbours.includes(other)) return;
		removeItemFromArray(this.props.neighbours, other)
		other.removeNeighbour(this);
	}
	lineTo(p5: p5, other: Node): void {
		p5.push();
		p5.stroke(this.props.color);
		p5.line(this.props.x, this.props.y, other.props.x, other.props.y);
		p5.pop();
	}
}
