import Movie from "../models/Movie.js";

export default {
    getAll(filter) {
        let movies = Movie.find();

        if (filter.title) {
            movies = movies.find({
                title: { $regex: filter.title, $options: 'i' }
            });
        }

        if (filter.genre) {
            movies = movies.find({
                genre: { $regex: filter.genre, $options: 'i' }
            });
        }

        if (filter.year) {
            movies = movies.where('year').equals(filter.year);
        }

        return movies;
    },
    getOne(movieId) {
        return Movie.findById(movieId);
    },
    create(movieData) {
        return Movie.create(movieData);
    }
}