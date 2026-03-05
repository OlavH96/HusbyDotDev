<script lang="ts">
	import { planetParams } from '$lib/stores';
</script>

<div class="settings">
	<h1>Settings</h1>

	<section>
		<label for="planet-size">Planet size</label>
		<input id="planet-size" type="number" bind:value={$planetParams.planetSize} />
		<button on:click={(e) => ($planetParams.planetSize = 10)}>Reset</button>
	</section>
	<section>
		<label for="planet-mass">Planet mass</label>
		<input
			id="planet-mass"
			type="range"
			min="100"
			max="10000"
			step="100"
			bind:value={$planetParams.planetMass}
		/>
		<p>{$planetParams.planetMass}</p>
		<button on:click={(e) => ($planetParams.planetMass = 1000)}>Reset</button>
	</section>
	<section>
		<label for="planet-color">Planet color</label>
		<input id="planet-color" type="color" bind:value={$planetParams.planetColor} />
		<button on:click={(e) => ($planetParams.planetColor = 'random')}>Reset</button>
	</section>
</div>

<style>
	.settings {
		z-index: 10;
		position: absolute;
		right: 0.85rem;
		bottom: 0.85rem;
		background: rgba(7, 30, 34, 0.72);
		border: 1px solid rgba(195, 224, 229, 0.28);
		border-radius: 0.9rem;
		backdrop-filter: blur(12px);
		display: flex;
		flex-direction: column;
		padding: 0.8rem;
		gap: 0.45rem;
		color: var(--antique-white);
	}

	h1 {
		margin: 0;
		font-size: 1rem;
		text-align: left;
	}
	section {
		display: flex;
		align-items: center;
		gap: 0.55rem;
	}

	section:has(input[type='range']) > p {
		margin: 0;
		min-width: 2.5rem;
		font-size: 0.85rem;
		opacity: 0.9;
	}
	section > input,
	section > button {
		border-radius: 0.45rem;
		border: 1px solid rgba(195, 224, 229, 0.3);
		background: rgba(195, 224, 229, 0.1);
		color: var(--antique-white);
	}

	section > input[type='number'] {
		width: 4.2rem;
		padding: 0.25rem 0.35rem;
	}

	section > input[type='color'] {
		width: 2rem;
		height: 2rem;
		padding: 0.1rem;
	}

	section > input[type='range'] {
		accent-color: var(--baby-blue);
	}
	section > label {
		min-width: 5rem;
		font-size: 0.85rem;
	}

	section > button {
		padding: 0.25rem 0.5rem;
		cursor: pointer;
	}
</style>
