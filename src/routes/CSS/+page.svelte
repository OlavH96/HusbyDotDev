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
		width: min(960px, 100%);
		gap: 1rem;
	}

	.css-container > section {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0.7rem;
		padding: 1.1rem;
		background: rgba(7, 30, 34, 0.35);
		border: 1px solid rgba(195, 224, 229, 0.2);
		border-radius: 1rem;
	}
	h1 {
		margin: 0;
		font-size: clamp(1.8rem, 5vw, 2.7rem);
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
		margin: 0;
		color: var(--text-color-main);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(3, minmax(90px, 1fr));
		gap: 1rem;
		width: 100%;
	}

	.card {
		width: 100%;
		aspect-ratio: 1;
		background: rgba(88, 133, 175, 0.7);
		border: 1px solid rgba(195, 224, 229, 0.3);
		border-radius: 0.75rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--antique-white);

		transition: scale 300ms, opacity 200ms;
	}

	.card:hover {
		scale: 120%;
	}

	.cards:has(.card:hover) .card:not(:hover) {
		scale: 0.8;
		opacity: 0.7;
	}

	@media screen and (max-width: 700px) {
		.cards {
			grid-template-columns: repeat(2, minmax(90px, 1fr));
		}

		h2::before {
			right: 0.5rem;
		}
	}
</style>
