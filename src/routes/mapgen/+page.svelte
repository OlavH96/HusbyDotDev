<script lang="ts">
	import { mapgenParams } from '$lib/stores';
	import type { p5 } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import { combineSameNames, ForEach2D, lineToSameNames } from './Graph/MapGen';
	import Node from './Graph/Node';
	import Settings from './Settings.svelte';

	const canvas = { w: window.innerWidth, h: window.innerHeight };

	const sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(canvas.w, canvas.h);
		};
		p5.draw = () => {
			p5.background('white');

			let y = 100;
			let nodes: Node[][] = [];
			$mapgenParams.forEach((param) => {
				let rowNodes = param.nodes.map(
					(n, i) => new Node({ x: 100 * (i + 1), y: y, name: n.name, color: param.color })
				);
				//rowNodes.reduce((p, c) => {
					//p.lineTo(p5, c);
					//return c;
				//});
				nodes.push(rowNodes);
				y += 100;
			});

			combineSameNames(nodes, p5);
			nodes.forEach((row) => {
				row.reduce((p, c) => {
					p.lineTo(p5, c);
					return c;
				})});

			ForEach2D(nodes, { itemAction: node => node.draw(p5) });
			
			//lineToSameNames(nodes, p5);
		};
	};



</script>

<main>
	<Settings />
	<P5 {sketch} />
	/>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>
