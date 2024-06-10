const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './config.env' });
// const app = require('./apiCreation');
const Movie = require('../../Models/movieModel');

mongoose.connect(process.env.CONN_STR, {
}).then((conn) => {
    console.log('DB Connection Successful');
}).catch((err)=>{
    console.log("Some Error has occured");
});


// Read Movie Data
const movie = JSON.parse(fs.readFileSync('./Template/data/jsonData.json', 'utf-8'));
console.log(movie, " movie ");
const deleteData = async() => {
     try{
       await Movie.deleteMany();
       console.log('Data deleted successfully');
     }catch(err){
        console.log(errmessage);
     }
}
const importData = async() => {
     try{
       await Movie.create(movie);
     }catch(err){
        console.log(err.message);
     }
}
console.log(process.argv);
if (process.argv[2] === "--import") {
    importData();
}else if (process.argv[2] === '--delete') {
    deleteData();
}
// deleteData();
// importData();