// import { log } from 'console';
const { count, log } = require('console');
const myModule = require('./Modules/customModule.js');
const voucherRouter = require('./Routes/voucherRoutes.js');
const moviesRouter = require('./Routes/moviesRoutes.js')
const { json } = require('body-parser');
const exp = require('constants');
const express = myModule.express();
const fs = myModule.fs();
const url = myModule.url();
const morgan = myModule.morgan();
const app = express();
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    app.use(express.static('./Public'));
}
const logger = (req, res, next) =>{
    console.log("Custome Middelware called ....");
    next();
};

app.use(logger);
app.use('/vouchers',voucherRouter);
app.use('/movies',moviesRouter);

module.exports = app;
