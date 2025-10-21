import User from "../models/User.js"
import bcrypt from "bcrypt";
import { generateAuthToken } from '../utils/tokenUtils.js'

export default {
    async register(userData) {
        const user = await User.create(userData);
        const token = generateAuthToken(user);

        return token
    },
    async login(email, password) {
        const user = await User.findOne({ email: email });
        const validatePassword = await bcrypt.compare(password, user.password);

        if (!user || !validatePassword) {
            throw new Error('Invalid user or password!');
        }

        const token = generateAuthToken(user);

        return token;
    }
}