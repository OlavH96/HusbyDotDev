<script lang="ts">
	export let url = '';
	export let text = '';
	export let border: boolean = true;
</script>

<a href={url} class:border>{text}</a>

<style>
	a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.52rem 0.85rem;
		border-radius: 999px;
		font-size: 0.92rem;
		font-weight: 500;
		color: rgba(254, 239, 221, 0.9);
		background-color: transparent;
		transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
		text-decoration: none;
	}

	a:hover {
		transform: translateY(-1px);
	}

	a:not(.border):hover {
		background-color: rgba(195, 224, 229, 0.12);
		color: var(--antique-white);
	}

	.border {
		padding: 0.62rem 1.15rem;
		border: 1px solid rgba(195, 224, 229, 0.55);
		background: rgba(195, 224, 229, 0.08);
	}

	.border:hover {
		background-color: rgba(195, 224, 229, 0.22);
		color: var(--antique-white);
	}
</style>
