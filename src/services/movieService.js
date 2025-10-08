import Movie from "../models/Movie.js";

export default {
    getAll(filter) {
        console.log(Movie.find());
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