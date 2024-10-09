const { status } = require('express/lib/response');
const Movie = require('./../Models/movieModel');
const ApiFeatures = require('./../Utils/ApiFeatures');
const CustomError = require('./../Utils/CustomError');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const { query } = require('express');



exports.paramMiddelware = (req, res, next, value) => {
};
exports.getHighestRatedMovies = (req, res, next) => {
    console.log(' getHighestRatedMovies ');
    req.query.sort = '-rating';
    req.query.limit = '5';
    next();
};
exports.getAllMovies = async (req, res, next) => {
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
        // res.status(404).json({
        //     status: "Fail",
        //     message: err.message
        // })
        const error = new CustomError(err.message, 404);
        next(error);
    }
}

exports.getAllMoviesByFilter = async (req, res, next) => {
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

exports.getAllMoviesSortedByClass = async (req, res, next) => {
    try {
        console.log('kuhjbjhbj');

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
        // res.status(404).json({
        //     status: "Fail",
        //     message: err.message
        // });

        const error = new CustomError(err.message, 404);
        next(error);
    }
}

exports.getAllMoviesSorted = async (req, res, next) => {
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
        let skip = (page - 1) * limit;
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

exports.getMovie = asyncErrorHandler(async (req, res, next) => {
    // const movies = await Movie.findById(req.params.id);
    // const movies = await Movie.NewmovieSchema.find({ _id: req.params.id });
    const movies = await Movie.NewmovieSchema.findById(req.params.id);
    console.log(movies, ' movies ');
    
    if(!movies){
        const error = new CustomError(`Did not find any movie this id ${req.params.id}`);
        return next(error);
    }
    res.status(201).json({
        status: " Sucees",
        length: movies.length,
        data: {
            movies
        }
    })
});

exports.createMovie = asyncErrorHandler(async (req, res, next) => {
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

    // try {
    const movie = await Movie.NewmovieSchema.create(req.body);
    res.status(201).json({
        status: " Sucees",
        data: {
            movie
        }
    })
    // } catch (err) {
    //     res.status(404).json({
    //         status: "Fail",
    //         message: err.message
    //     })
    // }
});

exports.updateMovie = async (req, res, next) => {
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

exports.updateMovie1 = (req, res, next) => {
};

exports.deleteMovie = async (req, res, next) => {
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

exports.getMoviesStats = async (req, res, next) => {
    try {
        console.log(" changes ");
        const stats = await Movie.NewmovieSchema.aggregate([
            { $match: { rating: { $eq: 1 } } },
            {
                $group: {
                    _id: "$name",
                    avgPrice: { $avg: "$price" },
                    avgRating: { $avg: "$rating" },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" },
                    sum: { $sum: "$price" },
                    totalCount: { $sum: 1 },
                }
            },
            { $sort: { minPrice: -1 } },
            { $match: { minPrice: { $gte: 100 } } },
        ]);

        res.status(200).json({
            status: " Sucees",
            count: stats.length,
            data: stats,
        })

    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err.message
        });
    }
};
exports.getDataByUnwind = asyncErrorHandler(async (req, res, next) => {
    console.log(" changes ");
    const movies = await Movie.NewmovieSchema.aggregate([
        { $unwind: '$colorsAvailable' },
        {
            $group: {
                _id: "$colorsAvailable",
                movieCount: { $sum: 1 },
                movie: { $push: '$name' },
                colors: {
                    $addToSet: "$brand"
                },
            },
        },
        { $addFields: { colorsNew: "$_id" } },
        { $project: { _id: 0 } },
        { $sort: { movieCount: -1 } },
    ]);

    res.status(200).json({
        status: " Sucees",
        count: movies.length,
        data: { movies },
    })
}); 