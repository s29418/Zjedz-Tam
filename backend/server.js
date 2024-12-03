require('dotenv').config();
const express = require('express');
const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
