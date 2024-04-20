const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./apiCreation');
console.log(app.get('env'));
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB Connection Successful');
}).catch((err)=>{
    console.log("Some Error has occured");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server has statrted ");
});
