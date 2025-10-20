import movieService from "../services/movieService.js";

export default async function isMovieCreator(req, res, next) {
    const movie = await movieService.getOne(req.params.movieId);

    if (!req.isAuthenticated) {
        return res.redirect('/auth/login');
    }

    const userId = req.user.id;

    if (!movie.creator.equals(userId)) {
        return res.status(401).render('404', { error: "Only creator can edit this movie!" })
    }

    next();
}