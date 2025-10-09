import Movie from "../models/Movie.js";

export default {
    getAll(filter) {
        return Movie.find();
    },
    getOne(movieId) {
        return Movie.findById(movieId);
    },
    create(movieData) {
        return Movie.create(movieData);
    }
}