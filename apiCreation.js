// import { log } from 'console';
const { count, log } = require('console');
const myModule = require('./Modules/customModule.js');
const voucherRouter = require('./Routes/voucherRoutes.js');
const moviesRouter = require('./Routes/moviesRoutes.js');
const commonRoutes = require('./Routes/commonRoutes.js');
const CustomError = require('./Utils/CustomError.js');
const globalErrorHandler = require('./Controller/ErrorController.js');
const { json } = require('body-parser');
const exp = require('constants');
const authRouter = require('./Routes/authRoutes.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./Middleware/AuthMiddleware.js');

const multer = require('multer');
const { redirect } = require('express/lib/response.js');
const asyncErrorHandler = require('./Utils/asyncErrorHandler.js')

const express = myModule.express();
const fs = myModule.fs();
const url = myModule.url();
const morgan = myModule.morgan();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    app.use(express.static('./Public'));
}
const logger = (req, res, next) => {
    console.log("Custome Middelware called ....");
    next();
};

app.set('view engine', 'ejs');
app.set('views', path.resolve('./View'));

// app.use(logger);
app.use('/vouchers', voucherRouter);
app.use('/movies', moviesRouter);
app.use('/user', authRouter);
app.use('/users', authMiddleware, commonRoutes);
app.use('/analytics', commonRoutes);
app.use('/ejs', commonRoutes);
app.use('/signupUser', commonRoutes);

// const upload = multer({ dest: "filesUpload/" });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage })

const cpUpload = upload.fields([{ name: 'demoFile', maxCount: 2 }, { name: 'gallery', maxCount: 8 }])

// app.post('/fileUplaod', upload.single('demoFile'), function (req, res, next) {
app.post('/fileUplaod', function (req, res, next) {
    // upload.array('demoFile', 2)(req, res, function (err) {
    cpUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.status(500).json({ error: `Unknown error: ${err.message}` });
        }
        // Everything went fine.
        console.log(req.body);
        console.log(req.files); // Note: req.files for multiple files

        return res.redirect('/ejs/fileview');
    });

    // console.log(req.body);
    // console.log(req.files); // Note: req.files for multiple files

    // return res.redirect('/ejs/fileview');
});


app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status : 'fail',
    //     message : 'Route not found',
    //     message1 : `Can't finf the ${req.originalUrl} on the server.`,
    // })
    // return 
    console.log('all ');


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
