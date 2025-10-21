import User from "../models/User.js"
import bcrypt from "bcrypt";
import { generateAuthToken } from '../utils/tokenUtils.js'

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

        const token = generateAuthToken(user);

        return token;
    }
}