const db = require('../models/db');

exports.getReservationsForRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;

    try {
        const [reservations] = await db.query(
            `
            SELECT 
                r.reservation_id, 
                r.reservation_start, 
                r.reservation_end, 
                r.customer_name, 
                r.customer_email, 
                u.user_id,
                t.table_id, 
                t.seats, 
                t.description,
                res.name AS restaurant_name
            FROM Reservation r
            INNER JOIN RestaurantTable t ON r.table_id = t.table_id
            INNER JOIN Restaurant res ON t.restaurant_id = res.restaurant_id
            INNER JOIN User u ON r.user_id = u.user_id
            WHERE t.restaurant_id = ?
            ORDER BY r.reservation_start ASC
            `,
            [restaurantId]
        );

        res.status(200).json(reservations);
    } catch (error) {
        console.error("Błąd podczas pobierania rezerwacji:", error);
        res.status(500).json({ error: "Błąd serwera podczas pobierania rezerwacji." });
    }
};



exports.getReservationsForRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const [reservations] = await db.query(
            `
            SELECT 
                r.reservation_id, 
                r.reservation_start, 
                r.reservation_end, 
                r.customer_name, 
                r.customer_email, 
                u.user_id,
                t.table_id, 
                t.seats, 
                t.description,
                res.name AS restaurant_name
            FROM Reservation r
            INNER JOIN RestaurantTable t ON r.table_id = t.table_id
            INNER JOIN Restaurant res ON t.restaurant_id = res.restaurant_id
            INNER JOIN User u ON r.user_id = u.user_id
            WHERE t.restaurant_id = ?
            ORDER BY r.reservation_start ASC
            LIMIT ? OFFSET ?
            `,
            [restaurantId, limit, offset]
        );

        const [totalCount] = await db.query(
            `
            SELECT COUNT(*) AS count
            FROM Reservation r
            INNER JOIN RestaurantTable t ON r.table_id = t.table_id
            WHERE t.restaurant_id = ?
            `,
            [restaurantId]
        );

        const totalReservations = totalCount[0].count;
        const totalPages = Math.ceil(totalReservations / limit);

        res.status(200).json({
            reservations,
            pagination: {
                page,
                totalPages,
                totalReservations
            }
        });
    } catch (error) {
        console.error("Błąd podczas pobierania rezerwacji:", error);
        res.status(500).json({ error: "Błąd serwera podczas pobierania rezerwacji." });
    }
};


exports.getReservationsForUser = async (req, res) => {
    const { userId } = req.params;
    console.log("userId", userId);

    try {
        const [results] = await db.query(
            `
            SELECT
                r.reservation_id,
                r.reservation_start,
                r.reservation_end,
                r.customer_name,
                r.customer_email,
                u.user_id,
                t.table_id,
                t.seats,
                t.description,
                res.name AS restaurant_name
            FROM Reservation r
            INNER JOIN RestaurantTable t ON r.table_id = t.table_id
            INNER JOIN Restaurant res ON t.restaurant_id = res.restaurant_id
            INNER JOIN User u ON r.user_id = u.user_id
            WHERE r.user_id = ? 
            ORDER BY r.reservation_start ASC
            `,
            [userId]
        );

        if (results.length === 0) {
            return res.status(404).json({ error: "Nie znaleziono rezerwacji dla tego użytkownika." });
        }
        console.log("Rezerwacje:", results);
        res.status(200).json(results);
    } catch (error) {
        console.error("Błąd podczas pobierania rezerwacji:", error);
        res.status(500).json({ error: "Błąd serwera podczas pobierania rezerwacji." });
    }
};




exports.getReservationById = async (req, res) => {
    const { reservationId } = req.params;

    try {
        const [reservation] = await db.query(
            `
            SELECT r.reservation_id, r.reservation_start, r.reservation_end, r.customer_name, r.user_id, 
                   r.customer_email, t.table_id, t.seats, t.description
            FROM Reservation r
            INNER JOIN RestaurantTable t ON r.table_id = t.table_id
            WHERE r.reservation_id = ?
            `,
            [reservationId]
        );

        if (reservation.length === 0) {
            return res.status(404).json({ error: "Nie znaleziono rezerwacji o podanym ID." });
        }

        res.status(200).json(reservation[0]);
    } catch (error) {
        console.error("Błąd podczas pobierania rezerwacji:", error);
        res.status(500).json({ error: "Błąd serwera podczas pobierania rezerwacji." });
    }
}


exports.addReservation = async (req, res) => {
    const { reservation_start, reservation_end, customer_name, customer_email, table_id, user_id } = req.body;

    if (!reservation_start || !reservation_end || !customer_name || !customer_email || !table_id) {
        return res.status(400).json({ error: "Wszystkie wymagane pola muszą być wypełnione." });
    }

    try {
        const [conflicts] = await db.query(
            `
            SELECT COUNT(*) AS conflictCount 
            FROM Reservation 
            WHERE table_id = ? AND (
                (reservation_start <= ? AND reservation_end > ?) OR
                (reservation_start < ? AND reservation_end >= ?)
            )
            `,
            [table_id, reservation_end, reservation_start, reservation_end, reservation_start]
        );

        if (conflicts[0].conflictCount > 0) {
            return res.status(409).json({ error: "Wybrany stolik jest zajęty w podanym terminie." });
        }

        await db.query(
            `
            INSERT INTO Reservation (reservation_start, reservation_end, customer_name, customer_email, table_id, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [reservation_start, reservation_end, customer_name, customer_email, table_id, user_id || null]
        );

        res.status(201).json({ message: "Rezerwacja została pomyślnie dodana." });
    } catch (error) {
        console.error("Błąd podczas dodawania rezerwacji:", error);
        res.status(500).json({ error: "Błąd serwera podczas dodawania rezerwacji." });
    }
};

exports.updateReservation = async (req, res) => {
    const { reservationId } = req.params;
    const { reservation_start, reservation_end, customer_name, customer_email, table_id } = req.body;

    if (!reservation_start || !reservation_end || !customer_name || !customer_email || !table_id) {
        return res.status(400).json({ error: "Wszystkie wymagane pola muszą być wypełnione." });
    }

    try {
        const [conflicts] = await db.query(
            `
            SELECT COUNT(*) AS conflictCount 
            FROM Reservation 
            WHERE table_id = ? AND reservation_id != ? AND (
                (reservation_start <= ? AND reservation_end > ?) OR
                (reservation_start < ? AND reservation_end >= ?)
            )
            `,
            [table_id, reservationId, reservation_end, reservation_start, reservation_end, reservation_start]
        );

        if (conflicts[0].conflictCount > 0) {
            return res.status(409).json({ error: "Wybrany stolik jest zajęty w podanym terminie." });
        }

        await db.query(
            `
            UPDATE Reservation 
            SET reservation_start = ?, reservation_end = ?, customer_name = ?, customer_email = ?, table_id = ?
            WHERE reservation_id = ?
            `,
            [reservation_start, reservation_end, customer_name, customer_email, table_id, reservationId]
        );

        res.status(200).json({ message: "Rezerwacja została zaktualizowana." });
    } catch (error) {
        console.error("Błąd podczas aktualizacji rezerwacji:", error);
        res.status(500).json({ error: "Błąd serwera podczas aktualizacji rezerwacji." });
    }
};

exports.deleteReservation = async (req, res) => {
    const { reservationId } = req.params;

    try {
        const [result] = await db.query(
            `
            DELETE FROM Reservation 
            WHERE reservation_id = ?
            `,
            [reservationId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Nie znaleziono rezerwacji o podanym ID." });
        }

        res.status(200).json({ message: "Rezerwacja została usunięta." });
    } catch (error) {
        console.error("Błąd podczas usuwania rezerwacji:", error);
        res.status(500).json({ error: "Błąd serwera podczas usuwania rezerwacji." });
    }
};
