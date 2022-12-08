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
			let nodes: Node[] = [];
			$mapgenParams.forEach(param => {
				let rowNodes = param.nodes.map((n, i) => new Node({x: 100*(i+1), y: y, name: n.name, color: param.color}));
				rowNodes.forEach(n => n.draw(p5));
				rowNodes.reduce((p,c) => { p.lineTo(p5, c); return c;})
				nodes.push(...rowNodes);
				y += 100;
			});
			nodes.forEach(n => {
				nodes.forEach(n1 => {
					if(n.props.name === n1.props.name)
						n.lineTo(p5, n1);
				});
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