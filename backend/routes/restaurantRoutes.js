const express = require('express');
const router = express.Router();
const { getRestaurants, getRestaurant, addRestaurant, updateRestaurant, deleteRestaurant} = require('../controllers/restaurantController');

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', addRestaurant);
router.put('/', updateRestaurant);
router.delete('/', deleteRestaurant);

module.exports = router;
