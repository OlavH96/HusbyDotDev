<script lang="ts">
	import { mapgenParams, type MapGenNode, type MapGenParam } from "$lib/stores";
	import {Button, Input, Label} from "flowbite-svelte";

	function deleteRow(row: MapGenParam){
		mapgenParams.update(items => {
			items.splice(items.indexOf(row), 1);
			return items;
		})
	}
	function newRow(){
		let newParam = {
			nodes: [{name: "test"}]
		} as MapGenParam;
		mapgenParams.set([...$mapgenParams, newParam])
	}

	function newNode(row: MapGenParam, currentNode: MapGenNode): void {
		if(row.nodes[row.nodes.length-1] !== currentNode) return;
		row.nodes.push({
			name: ""
		});
		mapgenParams.set($mapgenParams);
	}

	function deleteNode(row: MapGenParam, node: MapGenNode): void {
		row.nodes.splice(
			row.nodes.indexOf(node), 1
		);
		mapgenParams.set($mapgenParams);
	}
</script>

<main>
	<div class="flex flex-col gap-2 m-2">
		<Button class="w-fit" on:click={newRow}>New Row</Button>
		{#each $mapgenParams as row}
		<div class="flex gap-2 items-center">
			<Button on:click={() => deleteRow(row)}>Delete</Button>
			<div class="flex flex-row justify-center items-center">
				{#each row.nodes as node}
				<div class="flex flex-row justify-center items-center gap-2">
					<Label for="">Name</Label>
					<Input type="text" bind:value={node.name} on:focus={() => newNode(row, node)}/>
					<Button on:click={() => deleteNode(row, node)}>Delete</Button>
				</div>
				{/each}
			</div>
			<Input type="color" class="w-10" bind:value={row.color}></Input>
		</div>
		{/each}
	</div>
</main>

<style>
	main {
		background-color: var(--cg-blue);
	}
</style>