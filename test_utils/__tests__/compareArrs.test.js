const compareArrs = require('../compareArrs');

describe('compareArrs(): compares two arrays for matching elements in any order',
() => {
  test('false: different array lengths',
  () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2];
    expect(compareArrs(arr1, arr2)).toBe(false);
  });

  test('false: different elements',
  () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    expect(compareArrs(arr1, arr2)).toBe(false);
  });

  test('true: same elements, same order',
  () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    expect(compareArrs(arr1, arr2)).toBe(true);
  });

  test('true: same elements, different order',
  () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    expect(compareArrs(arr1, arr2)).toBe(false);
  });

  test('true: two empty arrays',
  () => {
    const arr1 = [];
    const arr2 = [];
    expect(compareArrs(arr1, arr2)).toBe(true);
  });
});
