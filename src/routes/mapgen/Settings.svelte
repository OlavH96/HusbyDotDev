<script lang="ts">
	import { mapgenParams, type MapGenNode, type MapGenParam } from '$lib/stores';
	import { Button, Input, Label } from 'flowbite-svelte';
	import {Plus} from 'svelte-heros-v2'

	function deleteRow(row: MapGenParam) {
		mapgenParams.update((items) => {
			items.splice(items.indexOf(row), 1);
			return items;
		});
	}
	function newRow() {
		let newParam = {
			nodes: [{ name: 'test' }]
		} as MapGenParam;
		mapgenParams.set([...$mapgenParams, newParam]);
	}

	function newNode(row: MapGenParam, currentNode: MapGenNode): void {
		if (row.nodes[row.nodes.length - 1] !== currentNode) return;
		row.nodes.push({
			name: ''
		});
		mapgenParams.set($mapgenParams);
	}

	function deleteNode(row: MapGenParam, node: MapGenNode): void {
		row.nodes.splice(row.nodes.indexOf(node), 1);
		mapgenParams.set($mapgenParams);
	}


	function duplicateRow(row: MapGenParam): void {
		let newRow = {
			nodes : row.nodes.map(n => {return {...n} as MapGenNode}) // clone without objects being the same
		} as MapGenParam;
		mapgenParams.set([...$mapgenParams, newRow]);
	}
</script>

<main>
	<div class="flex flex-col gap-2 m-2 w-full">
		<Button class="w-fit" on:click={newRow}>New Row</Button>
		{#each $mapgenParams as row}
			<div class="flex gap-2 items-center w-full">
				<Button on:click={() => deleteRow(row)}>Delete</Button>
				<div class="flex flex-row justify-center items-center">
					{#each row.nodes as node}
						<div class="flex flex-row justify-center items-center gap-2">
							<Label for="">Name</Label>
							<Input type="text" bind:value={node.name} />
							
							<Plus size="48" on:click={() => newNode(row, node)} />

							<Button on:click={() => deleteNode(row, node)}>Delete</Button>
						</div>
					{/each}
				</div>
				<div class="ml-auto mr-4 justify-self-end flex gap-2">
				<Button class="" on:click={() => duplicateRow(row)}>Duplicate</Button>
				<Input type="color" class="h-10 w-10 !p-0 !border-0" bind:value={row.color} />
				</div>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		background-color: var(--cg-blue);
	}
</style>
