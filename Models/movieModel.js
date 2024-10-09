const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, 'Name field is required'],
        unique : true,
        trim : true,
    },
    description : {
        type : String,
        default : "New Description" ,
        trim : true,
    },
    duration : {
        type : Number,
        required : [true, 'Name field is required'],
    },
    rating : {
        type : Number,
        default : 1.0,
    },
    actors : {
        type : [String],
        required : [true, "Actors is required field"],
    },
    creadtedAt : {
        type : Date,
        default : Date.now(),
    },
});



const newmovieSchema = new mongoose.Schema({
    id : {
        type : Number,
        // required : [true, 'Name field is required'],
    },
    name: {
        type : String,
        // required : [true, 'Name field is required'],
        // unique : true,
        trim : true,
    },
    description : {
        type : String,
        default : "New Description" ,
        trim : true,
    },
    brand : {
        type : String,
        default : "New Description" ,
        trim : true,
    },
    price : {
        type : Number,
        required : [true, 'price field is required'],
    },
    rating : {
        type : Number,
        default : 1.0,
    },
    specs : {
        type : {String},
        required : [true, "Actors is required field"],
    },
    colorsAvailable : {
        type : [String],
        required : [true, "colorsAvailable is required field"],
    },
    availability : {
        type : Boolean,
        required : [true, "availability is required field"],
    },
    creadtedAt : {
        type : Date,
        default : Date.now(),
    },
});

const Movie = mongoose.model('movie', movieSchema);
exports.NewmovieSchema = mongoose.model('newmovieSchema', newmovieSchema);
exports.movieSchema101 = newmovieSchema;
// module.exports = NewmovieSchema;
// module.exports = Movie;
