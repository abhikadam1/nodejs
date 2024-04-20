const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, 'Name field is required'],
        unique : [true, 'Name field is Unique'],
    },
    description : {
        type : String,
        default : "New Description" ,
    },
    duration : {
        type : Number,
        required : [true, 'Name field is required'],
    },
    rating : {
        type : Number,
        default : 1.0,
    },
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
