import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/movies/create', (req, res) => {
    res.render('create');
});

export default movieController;