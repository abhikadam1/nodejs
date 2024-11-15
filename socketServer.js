const myModule = require("./Modules/customModule.js");
const path = require("path");

// socket io code
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const express = myModule.express();
const app = express();
const server = createServer(app);
const io = new Server(server);

// app.use(express.static(path.resolve("./Public")));
// app.use(express.static(path.join(__dirname, "Public")));

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "Public/socketIo.html"));
});

// handle socket io
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("user-msg", (msg) => {
    console.log(msg, " msg ");

    io.emit('msg', msg);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

// const urlSchema = require("./Models/commonModel");
// const express = myModule.express();
// const fs = myModule.fs();
// const url = myModule.url();
// const morgan = myModule.morgan();

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.sendFile(join(__dirname, 'socketIOView.ejs'));
//   });

// app.set('view engine', 'ejs');
// app.set('views', path.resolve('./View'));

// // app.use(logger);
// app.get('/', async(req, res, next) => {
//     // const allUrls = await urlSchema.find({});
//     // res.render('home', { allUrls });
//     res.render('socketIOView');
// });
// app.use('/vouchers', voucherRouter);
// app.use('/movies', moviesRouter);
// app.use('/user', authRouter);
// app.use('/users', authMiddleware, commonRoutes);
// app.use('/ejs', commonRoutes);
// app.use('/signupUser', commonRoutes);

// // const upload = multer({ dest: "filesUpload/" });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// })

// const upload = multer({ storage })

// const cpUpload = upload.fields([{ name: 'demoFile', maxCount: 2 }, { name: 'gallery', maxCount: 8 }])

// // app.post('/fileUplaod', upload.single('demoFile'), function (req, res, next) {
// app.post('/fileUplaod', function (req, res, next) {
//     // upload.array('demoFile', 2)(req, res, function (err) {
//     cpUpload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             // A Multer error occurred when uploading.
//             return res.status(400).json({ error: `Multer error: ${err.message}` });
//         } else if (err) {
//             // An unknown error occurred when uploading.
//             return res.status(500).json({ error: `Unknown error: ${err.message}` });
//         }
//         // Everything went fine.
//         console.log(req.body);
//         console.log(req.files); // Note: req.files for multiple files

//         return res.redirect('/ejs/fileview');
//     });

//     // console.log(req.body);
//     // console.log(req.files); // Note: req.files for multiple files

//     // return res.redirect('/ejs/fileview');
// });

// app.all('*', (req, res, next) => {
//     // res.status(404).json({
//     //     status : 'fail',
//     //     message : 'Route not found',
//     //     message1 : `Can't finf the ${req.originalUrl} on the server.`,
//     // })
//     // return
//     console.log('all ');

//     // const error = new CustomError(`Can't find ${req.originalUrl} on the server`, 40525)
//     // error.status = 'fail'
//     // error.statusCode = 404;

//     const error = new CustomError(`Can't find ${req.originalUrl} on the server`, 406);
//     // error.status = 'fail';
//     // error.statusCode = 404;
//     next(error);
// });

// // app.use((error, req, res, next)=>{
// //     console.log(error, " ijsjrlonlf");
// // })

// app.use(globalErrorHandler);

module.exports = app;
