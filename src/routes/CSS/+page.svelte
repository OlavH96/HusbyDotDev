<script lang="ts">
	import Buttons from './Buttons/Buttons.svelte';
</script>

<main class="css-container">
	<h1>CSS display</h1>
	<section>
		<h2>Css :has relational selector examples</h2>
		<div class="cards">
			<div class="card">Some text</div>
			<div class="card">Some text</div>
			<div class="card">Some text</div>
			<div class="card">Some text</div>
			<div class="card">Some text</div>
			<div class="card">Some text</div>
		</div>
	</section>

	<section>
		<h2>Buttons</h2>
		<Buttons />
	</section>

	<section>
		<h2>Another section</h2>
	</section>
	<section>
		<h2>Another section (auto numbered)</h2>
	</section>
</main>

<style>
	.css-container {
		display: grid;
		grid-auto-flow: row;
		counter-reset: h2-counter;
	}

	.css-container > section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	h1 {
		color: var(--text-color-main);
	}

	h2::before {
		counter-increment: h2-counter;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		content: counter(h2-counter) ' ';
		width: 1em;
		height: 1em;
		position: relative;
		right: 1rem;
		background-color: var(--text-color-secondary);
		border: 1px solid inherit;
		border-radius: 0.2em;
	}

	section h2 {
		color: var(--text-color-main);
	}

	.cards {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1rem;
	}

	.card {
		width: 100px;
		height: 100px;
		background-color: var(--cg-blue);
		display: flex;
		justify-content: center;
		align-items: center;

		transition: scale 300ms, opacity 200ms;
	}

	.card:hover {
		scale: 120%;
	}

	.cards:has(.card:hover) .card:not(:hover) {
		scale: 0.8;
		opacity: 0.7;
	}
</style>
