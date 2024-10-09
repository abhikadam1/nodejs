// import { log } from 'console';
const { count, log } = require('console');
const myModule = require('./Modules/customModule.js');
const voucherRouter = require('./Routes/voucherRoutes.js');
const moviesRouter = require('./Routes/moviesRoutes.js')
const CustomError = require('./Utils/CustomError.js');
const globalErrorHandler = require('./Controller/ErrorController.js');
const { json } = require('body-parser');
const exp = require('constants');
const express = myModule.express();
const fs = myModule.fs();
const url = myModule.url();
const morgan = myModule.morgan();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(express.static('./Public'));
}
const logger = (req, res, next) => {
    console.log("Custome Middelware called ....");
    next();
};

// app.use(logger);
app.use('/vouchers', voucherRouter);
app.use('/movies', moviesRouter);
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status : 'fail',
    //     message : 'Route not found',
    //     message1 : `Can't finf the ${req.originalUrl} on the server.`,
    // })
    // return 
    console.log( 'all ');
    

    // const error = new CustomError(`Can't find ${req.originalUrl} on the server`, 40525)
    // error.status = 'fail'
    // error.statusCode = 404;
    
    const error = new CustomError(`Can't find ${req.originalUrl} on the server`, 406);
    // error.status = 'fail';
    // error.statusCode = 404;
    next(error);
});

// app.use((error, req, res, next)=>{
//     console.log(error, " ijsjrlonlf");
// })

app.use(globalErrorHandler);

module.exports = app;
