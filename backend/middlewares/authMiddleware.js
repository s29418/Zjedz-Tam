const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Brak tokena' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Nieprawidłowy token' });
    }
};

exports.verifyRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ error: 'Brak dostępu' });
    }
    next();
}