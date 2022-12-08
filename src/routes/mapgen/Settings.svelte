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
	<h1>Settings</h1>

	<div class="inputs">
		<button class="new-row" on:click={newRow}>New Row</button>
		{#each $mapgenParams as row}
		<div class="row">
			<button on:click={() => deleteRow(row)}>Delete</button>
			<div class="node-inputs">
				{#each row.nodes as node}
				<div>
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