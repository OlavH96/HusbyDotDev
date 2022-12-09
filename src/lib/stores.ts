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
};
export type MapGenParam = {
	nodes: MapGenNode[];
	color: string;
	direction: Direction
};
export const mapgenParams = writable<MapGenParam[]>([
	{
		nodes: [
			{ name: '1-1'},
			{ name: '1-2'},
			{ name: '1-3'},
		],
		color: 'red',
		direction: Direction.E
	},
	{
		nodes: [
			{ name: '2-1'},
			{ name: '2-2'},
			{ name: '2-3'},
		],
		color: 'blue',
		direction: Direction.E
	}

]);
