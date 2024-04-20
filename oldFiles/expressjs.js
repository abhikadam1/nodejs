const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.status(200).json({message : "API Created and Tested ", status : 200});
});

const port = 8080;
app.listen(port, ()=> {
    console.log("Server has statrted ");
});