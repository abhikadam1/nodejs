// lecture 3 read input
// const readLine = require('readline');
// const rl = readLine.createInterface({
//     input : process.stdin,
//     output : process.stdout,
// });

// rl.question("Please Enter your name ", (name)=>{
//     console.log(`You entered ${name}`);
//     rl.close();
// });
// rl.on("close", ()=> {
//     console.log("Interface Closed  1234");
//     process.exit(0);
// })
// return 0;

// lecture 4 read nad write to file 
const fs = require('fs');
// const { log } = require('console');
// const { log } = require('console');
// let text = fs.readFileSync('./sample.txt', 'utf-8');
// console.log(text);
// let writeData = `Data to be written is ${text}. \nOn date of ${new Date()}`;
// let write = fs.writeFileSync('./sample.txt.txt', writeData)

// console.log(write, ' \write ');

// lec 5
// fs.readFile('./sample.txt.txt', 'utf-8', (err, data) => {
//     console.log(err, `\nerr`, data, `\ndata`);
//     fs.writeFile('./sample.txt', `${data}\n\n Date Created On ${new Date()}`, () => {
//         console.log("Written content to file ....");
//     });
// });

// console.log("reading file ....");
// console.log("Writting content to file ....");

//lect 6
const html = fs.readFileSync('./Template/index.html', 'utf-8');
// let jsonData;
// fs.readFile('./Template/data/jsonData.json', 'utf-8', (err, data)=>{
//     jsonData = data;
// });
const jsonData = JSON.parse(fs.readFileSync('./Template/data/jsonData.json', 'utf-8'));
console.log(typeof jsonData);
const product = fs.readFileSync('./Template/product.html', 'utf-8');
// const productHtmlArr = jsonData.map((curr, index, arr) => {
   
// })

let count = 1;
const http = require('http');
const url = require('url');
const { json } = require('stream/consumers');
const { log } = require('console');
// const { json } = require('stream/consumers');
// const { type } = require('os');
let server = http.createServer((request, response) => {
    // let path = request.url;
    let queryParam = url.parse(request.url, true);
    let {query ,pathname : path } = queryParam;
    console.log(path);
    if (path.toLowerCase() == '/home' || path.toLowerCase() == '/') {
        response.writeHead(200, {
            'conntent-Type': "text/html",
            'my-hero': "Hello Node Js"
        });
        let productHtmlArr = jsonData.map((prod)=>{
            return getProductHtml(product,prod);
        })
        let productResponse = html.replace('{{%content%}}', productHtmlArr.join(','));
        response.end(productResponse);
        // response.end(html.replace('{{%content%}}', product));

    } else if (path.toLocaleLowerCase() == '/about') {
        response.writeHead(200);
        response.end(html.replace('{{%content%}}', "You are in about page "));

    } else if (path.toLowerCase() == '/product') {
        if(!query.id){
            response.writeHead(200, {
                'conntent-Type': "application/json",
                'my-hero': "Hello Node Js"
            });
            let productHtmlArr = jsonData.map((prod)=>{
                return getProductHtml(product,prod);
            })
            let productResponse = html.replace('{{%content%}}', productHtmlArr.join(','));
            response.end(productResponse);
        }else{
            let prodData = jsonData[query.id];
            console.log(prodData, "ljv");
            response.writeHead(200, {
                'conntent-Type': "application/json",
                'my-hero': "Hello Node Js"
            });
            let productHtmlArr = getProductHtml(product,prodData)
            let productResponse = html.replace('{{%content%}}', productHtmlArr);
            response.end(productResponse);
        }
        
        // response.end(html.replace('{{%content%}}', "You are in product page "));
        // response.end(jsonData);

    } else if (path.toLowerCase() == '/services') {
        response.writeHead(200);
        response.end(html.replace('{{%content%}}', "You are in service page "));

    } else if (path.toLocaleLowerCase() == '/contact') {
        response.writeHead(200);
        response.end(html.replace('{{%content%}}', "You are in contact page "));

    }else {
        response.writeHead(404);
        response.end(html.replace('{{%content%}}', "Error 404 : Page not found "));

    }
    // console.log(request.url);
});

server.listen(8080, '127.0.0.1', () => {
    console.log('server has started ');
})