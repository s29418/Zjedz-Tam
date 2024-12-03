const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const {
    getRestaurants,
    getRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurantController');


router.get('/', getRestaurants);
router.get('/:id', getRestaurant);


router.post('/', verifyToken, verifyRole(3), addRestaurant);
router.put('/:id', verifyToken, verifyRole(3), updateRestaurant);
router.delete('/:id', verifyToken, verifyRole(3), deleteRestaurant);


module.exports = router;
