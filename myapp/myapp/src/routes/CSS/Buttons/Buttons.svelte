<script lang="ts">
</script>

<div class="buttons-container">
	<button class="button-base button">A button</button>
	<button class="button-base tilt-button">A button</button>
</div>

<style>
.buttons-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

.button-base {
	--border-width: .1em;
	--background-color: crimson;
	--border-color: white;

	background: var(--background-color);
	font-size: 1rem;
	border: none;
	padding: 1em 2em;
}

.button {
	outline: var(--border-width) solid var(--border-color);
	border-radius: .5em;
	border: var(--border-width) solid var(--border-color);
	outline-offset: calc(-1 * var(--border-width));
	transition:
		outline-offset 250ms ease,
		outline-width 250ms ease,
	;
}

.button:where(:hover, :focus) {
	outline-offset: calc((-4 * var(--border-width)));
}

.tilt-button {
	--bevel-distance: 1rem;

	clip-path: polygon(
		calc(var(--bevel-distance)) 0%,
 		100% 0%,
 		100% calc(100% - var(--bevel-distance)),
 		calc(100% - var(--bevel-distance)) 100%,
 		0 100%,
 		0% calc(var(--bevel-distance)));

	border: 1px solid white;
	transition: transform 250ms ease;
}
.tilt-button::before{
	content: '';
	display: inline-block;
	position: relative;
	background-color: white;
	clip-path: polygon(
		calc(var(--bevel-distance)) 0%,
 		100% 0%,
 		100% calc(100% - var(--bevel-distance)),
 		calc(100% - var(--bevel-distance)) 100%,
 		0 100%,
 		0% calc(var(--bevel-distance)));

}
.tilt-button:hover{
	transform: perspective(1rem) rotateY(-2.5deg);
}
</style>
