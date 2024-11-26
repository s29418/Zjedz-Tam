const db = require('../models/db');

exports.getUsers = async (req, res) => {
    try{
        const [rows] = await db.query('SELECT * FROM User');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.query('SELECT * FROM User WHERE user_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({error: 'Nie znaleziono użytkownika'});
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({error: 'Błąd serwera'});
    }
}
