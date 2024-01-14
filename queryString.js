const readLile = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url');
const { log } = require('console');

const server = http.createServer((req, res)=>{
    let path = req.url;
    let queryParam = url.parse(path, true);
    console.log(queryParam, ' queryParam ');
    res.end("Now do your work and let me do my work, understand!")
})

server.listen(8081, "127.0.0.2", ()=>{
    console.log('ser has started do your work ');
})