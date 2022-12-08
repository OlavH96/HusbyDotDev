import { readable, writable } from 'svelte/store';

export type PlanetOptions = {
	planetSize: number;
	planetMass: number;
	planetColor: string;
};
export const planetParams = writable<PlanetOptions>({
	planetSize: 10,
	planetMass: 1,
	planetColor: 'random'
} as PlanetOptions);

export type MapGenNode = {
	name: string;
};
export type MapGenParam = {
	nodes: MapGenNode[],
	color: string
};
export const mapgenParams = writable<MapGenParam[]>([
	{
		nodes: [{ name: "Test" }],
		color: "firebrick"
	}
])