<script lang="ts">
	import { mapgenParams, type MapGenNode, type MapGenParam } from '$lib/stores';
	import { lastItemInArray, removeItemFromArray } from '$lib/Util';
	import { Button, Dropdown, Input, Label, Select } from 'flowbite-svelte';
	import {Plus} from 'svelte-heros-v2'
	import { Direction } from './Graph/MapGen';

	function deleteRow(row: MapGenParam) {
		mapgenParams.update((items) => {
			items.splice(items.indexOf(row), 1);
			return items;
		});
	}
	function newRow() {
		let newParam = {
			nodes: [{ name: 'test', neighbours:[]} as MapGenNode],
			color: "black",
			direction: Direction.E
		} as MapGenParam;
		mapgenParams.set([...$mapgenParams, newParam]);
	}

	function newNode(row: MapGenParam, current: MapGenNode): void {
		let rowindex = $mapgenParams.indexOf(row);
		let index = row.nodes.indexOf(current);

		const newNode = {
			name: `${current.name}-${index}`
		};

		//row.nodes.push(newNode);
		row.nodes = [...row.nodes.slice(0, index), current, newNode , ...row.nodes.slice(index+1)]

		mapgenParams.set($mapgenParams);
	}

	function deleteNode(row: MapGenParam, node: MapGenNode): void {
		//node.neighbours.forEach(n => removeItemFromArray(n.neighbours, node));
		row.nodes.splice(row.nodes.indexOf(node), 1);
		mapgenParams.set($mapgenParams);
	}


	function duplicateRow(row: MapGenParam): void {
		let newRow = {
			nodes : row.nodes.map(n => {return {...n} as MapGenNode}), // clone without objects being the same
			color: row.color,
			direction: row.direction
		} as MapGenParam;
		mapgenParams.set([...$mapgenParams, newRow]);
	}
</script>

<main class="settings-panel">
	<div class="settings-stack">
		<Button class="w-fit" on:click={newRow}>New Row</Button>
		{#each $mapgenParams as row}
			<div class="row-card flex gap-2 items-center w-full">
				<Button on:click={() => deleteRow(row)}>Delete</Button>
				<div class="flex flex-row justify-center items-center gap-2">
					{#each row.nodes as node}
						<div class="flex flex-row justify-center items-center gap-2">
							<Label for="">Name</Label>
							<Input type="text" bind:value={node.name} />
							<Button on:click={() => deleteNode(row, node)} tabindex="-1">Delete</Button>
							<Plus on:click={() => newNode(row, node)} />
						</div>
					{/each}
				</div>
				<div class="ml-auto mr-4 justify-self-end flex gap-2">
				<Select items={Object.keys(Direction).map(v => { return{value:v, name:v} })} bind:value={row.direction}/>
				<Button class="" on:click={() => duplicateRow(row)}>Duplicate</Button>
				<Input type="color" class="h-10 w-10 !p-0 !border-0" bind:value={row.color} />
				</div>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		width: 100%;
	}

	.settings-stack {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		padding: 0.2rem;
	}

	.row-card {
		padding: 0.55rem;
		border-radius: 0.75rem;
		background: rgba(195, 224, 229, 0.08);
		border: 1px solid rgba(195, 224, 229, 0.2);
	}

	@media screen and (max-width: 860px) {
		.row-card {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
