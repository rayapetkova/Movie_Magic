import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const movieData = req.body;

    movieService.create(movieData);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    const movieDetails = await movieService.getOne(movieId);

    res.render('details', { movieDetails });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    let movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

export default movieController;