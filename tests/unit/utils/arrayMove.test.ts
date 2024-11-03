import {expect, test} from "vitest";
import {arraymove, getArrayMoved} from "@/utils/arrayMove";

test('Test getArrayMoved', () => {
	const movedArray = getArrayMoved([1,2,3,4,5], 0, 1)
	console.log('Moved Array:', movedArray);
	expect(movedArray).toEqual([2, 1, 3, 4, 5])
})
