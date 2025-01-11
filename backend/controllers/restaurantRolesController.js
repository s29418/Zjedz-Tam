const db = require('../models/db');

exports.getRoles = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT name FROM RestaurantUserRoles');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
}