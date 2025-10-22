import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import isMovieCreator from "../middlewares/movieMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const movieData = req.body;
    const userId = req.user.id;

    try {
        await movieService.create(movieData, userId);

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('movies/create', { error: errorMessage, movie: movieData });
    }
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

movieController.get('/:movieId/edit', isAuth, isMovieCreator, async (req, res) => {
    try {
        const movie = await movieService.getOne(req.params.movieId);

        res.render('movies/edit', { movie });
    } catch {
        return res.status(404).render('404', { error: "Movie not found!" });
    }
});

movieController.post('/:movieId/edit', isAuth, isMovieCreator, async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    try {
        await movieService.edit(movieId, movieData);

        return res.redirect(`/movies/${movieId}/details`);
    } catch {
        return res.status(404).render('404', { error: "Movie cannot be edited!" });
    }
});

movieController.get('/:movieId/delete', isAuth, isMovieCreator, async (req, res) => {
    const movieId = req.params.movieId;

    await movieService.delete(movieId);

    return res.redirect('/');
})

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    let movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter });
});

export default movieController;