import Movie from "../models/Movie.js";

export default {
    getAll(filter) {
        let movies = Movie.find();

        if (!filter) {
            return movies;
        }

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
        return Movie.findById(movieId).populate('casts');
    },
    create(movieData, userId) {
        return Movie.create({
            ...movieData,
            creator: userId
        });
    },
    async edit(movieId, movieData) {
        return await Movie.findByIdAndUpdate(movieId, movieData, { runValidators: true });
    },
    async delete(movieId) {
        return await Movie.findByIdAndDelete(movieId);
    },
    async attachCast(movieId, castId) {
        const movie = await Movie.findById(movieId);
        movie.casts.push(castId);

        return movie.save();
    }
}