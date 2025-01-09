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


exports.verifyAdminOrRestaurantAdmin = (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.status(403).json({ error: 'Brak dostępu' });
    }

    if (user.role === 2) {
        return next();
    }

    const restaurantId = req.params.id || req.body.restaurant_id;
    if (!restaurantId) {
        return res.status(400).json({ error: 'Brak ID restauracji' });
    }

    const isRestaurantAdmin = user.restaurantRoles.some(role =>
        role.restaurant_id === parseInt(restaurantId) &&
        role.RestaurantUserRoles_id === 2
    );

    if (isRestaurantAdmin) {
        return next();
    }

    return res.status(403).json({ error: 'Brak odpowiednich uprawnień' });
};
