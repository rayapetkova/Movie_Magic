import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', isAuth, (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    movieService.create(movieData, userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    const movieDetails = await movieService.getOne(movieId);

    let isCreator = false;
    if (req.user) {
        isCreator = movieDetails.creator == req.user.id;
    }

    res.render('movies/details', { movieDetails, isCreator });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movieDetails = await movieService.getOne(movieId);
    const casts = await castService.getAll({ excludes: movieDetails.casts });

    res.render('casts/attach', { movieDetails, casts });
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    let movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter });
});

export default movieController;