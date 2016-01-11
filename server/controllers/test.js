'use strict';

//array.find(predicate)
//array.includes(element)
//[4, 6, 7, 12].findIndex(isPrime);

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9];
let obj = {
  name: 'Tom',
  age: 30,
  isAdmin: true,
  interests: ['women', 'computer', 'games']
};

console.log(arr);
// console.log(obj);

Array.from(new Array(20), (v, k) => k + 1);
arr.find(val => val === 9);
arr.filter(val => val === 9);
arr.findIndex(val => val === 10);

Object.keys(obj);
Object.keys(obj).map(key => obj[key]);
