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
        const openingHours = JSON.stringify({"Sobota": "Zamknięte", "Wtorek": "Zamknięte", "Środa": "Zamknięte", "Piątek": "Zamknięte", "Czwartek": "Zamknięte", "Niedziela": "Zamknięte", "Poniedziałek": "Zamknięte"});
        await db.query('INSERT INTO Restaurant (name, address, city, phone_number, description, short_description, image, opening_hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [name, address, city, phone_number, description, shortDescription, photo, openingHours]);
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


exports.getAccessForRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const query = `
            SELECT 
                User.email,
                RestaurantUserRoles.name AS roleName,
                RestaurantUser.restaurant_user_id
            FROM 
                RestaurantUser
            JOIN User ON RestaurantUser.user_id = User.user_id
            JOIN RestaurantUserRoles ON RestaurantUser.RestaurantUserRoles_id = RestaurantUserRoles.id
            WHERE 
                RestaurantUser.restaurant_id = ?
        `;
        const [rows] = await db.query(query, [restaurantId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera.' });
    }
};


exports.grantAccess = async (req, res) => {
    try {
        const { email,  role } = req.body;
        const id = req.params.id;

        const userId = (await db.query('SELECT user_id FROM User WHERE email = ?', [email]))[0][0].user_id;

        const roleId = (await db.query('SELECT id FROM RestaurantUserRoles WHERE name = ?', [role]))[0][0].id;

        const query = `
            INSERT INTO RestaurantUser (user_id, restaurant_id, RestaurantUserRoles_id)
            VALUES (?, ?, ?)
        `;
        await db.query(query, [userId, id, roleId]);
        res.status(200).json({ message: 'Dostęp został przyznany.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera.' });
    }
};


exports.revokeAccess = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            DELETE FROM RestaurantUser
            WHERE restaurant_user_id = ?
        `;
        await db.query(query, [id]);
        res.status(200).json({ message: 'Dostęp został usunięty.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera.' });
    }
};

exports.updateOpeningHours = async (req, res) => {
    const id = req.params.id;
    const { opening_hours } = req.body;

    const validDays = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

    const isValid = validDays.every(day => opening_hours.hasOwnProperty(day)) &&
        Object.keys(opening_hours).length === validDays.length;
    if (!isValid) {
        return res.status(400).json({ error: "Nieprawidłowy format godzin otwarcia." });
    }
    try {
        await db.query('UPDATE Restaurant SET opening_hours = ? WHERE restaurant_id = ?', [
            JSON.stringify(opening_hours),
            id
        ]);

        res.status(200).json({ message: "Godziny otwarcia zaktualizowane." });
    } catch (error) {
        console.error("Błąd aktualizacji godzin otwarcia:", error);
        res.status(500).json({ error: "Błąd serwera." });
    }
};
