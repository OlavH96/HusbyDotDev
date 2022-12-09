<script lang="ts">
	import { mapgenParams } from '$lib/stores';
	import { ForEach2D } from '$lib/Util';
	import type { p5 } from 'p5-svelte';
	import P5 from 'p5-svelte/P5.svelte';
	import { combineSameNames, lineToSameNames, sameNameNeighbours } from './Graph/MapGen';
	import Node from './Graph/Node';
	import { renderNodes } from './Renderer';
	import Settings from './Settings.svelte';

	const canvas = { w: window.innerWidth, h: window.innerHeight };

	const sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(canvas.w, canvas.h);
		};
		p5.draw = () => {
			p5.background('white');

			let nodes = renderNodes($mapgenParams);
			sameNameNeighbours(p5, nodes);
			combineSameNames(nodes, p5);
			//nodes.forEach((row) => {
				//row.reduce((p, c) => {
					//p.lineTo(p5, c);
					//return c;
				//})});
			
			ForEach2D(nodes, {itemAction: node => node.props.neighbours.forEach(n => node.lineTo(p5,n))})

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
