import { Direction } from '../routes/mapgen/Graph/MapGen';
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
	neighbours: MapGenNode[];
};
export type MapGenParam = {
	nodes: MapGenNode[];
	color: string;
	direction: Direction
};
export const mapgenParams = writable<MapGenParam[]>([
	{
		nodes: [
			{ name: '1', neighbours: [] },
			{ name: '2', neighbours: [] },
			{ name: '3', neighbours: [] },
		],
		color: 'red',
		direction: Direction.E
	},
	{
		nodes: [
			{ name: '4', neighbours: [] },
			{ name: '5', neighbours: [] },
			{ name: '6', neighbours: [] },
		],
		color: 'blue',
		direction: Direction.E
	}

]);
