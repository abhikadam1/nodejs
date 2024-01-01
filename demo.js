const { log } = require("console");

let arr = [
    { a: 20 },
    { b : 25 },
    { c : 5 },
    { d : ' kuib' },
    { f : 21 },
    { er : 5 },
    { e : 25 },
];
let sum = 0;
var a = [52,5,8,6];
// for (let key of arr){
//     console.log(key);
//     sum = key
// }

// const res = arr.reduce((acc, curr, index, arr) => {
//     console.log(acc);
//     if(typeof Object.values(curr)[0] === 'number'){
//         acc += Object.values(curr)[0];
//     }
//     // console.log(sum);
//     return acc;
// }, 0);

function modifyArr(arr){
    arr.push(4);
    arr= [1,2,3];
    console.log(a);
    console.log(arr);
    return arr;
} 
let b = modifyArr(a);
console.log(b);



// const res1 = arr.map((curr, index, arr) => {
//     if(typeof Object.values(curr)[0] === 'number'){
//         sum += Object.values(curr)[0];
//     }
// });
// console.log(res, ' sum  123 ');
