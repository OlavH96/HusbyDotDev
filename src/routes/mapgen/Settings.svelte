<script lang="ts">
	import { mapgenParams, type MapGenParam } from "$lib/stores";

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

	function newNode(row: MapGenParam) {
		row.nodes.push({
			name: ""
		});
		mapgenParams.set($mapgenParams);
	}
</script>

<main>
	<div class="flex flex-col gap-2 m-2">
		<button class="w-fit" on:click={newRow}>New Row</button>
		{#each $mapgenParams as row}
		<div class="flex flex-row">
			<button on:click={() => deleteRow(row)}>Delete</button>
			<div class="node-inputs flex flex-row">
				{#each row.nodes as node}
				<div class="flex flex-row">
					<label for="">Name</label>
					<input type="text" bind:value={node.name} on:focus|once={newNode(row)}>
				</div>
				{/each}
			</div>
		</div>
		{/each}
	</div>
</main>

<style>
	main {
		background-color: var(--cg-blue);
	}
	.inputs {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.row {
		display: flex;

	}
</style>