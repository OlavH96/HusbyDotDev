<script lang="ts">
	export let url = '';
	export let text = '';
	export let border: boolean = true;
</script>

<a href={url} class:border>{text}</a>

<style>
	a {
		background-color: transparent;
		color: var(--antique-white);
		padding: 10px 20px 10px 20px;
		margin: 0.1em;
		transition: 0.2s ease-in-out;
		text-decoration: none;
	}

	.border {
		border: 1px solid var(--antique-white);
		border-radius: 25px;
	}

	.border:hover {
		background-color: var(--text-color-secondary);
		color: black;
	}
</style>
