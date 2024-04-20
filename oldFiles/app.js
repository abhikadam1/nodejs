// console.log("Hello World");

// console.log(WebAssembly);
// filename ="sample.txt";
// const fs = require('node:fs');
// let fileContents = fs.readFileSync(filename, 'utf8');
// // const wasmBuffer = fs.readFileSync('/path/to/add.wasm');
// WebAssembly.instantiate(wasmBuffer).then(wasmModule => {
//   // Exported function live under instance.exports
//   const { add } = wasmModule.instance.exports;
//   const sum = add(5, 6);
//   console.log(sum); // Outputs: 11
// });



const myModule = require('../Modules/customModule.js') ;
// import { json } from 'body-parser';

// const app = myModule.express();
const app = myModule.express();
app.get('./getVouchers', (req, res) => {
    console.log(' Data ', req);
    res.status(200).json({
        status : 200,
        data : {
            voucher : " Voucher Details found",
        }
    })
});


const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});