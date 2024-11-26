const db = require('../models/db');

exports.getTables = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Restauranttable');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

exports.getTable = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.query('SELECT * FROM Restauranttable WHERE table_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nie znaleziono stolika' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}