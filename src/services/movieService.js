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
    async getOne(movieId) {
        const movie = Movie.findById(movieId).populate('casts');
        
        return movie;
    },
    async create(movieData, userId) {
        const movie = await Movie.create({
            ...movieData,
            creator: userId
        });

        return movie;
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