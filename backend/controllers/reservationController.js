const db = require('../models/db');

exports.reserveATable = async (req,res) => {
    try{
        const restaurantId = req.params.id;
        // const { userId }



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Błąd serwera' });
    }
}