const { status } = require('express/lib/response');
const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../Utils/ApiFeatures');
const { query } = require('express');

exports.paramMiddelware = (req, res, next, value) => {
};
exports.getHighestRatedMovies = (req, res, next) => {
    console.log(' getHighestRatedMovies ');
    req.query.sort = '-rating';
    req.query.limit = '5';
    next();
};
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.NewmovieSchema.find();
        res.status(201).json({
            status: " Sucees",
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
}

exports.getAllMoviesByFilter = async (req, res) => {
    try {
        console.log(req.query, " query ");
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|eq)\b/g, (match) => { return `$${match}` });
        queryStr = JSON.parse(queryStr);
        const movies = await Movie.NewmovieSchema.find(queryStr);

        // const movies = await Movie.find()
        //                 .where('name')
        //                 .equals(req.query.name)
        //                 .where('rating')
        //                 .gte(req.query.rating)
        //                 .where('id')
        //                 .lt(req.query.id)

        res.status(201).json({
            status: " Sucees",
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
}

exports.getAllMoviesSortedByClass = async (req, res) => {
    try {
        const features = new ApiFeatures(Movie.NewmovieSchema.find(), req.query, Movie.movieSchema101).filter().sort().selectedFields().paginate();
        const movies = await features.query;
       
        // let movieModelFields = Movie.movieSchema101.obj;
        // let queryObj = { ...req.query }
        // let queryObjFields = Object.keys(queryObj);
        // queryObjFields.forEach((field) => {
        //     movieModelFields[field] ? null : delete queryObj[field];
        // })
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lt|lte|eq)\b/g, (match) => { return `$${match}` });
        // queryStr = JSON.parse(queryStr);
        // let resultQueryObj = Movie.NewmovieSchema.find(queryStr);

        // console.log(req.query, " req.query ");
        // //Sort data
        // if (req.query.sort) {
        //     let sortQuery = req.query.sort.split(',').join(' ');
        //     resultQueryObj = resultQueryObj.sort(sortQuery);
        //     console.log(resultQueryObj, 'resultQueryObj');
        // } else {
        //     resultQueryObj = resultQueryObj.sort('createdAt');
        // }
        // //Select fields
        // if (req.query.fields) {
        //     let selectFields = req.query.fields.split(',').join(' ');
        //     resultQueryObj = resultQueryObj.select(selectFields);
        //     console.log(resultQueryObj, 'resultQueryObj');
        // } else {
        //     resultQueryObj = resultQueryObj.select('-__v');
        // }

        // //Pagination and limit
        // let page = req.query.page || 1;
        // let limit = req.query.limit || 10;
        // let skip = (page-1) * limit;
        // resultQueryObj = resultQueryObj.skip(skip).limit(limit);
        
        // if (req.query.page) {
        //     const numMovies = await Movie.NewmovieSchema.countDocuments();
        //     if (skip >= numMovies) throw new Error('This page does not exist');
        // } 

        // const movies = await resultQueryObj;

        res.status(201).json({
            status: " Sucees",
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
}

exports.getAllMoviesSorted = async (req, res) => {
    try {
        // const features = new ApiFeatures(Movie.NewmovieSchema.find(), req.query, Movie.movieSchema101).filter().sort().selectedFields().paginate();
        // const movies = await features.query;
       
        let movieModelFields = Movie.movieSchema101.obj;
        let queryObj = { ...req.query }
        let queryObjFields = Object.keys(queryObj);
        queryObjFields.forEach((field) => {
            movieModelFields[field] ? null : delete queryObj[field];
        })
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|eq)\b/g, (match) => { return `$${match}` });
        queryStr = JSON.parse(queryStr);
        let resultQueryObj = Movie.NewmovieSchema.find(queryStr);

        console.log(req.query, " req.query ");
        //Sort data
        if (req.query.sort) {
            let sortQuery = req.query.sort.split(',').join(' ');
            resultQueryObj = resultQueryObj.sort(sortQuery);
            console.log(resultQueryObj, 'resultQueryObj');
        } else {
            resultQueryObj = resultQueryObj.sort('createdAt');
        }
        //Select fields
        if (req.query.fields) {
            let selectFields = req.query.fields.split(',').join(' ');
            resultQueryObj = resultQueryObj.select(selectFields);
            console.log(resultQueryObj, 'resultQueryObj');
        } else {
            resultQueryObj = resultQueryObj.select('-__v');
        }

        //Pagination and limit
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        let skip = (page-1) * limit;
        resultQueryObj = resultQueryObj.skip(skip).limit(limit);
        
        if (req.query.page) {
            const numMovies = await Movie.NewmovieSchema.countDocuments();
            if (skip >= numMovies) throw new Error('This page does not exist');
        } 

        const movies = await resultQueryObj;

        res.status(201).json({
            status: " Sucees",
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
}

exports.getMovie = async (req, res) => {
    try {
        // const movies = await Movie.findById(req.params.id);
        const movies = await Movie.NewmovieSchema.find({ _id: req.params.id });
        res.status(201).json({
            status: " Sucees",
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
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

    try {
        const movie = await Movie.NewmovieSchema.create(req.body);
        res.status(201).json({
            status: " Sucees",
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        })
    }
};

exports.updateMovie = async (req, res) => {
    try {
        // const movies = await Movie.find({_id: req.params.id});
        const movies = await Movie.NewmovieSchema.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(201).json({
            status: " Sucees",
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
}

exports.updateMovie1 = (req, res) => {
};

exports.deleteMovie = async (req, res) => {
    try {
        // const movies = await Movie.find({_id: req.params.id});
        const movies = await Movie.NewmovieSchema.findByIdAndDelete(req.params.id);
        console.log(movies, ' movies ');
        res.status(204).json({
            status: " Sucees",
            data: null,
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
}; 