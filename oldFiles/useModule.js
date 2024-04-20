const fs = require('fs');
const http = require('http');
const url = require('url');
const getProductHtml = require('../Modules/customModule.js');

const html = fs.readFileSync('./Template/index.html', 'utf-8');
const jsonData = JSON.parse(fs.readFileSync('./Template/data/jsonData.json', 'utf-8'));
const product = fs.readFileSync('./Template/product.html', 'utf-8');
console.log(jsonData, ' jsonData ');
let server = http.createServer((request, response) => {
    let queryParam = url.parse(request.url,true);
    let{query, pathname : path } = queryParam;
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
   
})

server.listen(8082, '127.0.0.1',() => {
    console.log("Server has started ");
})