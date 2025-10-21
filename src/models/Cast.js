import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minLength: [5, 'Name must be at least 5 charcters long.'],
        match: [/^[a-zA-z0-9 ]+$/, 'Name should consist of only letters, digits and whitespaces.']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: [1, 'Age should be at least 1 year!'],
        max: [120, 'Age should be less than 120 years!']
    },
    born: {
        type: String,
        required: [true, 'Birth place is required!'],
        minLength: [10, 'Birth place must be at least 10 characters long.'],
        match: [/^[a-zA-z0-9 ]+$/, 'Birth place should consist of only letters, digits and whitespaces.']
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL is required!"],
        match: [/^https?:\/\//, 'Image URL has invalid format.']
    },
});

const Cast = model('Cast', castSchema);

export default Cast;