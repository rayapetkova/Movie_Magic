import { model, Schema } from "mongoose";

import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'Email already in use.'],
        minLength: [10, 'Email must be at least 10 characters long.'],
        match: [/@[a-zA-z]+\.[a-zA-Z]+$/, 'Email is not in valid format.']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters long.'],
        match: [/^[a-zA-z0-9]+$/, 'Password must contain only letters and digits.']
    },
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(12);

    this.password = await bcrypt.hash(this.password, salt);
})

const User = model('User', userSchema);

export default User;