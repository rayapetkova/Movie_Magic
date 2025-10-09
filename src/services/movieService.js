import Movie from "../models/Movie.js";

export default {
    getAll(filter) {
        return Movie.find();
    },
    getOne(movieId) {
        return Movie.find({ _id: movieId });
    },
    create(movieData) {
        return Movie.create(movieData);
    }
}