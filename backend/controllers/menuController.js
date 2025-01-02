const db = require('../models/db');

exports.addMenuCategory = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Brak nazwy kategorii" });

        const [result] = await db.query(
            'INSERT INTO MenuCategory (restaurant_id, name) VALUES (?, ?)',
            [restaurantId, name]
        );
        res.status(201).json({ message: "Dodano kategorię", categoryId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.addMenuItem = async (req, res) => {
    try {
        const { category_id, name, description, price } = req.body;
        if (!category_id || !name || !price) {
            return res.status(400).json({ error: "Brak wymaganych danych" });
        }

        const [result] = await db.query(
            'INSERT INTO MenuItem (category_id, name, description, price) VALUES (?, ?, ?, ?)',
            [category_id, name, description || null, price]
        );
        res.status(201).json({ message: "Pozycja dodana", itemId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.getMenuCategories = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const [rows] = await db.query(
            'SELECT * FROM MenuCategory WHERE restaurant_id = ?',
            [restaurantId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.getItemsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const [rows] = await db.query(
            'SELECT * FROM MenuItem WHERE category_id = ?',
            [categoryId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};
