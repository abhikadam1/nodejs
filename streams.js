const http = require('http');
const fs = require('fs');
const { log, error } = require('console');
//solution 1 : without streams, using readFile & writeFile
// const server = http.createServer((req, res)=>{
//     fs.readFile('./files/largeFile.txt', 'utf-8', (err, data)=>{
//         if(err){
//             console.log('some err has occurred');
//             return;
//         }
//         res.end(data);
//     })
// });

//solution 2 : with streams
// const server = http.createServer((req, res)=>{
//     let rs=  fs.createReadStream('./files/largeFile.txt')
//     rs.on('data', (chunkData)=>{
//         res.write(chunkData);
//         // res.end();
//     })
//     rs.on('end', () =>{
//         res.end();
//     })
//     rs.on('error',(error)=>{
//         console.log(error.message);
//         res.end(error.message);
//     })
// });

//Solution 3 : using pipe method
const server = http.createServer((req, res)=>{
    let rs = fs.createReadStream('./files/largeFile.txt');
    rs.pipe(res);
    // pipe method can be uset only on readable stram or readable source.
});

server.listen(8089,'127.0.0.1', ()=>{
    console.log('server has stated');
})