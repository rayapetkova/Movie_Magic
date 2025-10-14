import { Router } from "express";

const authController = Router();

authController.get('/', (req, res) => {
    res.send('working...');

    res.end();
});

export default authController;