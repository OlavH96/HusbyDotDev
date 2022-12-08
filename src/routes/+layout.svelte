<script lang="ts">
	import Link from "$lib/components/Link.svelte";

</script>

<div class="App">
	<nav>
		<Link url="/" text="Home" border={false} />
		<Link url="/planets" text="Planets" border={false} />
		<Link url="/CSS" text="Css" border={false} />
		<Link url="/mapgen" text="MapGen" border={false} />
	</nav>
	<div class="content">
		<slot />
	</div>
</div>

<style global>
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
			'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
	:root {
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

		background-color: var(--background-color);
	}
	.App {
		display: grid;
		grid-template:
			'H H H' 2rem
			'C C C' 1fr
			/ 1fr 1fr 1fr;

		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}

	@media screen and (min-width: 600px) {
		.App {
			grid-template-areas:
				'. H .'
				'C C C';
		}
	}

	nav {
		grid-area: H;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background-color: var(--background-color-secondary);
		border-radius: 0 0 1rem 1rem;
	}

	.content {
		grid-area: C;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}
</style>
