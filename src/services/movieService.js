import Movie from "../models/Movie.js";

export default {
    getAll(filter) {
        return Movie.find();
    },
    getOne(movieId) {
        return Movie.find({ _id: movieId });
    },
    create(movieData) {
        const movie = new Movie(movieData);

        return movie.save();
    }
}