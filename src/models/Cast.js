import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: [1, 'Age should be at least 1 year!'],
        max: [120, 'Age should be less than 120 years!']
    },
    born: {
        type: String,
        required: [true, "Name is required!"]
    },
    imageUrl: {
        type: String,
        required: [true, "Name is required!"]
    },
});

const Cast = model('Cast', castSchema);

export default Cast;