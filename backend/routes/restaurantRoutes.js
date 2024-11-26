const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const { getRestaurants, getRestaurant, addRestaurant, updateRestaurant, deleteRestaurant} = require('../controllers/restaurantController');

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', addRestaurant);
router.put('/', updateRestaurant);
router.delete('/', verifyToken, verifyRole(3), deleteRestaurant);

module.exports = router;
