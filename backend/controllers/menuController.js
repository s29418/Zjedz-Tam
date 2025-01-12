const db = require('../models/db');

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

exports.deleteMenuCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const [result] = await db.query(
            'DELETE FROM MenuCategory WHERE id = ?',
            [categoryId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Kategoria nie została znaleziona" });
        }

        res.status(200).json({ message: "Kategoria usunięta" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

exports.updateMenuCategory = async (req, res) => {
    try {
        const { categoryId, newName } = req.body;
        if (!newName) return res.status(400).json({ error: "Brak nowej nazwy kategorii" });

        const [result] = await db.query(
            'UPDATE MenuCategory SET name = ? WHERE id = ?',
            [newName, categoryId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Kategoria nie została znaleziona" });
        }

        res.status(200).json({ message: "Kategoria zmieniona" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};




exports.getItemsByCategory = async (req, res) => {
    try {
        const menucategoryId = req.params.id;
        const [rows] = await db.query(
            'SELECT * FROM MenuItem WHERE menucategory_id = ?',
            [menucategoryId]
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.getItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const [rows] = await db.query(
            'SELECT * FROM MenuItem WHERE id = ?',
            [itemId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Pozycja nie znaleziona" });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}

exports.addMenuItem = async (req, res) => {
    try {
        const { category_id, name, description, price } = req.body;
        if (!category_id || !name || !price) {
            return res.status(400).json({ error: "Brak wymaganych danych" });
        }

        const [result] = await db.query(
            'INSERT INTO MenuItem (menucategory_id, name, description, price) VALUES (?, ?, ?, ?)',
            [category_id, name, description || null, price]
        );
        res.status(201).json({ message: "Pozycja dodana", itemId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.updateMenuItem = async (req, res) => {
    try {
        const { category_id, name, description, price } = req.body;
        const itemId = req.params.id;

        if (!name || !price || !category_id) {
            return res.status(400).json({ error: "Brak wymaganych danych" });
        }

        await db.query(
            'UPDATE MenuItem SET menucategory_id = ?, name = ?, description = ?, price = ? WHERE id = ?',
            [ category_id, name, description, price, itemId]
        );
        res.status(200).json({ message: "Pozycja edytowana" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        await db.query(
            'DELETE FROM MenuItem WHERE id = ?',
            [itemId]
        );
        res.status(200).json({ message: "Pozycja usunięta" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

