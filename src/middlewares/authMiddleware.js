import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    const token = req.cookies['auth'];

    console.log('working');

    if (!token) {
        console.log('no token');
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('valid user');

        next();
    } catch {
        console.log('invalid user');
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}