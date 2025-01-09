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
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Restaurant WHERE restaurant_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Restauracja nie znaleziona' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.addRestaurant = async (req, res) => {
    try {
        const { name, address, city, phone_number, description, shortDescription, photo } = req.body;
        await db.query('INSERT INTO Restaurant (name, address, city, phone_number, description, short_description, image) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, address, city, phone_number, description, shortDescription, photo]);
        res.status(201).json({ message: 'Dodano restaurację' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};

exports.updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params
        const { name, address, city, phone_number, description, shortDescription, photo } = req.body;
        await db.query('UPDATE Restaurant SET name = ?, address = ?, city = ?, phone_number = ?, description = ?, short_description = ?, image = ? WHERE restaurant_id = ?', [name, address, city, phone_number, description, shortDescription, photo, id]);
        res.status(200).json({ message: 'Zaktualizowano dane restauracji.' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM Restaurant WHERE restaurant_id = ?', [id]);
        res.status(204).json({ message: 'Usunięto restaurację.' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const [rows] = await db.query('SELECT AVG(rating) AS av_rating FROM Review WHERE restaurant_id = ?', [restaurantId]);
        console.log(rows);
        const averageRating = rows[0].av_rating || 0;
        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.' });
    }
}

exports.getNumberOfReviews = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const [rows] = await db.query('SELECT COUNT(*) AS num_of_reviews FROM Review WHERE restaurant_id = ?', [restaurantId]);
        console.log(rows);
        const numberOfReviews = rows[0].num_of_reviews || 0;
        res.status(200).json({ numberOfReviews });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.' });
    }
}