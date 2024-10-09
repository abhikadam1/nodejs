const express = require('express');
const movieRouter = express.Router();
const movieController = require('./../Controller/moviesController');

// movieRouter.param('id', movieController.paramMiddelware);
movieRouter.route('/highest-rated')
            // .get(movieController.getHighestRatedMovies, movieController.getAllMoviesSorted);
            .get(movieController.getHighestRatedMovies, movieController.getAllMoviesSortedByClass);

movieRouter.route('/useUnwindKey')
.get(movieController.getDataByUnwind);


movieRouter.route('/moviesStats')
    .get(movieController.getMoviesStats);

movieRouter.route('/')
    // .get(movieController.getAllMovies)
    .get(movieController.getAllMoviesSortedByClass)
    // .get(movieController.getAllMoviesSorted)
    .post(movieController.createMovie);

movieRouter.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .put(movieController.updateMovie1)
    .delete(movieController.deleteMovie);

module.exports = movieRouter;
