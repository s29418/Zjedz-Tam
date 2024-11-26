const db = require('../models/db');

exports.getRestaurants = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Restaurant');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.getRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.query('SELECT * FROM Restaurant WHERE restaurant_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Restauracja nie znaleziona' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.addRestaurant = async (req, res) => {
    try {
        const { name, address, city, phone_number, description } = req.body;
        await db.query('INSERT INTO Restaurant (name, address, city, phone_number, description) VALUES (?, ?, ?, ?, ?)', [name, address, city, phone_number, description]);
        res.status(201).json({ message: 'Dodano restaurację' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const { id, name, address, city, phone_number, description } = req.body;
        await db.query('UPDATE Restaurant SET name = ?, address = ?, city = ?, phone_number = ?, description = ? WHERE restaurant_id = ?', [name, address, city, phone_number, description, id]);
        res.status(204).json({ message: 'Zaktualizowano dane restauracji.' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const id = req.body;
        await db.query('DELETE FROM Restaurant WHERE restaurant_id = ?', [id]);
        res.status(204).json({ message: 'Usunięto restaurację.' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};