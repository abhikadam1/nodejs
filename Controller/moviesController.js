const { status } = require('express/lib/response');
const Movie = require('./../Models/movieModel');

exports.paramMiddelware = (req, res, next, value) => {
};

exports.getAllMovies = async(req, res) => {
    try{
        const movies = await Movie.find();
        res.status(201).json({
            status : " Sucees",
            length : movies.length,
            data : {
                movies
            }
        })
    }catch(err){
        res.status(400).json({
            status : "Fail",
            message : err.message
        })
    }
}

exports.getMovie = async (req, res) => {
    try{
        // const movies = await Movie.findById(req.params.id);
        const movies = await Movie.find({_id: req.params.id});
        res.status(201).json({
            status : " Sucees",
            length : movies.length,
            data : {
                movies
            }
        })
    }catch(err){
        res.status(400).json({
            status : "Fail",
            message : err.message
        });
    }
};

exports.createMovie = async (req, res) => {
    // const testMovie = new Movie({
    //     name: 'Dream Girl',
    //     description: 'Dream Girl beautiful moive',
    //     duration: 122,
    //     rating: 4.3,
    // });

    // testMovie.save().then((doc) => {
    //     console.log(doc);
    // }).catch((err) => {
    //     console.log(err, " error occured");
    // });

    try{
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status : " Sucees",
            data : {
                movie
            }
        })
    }catch(err){
        res.status(400).json({
            status : "Fail",
            message : err.message
        })
    }
};

exports.updateMovie = async (req, res) => {
    try{
        // const movies = await Movie.find({_id: req.params.id});
        const movies = await Movie.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true});
        res.status(201).json({
            status : " Sucees",
            length : movies.length,
            data : {
                movies
            }
        })
    }catch(err){
        res.status(400).json({
            status : "Fail",
            message : err.message
        });
    }
}

exports.updateMovie1 = (req, res) => {
};

exports.deleteMovie = (req, res) => {
}; 