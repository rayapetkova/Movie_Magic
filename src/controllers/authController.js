import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('auth/register', { error: errorMessage, user: userData });
    }
});

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
})

authController.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).render('auth/login', { error: errorMessage, user: {email, password} })
    }
})

authController.get('/logout', isAuth, async (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
})

export default authController;