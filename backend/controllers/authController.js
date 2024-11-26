const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');

const SECRET_KEY = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO User (username, email, password, role) VALUES (?, ?, ?, 1)', [username, email, hashedPassword]);
        res.status(201).json({ message: 'Zarejestrowano użytkownika' });

    } catch (error) {
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

        const token = jwt.sign({ id: user.user_id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
}