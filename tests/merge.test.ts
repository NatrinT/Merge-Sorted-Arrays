import { merge } from '../src/merge';

describe('merge(collection_1, collection_2, collection_3)', () => {
  const isAscending = (arr: number[]): boolean => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  };

  describe('Basic cases', () => {
    it('should merge three arrays from the problem context correctly', () => {
      const c1 = [1, 4, 7, 10];
      const c2 = [9, 6, 3, 0]; // descending
      const c3 = [2, 5, 8, 11];
      const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      expect(merge(c1, c2, c3)).toEqual(expected);
    });

    it('should return ascending result for simple input', () => {
      const c1 = [1, 3, 5];
      const c2 = [6, 4, 2]; // descending
      const c3 = [0, 7, 8];
      const result = merge(c1, c2, c3);
      expect(isAscending(result)).toBe(true);
      expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should preserve total length (n1 + n2 + n3)', () => {
      const c1 = [1, 2, 3];
      const c2 = [9, 5, 1];
      const c3 = [0, 4, 8, 12];
      const result = merge(c1, c2, c3);
      expect(result.length).toBe(c1.length + c2.length + c3.length);
    });
  });

  describe('Edge cases — empty arrays', () => {
    it('should handle all three empty', () => {
      expect(merge([], [], [])).toEqual([]);
    });

    it('should handle empty collection_1', () => {
      expect(merge([], [5, 3, 1], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle empty collection_2', () => {
      expect(merge([1, 3, 5], [], [2, 4, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle empty collection_3', () => {
      expect(merge([1, 3, 5], [6, 4, 2], [])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle only collection_1 non-empty', () => {
      expect(merge([1, 2, 3], [], [])).toEqual([1, 2, 3]);
    });

    it('should handle only collection_2 non-empty (descending input)', () => {
      expect(merge([], [5, 3, 1], [])).toEqual([1, 3, 5]);
    });

    it('should handle only collection_3 non-empty', () => {
      expect(merge([], [], [1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('Edge cases — duplicates', () => {
    it('should keep duplicates across collections', () => {
      const c1 = [1, 2, 3];
      const c2 = [3, 2, 1]; // descending
      const c3 = [1, 2, 3];
      expect(merge(c1, c2, c3)).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3]);
    });

    it('should handle duplicates within a single collection', () => {
      const c1 = [1, 1, 1];
      const c2 = [2, 2, 2];
      const c3 = [3, 3, 3];
      expect(merge(c1, c2, c3)).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3]);
    });
  });

  describe('Edge cases — value ranges', () => {
    it('should handle arrays starting at 0 (problem says min = 0)', () => {
      const c1 = [0, 1, 2];
      const c2 = [2, 1, 0];
      const c3 = [0, 1, 2];
      expect(merge(c1, c2, c3)).toEqual([0, 0, 0, 1, 1, 1, 2, 2, 2]);
    });

    it('should handle single-element collections', () => {
      expect(merge([5], [3], [7])).toEqual([3, 5, 7]);
    });

    it('should handle collections of very different sizes', () => {
      const c1 = [1];
      const c2 = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
      const c3 = [5, 15, 25];
      const result = merge(c1, c2, c3);
      expect(isAscending(result)).toBe(true);
      expect(result.length).toBe(14);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(100);
    });

    it('should handle large values', () => {
      const c1 = [1000, 2000, 3000];
      const c2 = [2500, 1500, 500];
      const c3 = [100, 750, 1750];
      const result = merge(c1, c2, c3);
      expect(isAscending(result)).toBe(true);
      expect(result).toEqual([100, 500, 750, 1000, 1500, 1750, 2000, 2500, 3000]);
    });
  });

  describe('Disjoint ranges', () => {
    it('should handle non-overlapping ranges', () => {
      const c1 = [1, 2, 3];
      const c2 = [9, 8, 7]; // descending -> 7, 8, 9
      const c3 = [4, 5, 6];
      expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should handle one collection entirely smaller than the others', () => {
      const c1 = [50, 60, 70];
      const c2 = [3, 2, 1]; // descending -> 1, 2, 3
      const c3 = [100, 200, 300];
      expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 50, 60, 70, 100, 200, 300]);
    });
  });

  describe('Stress test', () => {
    it('should correctly merge larger generated arrays', () => {
      const N = 1000;
      const c1: number[] = [];
      const c2: number[] = [];
      const c3: number[] = [];
      for (let i = 0; i < N; i++) {
        c1.push(i * 3);          // 0, 3, 6, ...
        c3.push(i * 3 + 1);      // 1, 4, 7, ...
      }
      for (let i = N - 1; i >= 0; i--) {
        c2.push(i * 3 + 2);      // descending: ..., 8, 5, 2
      }
      const result = merge(c1, c2, c3);
      expect(result.length).toBe(3 * N);
      expect(isAscending(result)).toBe(true);
      // Result should be 0, 1, 2, 3, 4, 5, ...
      for (let i = 0; i < 3 * N; i++) {
        expect(result[i]).toBe(i);
      }
    });
  });
});
