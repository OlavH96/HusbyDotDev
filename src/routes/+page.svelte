<script>
	import Link from '$lib/components/Link.svelte';
</script>

<div class="bio-content">
	<div class="name">Olav Reppe Husby</div>
	<div class="links">
		<Link url="https://github.com/OlavH96" text="GitHub" />
		<Link url="https://www.linkedin.com/in/olav-husby-7039489a/" text="LinkedIn" />
	</div>
</div>

<style>
	@keyframes wobble {
		0% {
			transform: rotate(-10deg);
		}
		100% {
			transform: rotate(10deg);
		}
	}

	@keyframes shimmer {
		0% {
			color: var(--text-color-main);
		}
		100% {
			color: var(--text-color-secondary);
		}
	}

	.name {
		font-size: 10vw;
		color: var(--text-color-main);
	}

	@media screen and (min-width: 600px) {
		.name {
			font-size: 5vw;
		}
	}
	.bio-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.bio-content > * {
		/* margin-bottom: 5rem; */
	}

	.links {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
	}
</style>
