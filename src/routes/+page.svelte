<script>
	import Link from '$lib/components/Link.svelte';
</script>

<section class="hero">
	<p class="eyebrow">Developer</p>
	<h1>Olav Reppe Husby</h1>
	<div class="links">
		<Link url="https://github.com/OlavH96" text="GitHub" />
		<Link url="https://www.linkedin.com/in/olav-husby-7039489a/" text="LinkedIn" />
	</div>
</section>

<style>
	.hero {
		width: min(760px, 100%);
		padding: clamp(1.5rem, 4vw, 3rem);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 1rem;
		background: rgba(7, 30, 34, 0.35);
		border: 1px solid rgba(195, 224, 229, 0.22);
		border-radius: 1.5rem;
		box-shadow: 0 20px 50px rgba(7, 30, 34, 0.35);
	}

	.eyebrow {
		margin: 0;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		font-size: 0.74rem;
		font-weight: 600;
		color: var(--antique-white);
		opacity: 0.8;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 8vw, 4.5rem);
		line-height: 1.1;
		color: var(--text-color-main);
	}

	.intro {
		margin: 0;
		max-width: 56ch;
		line-height: 1.6;
		color: rgba(254, 239, 221, 0.86);
	}

	.links {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.2rem;
	}

	@media screen and (max-width: 520px) {
		.hero {
			border-radius: 1rem;
			padding: 1.25rem;
		}

		.links {
			flex-direction: column;
			width: 100%;
		}
	}
</style>
