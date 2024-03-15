const { log } = require('console');
const fs = require('fs');
console.log(" Program has started");

// fs.readFile('./sample.txt', 'utf-8', (err,data)=>{
//     console.log(data, ' data ');
// });

// setTimeout(()=>{
//     console.log(' setTimeout complete ');
// },1000);

// setImmediate(()=>{
//     console.log(' setImmediate complete ');
// })

fs.readFile('./sample.txt', 'utf-8', (err,data)=>{
    console.log( 'file read complete data ');

    setTimeout(()=>{
        console.log(' setTimeout complete ');
    },0);
    
    setImmediate(()=>{
        console.log(' setImmediate complete ');
    });

    process.nextTick(()=>{
        console.log("Process nexttick complete");
    })
});



// setInterval(() => {
//     console.log(' setInterval complete ');
// }, 2147483646);

console.log(" Program has ended ");

