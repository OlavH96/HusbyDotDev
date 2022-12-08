<script lang="ts">
	import { mapgenParams } from "$lib/stores";
	import type { p5 } from "p5-svelte";
	import P5 from "p5-svelte/P5.svelte";
	import Node from "./Graph/Node";
	import Settings from "./Settings.svelte";

	const canvas = { w: window.innerWidth, h: window.innerHeight };

	const sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(canvas.w, canvas.h);
		};
		p5.draw = () => {
			p5.background("black")

			let y = 100;
			$mapgenParams.forEach(param => {
				
				let x = 100;
				param.nodes.forEach(node => {

				new Node({x: x, y: y, name: node.name}).draw(p5);
				x+=100;

				});
				y += 100;
			});
		};
	};

</script>

<main>
	<Settings/>
	<P5 {sketch}/>
/>
</main>

<style>
	main{
		display: flex;
		flex-direction: column;
	}
</style>