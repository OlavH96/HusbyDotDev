<script lang="ts">
	import { planetParams } from '$lib/stores';
</script>

<div class="settings">
	<h1>Settings</h1>

	<section>
		<label>Planet size</label>
		<input type="number" bind:value={$planetParams.planetSize} />
		<button on:click={(e) => ($planetParams.planetSize = 10)}>Reset</button>
	</section>
	<section>
		<label>Planet mass</label>
		<input type="range" min="0.1" max="10" bind:value={$planetParams.planetMass} />
		<p>{$planetParams.planetMass}</p>
		<button on:click={(e) => ($planetParams.planetMass = 1)}>Reset</button>
	</section>
	<section>
		<label>Planet color</label>
		<input type="color" bind:value={$planetParams.planetColor} />
		<button on:click={(e) => ($planetParams.planetColor = 'random')}>Reset</button>
	</section>
</div>

<style>
	.settings {
		z-index: 10;
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: firebrick;
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-size: 1rem;
		text-align: center;
	}
	section {
		display: flex;
	}

	section:has(input[type='range']) {
	}
	section:has(input[type='range']) > p {
		margin: 0;
	}
	section > input[type='range'] {
	}
	section > label {
		margin-right: 1rem;
	}
</style>
