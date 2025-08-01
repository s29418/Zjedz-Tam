const db = require('../models/db');

exports.getTablesForRestaurant = async (req, res) => {
    try {
        // const restaurantId = req.params.id;
        const restaurantId = req.query.restaurant_id;
        const [rows] = await db.query('SELECT * FROM Restauranttable WHERE restaurant_id = ?', [restaurantId]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera' });
    }
};

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
};

exports.addTable = async (req, res) => {
    try{
        const restaurantId = req.query.restaurant_id;
        const { seats, description } = req.body;
        await db.query('INSERT INTO RestaurantTable (seats, description, restaurant_id) VALUES (?, ?, ?)', [seats, description, restaurantId]);
        res.status(201).json({ message: 'Dodano stolik' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};

exports.updateTable = async (req, res) => {
    try{
        const tableId = req.params.id;
        const { seats, description } = req.body;
        await db.query('UPDATE Restauranttable SET seats = ?, description = ? WHERE table_id = ?', [seats, description, tableId]);
        res.status(204).json({ message: 'Zaktualizowano informacje na temat stolika' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
};

exports.deleteTable = async (req, res) => {
    try{
        const tableId = req.params.id;
        await db.query('DELETE FROM Restauranttable WHERE table_id = ?', [tableId]);
        res.status(204).json({ message: 'Usunięto stolik z restauracji' });
    } catch (error) {
        res.status(500).json({ error: 'Błąd serwera.'});
    }
}