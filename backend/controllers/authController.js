const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');

const SECRET_KEY = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO User (name, email, password, userroles_id) VALUES (?, ?, ?, 1)', [username, email, hashedPassword]);
        res.status(201).json({ message: 'Zarejestrowano użytkownika' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await db.query('SELECT * FROM User WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Niepoprawny e-mail' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Niepoprawne hasło' });
        }

        const [restaurantRolesRows] = await db.query(
            `SELECT restaurant_id, RestaurantUserRoles_id
             FROM RestaurantUser
             WHERE user_id = ?`, [user.user_id]
        );

        const restaurantRoles = restaurantRolesRows.map(row => ({
            restaurant_id: row.restaurant_id,
            RestaurantUserRoles_id: row.RestaurantUserRoles_id,
        }));

        const token = jwt.sign({
            id: user.user_id,
            role: user.UserRoles_id,
            restaurantRoles,
        }, SECRET_KEY, { expiresIn: '1h' });

        // const token = jwt.sign({ id: user.user_id, role: user.UserRoles_id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token: token, role: user.UserRoles_id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

exports.verify = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[2];
    if (!token) {
        return res.status(401).json({ error: 'Brak tokena' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ user: decoded });
    } catch (err) {
        res.status(403).json({ error: 'Nieprawidłowy lub wygasły token' });
    }
};

exports.getUserProfile = (req, res) => {
    const { id, role } = req.user;
    res.status(200).json({ id, role });
};