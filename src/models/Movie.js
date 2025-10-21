import { Schema, Types, model } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        minLength: [5, 'Title must be at least 5 characters long.'],
        match: [/^[a-zA-z0-9 ]+$/, 'Title should consist of only letters, digits and whitespaces.']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['tv-show', 'animation', 'movie', 'documentary', 'short-film'],
            message: 'Category invalid'
        }
    },
    genre: {
        type: String,
        required: [true, 'Genre is required.'],
        minLength: [5, 'Genre must be at least 5 chracters long.'],
        match: [/^[a-zA-z0-9 ]+$/, 'Genre should consist of only letters, digits and whitespaces.']
    },
    director: {
        type: String,
        required: [true, 'Director is required.'],
        minLength: [5, 'Director must be at least 5 characters long.'],
        match: [/^[a-zA-z0-9 ]+$/, 'Director should consist of only letters, digits and whitespaces.']
    },
    year: {
        type: Number,
        required: [true, 'Year is required.'],
        min: [1990, 'Year cannot be less than 1990.'],
        max: [2024, 'Year cannot be greater than 2024.']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required.'],
        match: [/^https?:\/\//, 'Image URL has invalid format.']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required.'],
        min: [1, 'Rating cannot be less than 1.'],
        max: [5, 'Rating cannot be greater than 5.']
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        minLength: [20, 'Description must be at least 20 characters long.'],
        match: [/^[a-zA-z0-9 ]+$/, 'Description should consist of only letters, digits and whitespaces.']
    },
    casts: [{
        type: Types.ObjectId,
        ref: ' Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, "Creator is required!"]
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;