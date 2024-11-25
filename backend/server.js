require('dotenv').config();
const express = require('express');
const restaurantRoutes = require('./routes/restaurantRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/restaurants', restaurantRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
