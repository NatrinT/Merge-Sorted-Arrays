import { merge } from './merge';

const collection_1 = [1, 4, 7, 10];
const collection_2 = [9, 6, 3, 0];
const collection_3 = [2, 5, 8, 11];

const result = merge(collection_1, collection_2, collection_3);

console.log('collection_1 (asc):', collection_1);
console.log('collection_2 (desc):', collection_2);
console.log('collection_3 (asc):', collection_3);
console.log('merged (asc):', result);
