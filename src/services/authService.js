import User from "../models/User.js"
import bcrypt from "bcrypt";
import { generateAuthToken } from '../utils/tokenUtils.js'

export default {
    async register(userData) {
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            throw new Error('User already exists.');
        }

        if (userData.password !== userData.repeatPassword) {
            throw new Error("Passwords don't match.");
        }

        const user = await User.create(userData);
        const token = generateAuthToken(user);

        return token;
    },
    async login(email, password) {
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error('Invalid user or password!');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new Error('Invalid user or password!');
        }

        const token = generateAuthToken(user);

        return token;
    }
}