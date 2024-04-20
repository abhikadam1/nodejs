const fs = require('fs');
const http = require('http');
const url = require('url');
const events = require('events');
const getProductHtml = require('../Modules/customModule.js');
const { log } = require('console');
const html = fs.readFileSync('./Template/index.html', 'utf-8');
const jsonData = JSON.parse(fs.readFileSync('./Template/data/jsonData.json', 'utf-8'));
const product = fs.readFileSync('./Template/product.html', 'utf-8');

// let server = http.createServer((request, response) => {
//     let queryParam = url.parse(request.url,true);
//     let{query, pathname : path } = queryParam;
//     if (path.toLowerCase() == '/home' || path.toLowerCase() == '/') {
//         response.writeHead(200, {
//             'conntent-Type': "text/html",
//             'my-hero': "Hello Node Js"
//         });
//         let productHtmlArr = jsonData.map((prod)=>{
//             return getProductHtml(product,prod);
//         })
//         let productResponse = html.replace('{{%content%}}', productHtmlArr.join(','));
//         response.end(productResponse);
//         // response.end(html.replace('{{%content%}}', product));

//     } else if (path.toLocaleLowerCase() == '/about') {
//         response.writeHead(200);
//         response.end(html.replace('{{%content%}}', "You are in about page "));

//     } else if (path.toLowerCase() == '/product') {
//         if(!query.id){
//             response.writeHead(200, {
//                 'conntent-Type': "application/json",
//                 'my-hero': "Hello Node Js"
//             });
//             let productHtmlArr = jsonData.map((prod)=>{
//                 return getProductHtml(product,prod);
//             })
//             let productResponse = html.replace('{{%content%}}', productHtmlArr.join(','));
//             response.end(productResponse);
//         }else{
//             let prodData = jsonData[query.id];
//             console.log(prodData, "ljv");
//             response.writeHead(200, {
//                 'conntent-Type': "application/json",
//                 'my-hero': "Hello Node Js"
//             });
//             let productHtmlArr = getProductHtml(product,prodData)
//             let productResponse = html.replace('{{%content%}}', productHtmlArr);
//             response.end(productResponse);
//         }
       
//     } else if (path.toLowerCase() == '/services') {
//         response.writeHead(200);
//         response.end(html.replace('{{%content%}}', "You are in service page "));

//     } else if (path.toLocaleLowerCase() == '/contact') {
//         response.writeHead(200);
//         response.end(html.replace('{{%content%}}', "You are in contact page "));

//     }else {
//         response.writeHead(404);
//         response.end(html.replace('{{%content%}}', "Error 404 : Page not found "));

//     }
   
// })

const server = http.createServer();
server.on('request', (request, response) => {
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
        response.writeHead(200, {
            'conntent-Type': "text/html",
            'my-hero': "Hello Node Js"
        });
        let productHtmlArr = jsonData.map((prod)=>{
            return getProductHtml(product,prod);
        })
        let productResponse = html.replace('{{%content%}}', productHtmlArr.join(','));
        response.end(productResponse);

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
});

server.listen(8086, '127.0.0.1',() => {
    console.log("Server has started ");
});

let myEmittter = new events.EventEmitter();
console.log(myEmittter, ' myEmittter ');

myEmittter.on('userCreated', ()=>{
    console.log("New user has been created");
})
myEmittter.on('userCreated', ()=>{
    console.log("Now time to delete that user ");
})
myEmittter.on('deleteUser', ()=>{
    console.log("Relax, that user has been deleted ");
})

// myEmittter.emit('userCreated');
// myEmittter.emit('deleteUser');

const user = require('../Modules/user.js');
console.log(user, ' user');

let newEmitter = new user();
console.log(newEmitter, ' newEmitter ');
newEmitter.on('displayUser', (id, nm)=>{
    console.log(`Fetched data of user ${nm} with id is ${id} thank you`);
})
newEmitter.on('updateUser', (id, nm)=>{
    console.log(`Updated data of user ${nm} with id is ${id} thank you`);
})
newEmitter.emit('displayUser', 101, 'Abhi');
newEmitter.emit('updateUser', 101, 'Sandeep');