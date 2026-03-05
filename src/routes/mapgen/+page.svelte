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

<main class="mapgen-page">
	<div class="settings-shell">
		<Settings />
	</div>
	<div class="canvas-shell">
		<P5 {sketch} />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: min(1100px, 100%);
		height: clamp(520px, 80vh, 860px);
		border-radius: 1.2rem;
		overflow: hidden;
		border: 1px solid rgba(195, 224, 229, 0.22);
		box-shadow: 0 20px 50px rgba(7, 30, 34, 0.35);
		background: rgba(7, 30, 34, 0.28);
	}

	.settings-shell {
		padding: 0.65rem;
		background: rgba(7, 30, 34, 0.38);
		border-bottom: 1px solid rgba(195, 224, 229, 0.2);
	}

	.canvas-shell {
		flex: 1;
		min-height: 0;
	}

	:global(.canvas-shell canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
	}

	@media screen and (max-width: 720px) {
		main {
			height: clamp(450px, 72vh, 780px);
			border-radius: 1rem;
		}
	}
</style>
