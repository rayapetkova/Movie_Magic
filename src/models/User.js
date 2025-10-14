import { model, Schema } from "mongoose";

import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(12);

    this.password = await bcrypt.hash(this.password, salt);
})

const User = model('User', userSchema);

export default User;