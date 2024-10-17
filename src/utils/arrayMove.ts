export function arraymove<T>(
	arr: T[],
	fromIndex: number,
	toIndex: number
) {
	if (toIndex < 0 || toIndex === arr.length) {
		return [] as T[];
	}
	const element = arr[fromIndex];
	arr[fromIndex] = arr[toIndex];
	arr[toIndex] = element;
}


export function getArrayMoved<T>(arr: T[],
								 fromIndex: number,
								 toIndex: number
): T[] {
	if (toIndex < 0 || toIndex >= arr.length) {
		return arr;
	}
	const newArr = [...arr];
	const [element] = newArr.splice(fromIndex, 1);
	newArr.splice(toIndex, 0, element);
	return newArr;
}
