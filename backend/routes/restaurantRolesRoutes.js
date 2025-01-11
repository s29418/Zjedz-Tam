const express = require('express');
const router = express.Router();
const { getRoles } = require('../controllers/restaurantRolesController');

router.get('/', getRoles);

module.exports = router;