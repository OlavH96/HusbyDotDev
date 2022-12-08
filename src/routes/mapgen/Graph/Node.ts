import p5 from 'p5';
export type NodeProps = {
	name: string;
	x: number;
	y: number;
};
export default class Node {
	props: NodeProps;
	/**
	 *
	 */
	constructor(props: NodeProps) {
		this.props = props;
	}

	draw(p5: p5) : void {
		let textSize = 16;
		p5.fill("white")
		p5.stroke("white")
		p5.textSize(textSize)
		p5.text(
			this.props.name,
			this.props.x+textSize,
			this.props.y-textSize
		);

		p5.circle(this.props.x, this.props.y, 10);

	}
}