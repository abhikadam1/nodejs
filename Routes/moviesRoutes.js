const express = require('express');
const movieRouter = express.Router();
const movieController = require('./../Controller/moviesController');

// movieRouter.param('id', movieController.paramMiddelware);
console.log( " ojsdg ");
movieRouter.route('/')
    // .get(movieController.getAllMovies)
    // .get(movieController.getAllMoviesByFilter)
    .get(movieController.getAllMoviesSorted)
    .post(movieController.createMovie);

movieRouter.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .put(movieController.updateMovie1)
    .delete(movieController.deleteMovie);

module.exports = movieRouter;
