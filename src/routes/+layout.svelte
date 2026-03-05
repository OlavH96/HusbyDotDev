<script lang="ts">
	import './app.css';
	import Link from '$lib/components/Link.svelte';
</script>

<div class="app-shell">
	<header class="top-nav">
		<div class="brand">OH</div>
		<nav>
			<Link url="/" text="Home" border={false} />
			<Link url="/planets" text="Planets" border={false} />
			<Link url="/CSS" text="Css" border={false} />
			<Link url="/mapgen" text="MapGen" border={false} />
		</nav>
	</header>
	<main class="content">
		<slot />
	</main>
</div>

<style>
	:global(:root) {
		--dark-jungle-green: #071e22;
		--orange-red-crayola: #fe5f55;
		--antique-white: #feefdd;
		--cg-blue: #247ba0;
		--black-coffee: #32292f;

		--midnight-blue: #41729f;
		--blue-gray: #5885af;
		--dark-blue: #274472;
		--baby-blue: #c3e0e5;

		--text-color-main: var(--baby-blue);
		--text-color-secondary: var(--midnight-blue);

		--background-color: var(--dark-blue);
		--background-color-secondary: var(--midnight-blue);
	}

	:global(body) {
		margin: 0;
		font-family: 'Inter', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: var(--text-color-main);
		background:
			radial-gradient(circle at top, var(--midnight-blue) 0%, transparent 60%),
			linear-gradient(165deg, var(--dark-blue) 0%, #1b2f52 100%);
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(code) {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}

	.app-shell {
		min-height: 100vh;
		padding: 1rem;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 2rem;
	}

	.top-nav {
		width: min(860px, 100%);
		margin: 0 auto;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(7, 30, 34, 0.35);
		border: 1px solid rgba(195, 224, 229, 0.2);
		border-radius: 999px;
		backdrop-filter: blur(12px);
	}

	.brand {
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border-radius: 999px;
		font-weight: 700;
		color: var(--antique-white);
		background: rgba(195, 224, 229, 0.15);
	}

	nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.25rem;
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 2rem;
	}

	@media screen and (max-width: 700px) {
		.app-shell {
			gap: 1.2rem;
		}

		.top-nav {
			border-radius: 1rem;
			padding: 0.65rem;
			gap: 0.4rem;
		}

		.brand {
			display: none;
		}

		nav {
			width: 100%;
			justify-content: space-between;
		}
	}
</style>
