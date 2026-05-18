export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[]
): number[] {
  const n1 = collection_1.length;
  const n2 = collection_2.length;
  const n3 = collection_3.length;

  const result: number[] = new Array(n1 + n2 + n3);

  let i = 0;          // forward index for collection_1 (asc)
  let j = n2 - 1;     // backward index for collection_2 (desc -> read asc)
  let k = 0;          // forward index for collection_3 (asc)
  let out = 0;        // write index for result

  const INF = Number.POSITIVE_INFINITY;

  while (i < n1 || j >= 0 || k < n3) {
    const v1 = i < n1 ? collection_1[i] : INF;
    const v2 = j >= 0 ? collection_2[j] : INF;
    const v3 = k < n3 ? collection_3[k] : INF;

    if (v1 <= v2 && v1 <= v3) {
      result[out++] = v1;
      i++;
    } else if (v2 <= v1 && v2 <= v3) {
      result[out++] = v2;
      j--;
    } else {
      result[out++] = v3;
      k++;
    }
  }

  return result;
}
