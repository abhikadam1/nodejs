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

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
