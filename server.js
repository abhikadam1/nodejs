const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./apiCreation');
console.log(app.get('env'), " Mode ");
mongoose.connect(process.env.CONN_STR, {
    // useNewUrlParser: true
}).then((conn) => {
    console.log('DB Connection Successful');
}).catch((err)=>{
    console.log("Some Error has occured");
});

const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
