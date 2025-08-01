require('dotenv').config();
const express = require('express');
const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const restaurantRolesRoutes = require('./routes/restaurantRolesRoutes');
const tableRoutes = require('./routes/tableRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/roles', restaurantRolesRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/reservations', reservationRoutes);


app.listen(PORT);
