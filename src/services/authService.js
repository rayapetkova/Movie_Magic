import User from "../models/User.js"

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
    register(userData) {
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email: email });
        const validatePassword = await bcrypt.compare(password, user.password);

        if (!user || !validatePassword) {
            throw new Error('Invalid user or password!');
        }

        const payload = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2h'});

        return token;
    }
}