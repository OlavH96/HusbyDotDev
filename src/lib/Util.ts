export function lastItemInArray<T>(array: T[]) {
	return array[array.length - 1];
}
export function removeItemFromArray<T>(array: T[], item: T) {
	let index = array.indexOf(item);
	array.splice(index, 1);
}
interface ForEach2DOptions<T> {
	rowAction?: (r: T[], index?: number) => void,
	itemAction?: (i: T, index?: number) => void
};
export function ForEach2D<T>(
	array2d: T[][],
	options: ForEach2DOptions<T> = {
		rowAction: r => { },
		itemAction: i => { }
	}){

	array2d.forEach((row, rowIndex) => { 
		if(options.rowAction) options.rowAction(row);
		row.forEach((i, itemIndex) => {
			if(options.itemAction) options.itemAction(i);
		})
	});
}
export function ForEach2DOnSelf<T>(
	array: T[],
	itemAction: (i1: T,i2: T) => void = (i1,i2) => { }
	) {
	array.forEach(item1 => {
		array.forEach(item2 => {
			itemAction(item1, item2);
		});
	});
}
export function Splice2D<T>(array: T[][], item: T) {
	array.forEach(row => {
		let index = row.indexOf(item);
		if (index != -1) {
			removeItemFromArray(row, item);
		}
	})
}