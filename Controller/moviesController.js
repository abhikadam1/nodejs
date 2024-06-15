const { status } = require('express/lib/response');
const Movie = require('./../Models/movieModel');
const { query } = require('express');

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
        res.status(404).json({
            status : "Fail",
            message : err.message
        })
    }
}


exports.getAllMoviesByFilter = async(req, res) => {
    try{
        console.log(req.query,  " query ");
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|eq)\b/g, (match)=>{return `$${match}` });
        queryStr = JSON.parse(queryStr);
        const movies = await Movie.find(queryStr);

        // const movies = await Movie.find()
        //                 .where('name')
        //                 .equals(req.query.name)
        //                 .where('rating')
        //                 .gte(req.query.rating)
        //                 .where('id')
        //                 .lt(req.query.id)

        res.status(201).json({
            status : " Sucees",
            length : movies.length,
            data : {
                movies
            }
        })
    }catch(err){
        res.status(404).json({
            status : "Fail",
            message : err.message
        })
    }
}

exports.getAllMoviesSorted = async(req, res) => {
    try{
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|eq)\b/g, (match)=>{return `$${match}` });
        queryStr = JSON.parse(queryStr);
        console.log(queryStr, " oijohj ");
        let resultQueryObj = Movie.find(queryStr);
        //Sort data
        if(req.query.sort){
            let sortQuery = req.query.sort.split(',').join(' ');
            resultQueryObj = resultQueryObj.sort(sortQuery);
            console.log(resultQueryObj,'');
        }else{
            resultQueryObj = resultQueryObj.sort('createdAt');
        }
        
        const movies = await resultQueryObj; 

        res.status(201).json({
            status : " Sucees",
            length : movies.length,
            data : {
                movies
            }
        })
    }catch(err){
        res.status(404).json({
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
        res.status(404).json({
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
        res.status(404).json({
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
        res.status(404).json({
            status : "Fail",
            message : err.message
        });
    }
}

exports.updateMovie1 = (req, res) => {
};

exports.deleteMovie = async(req, res) => {
    try{
        // const movies = await Movie.find({_id: req.params.id});
        const movies = await Movie.findByIdAndDelete(req.params.id);
        console.log(movies, ' movies ');
        res.status(204).json({
            status : " Sucees",
            data : null,
        })
    }catch(err){
        res.status(404).json({
            status : "Fail",
            message : err.message
        });
    }
}; 