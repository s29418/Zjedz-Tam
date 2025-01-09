const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole, verifyAdminOrRestaurantAdmin} = require('../middlewares/authMiddleware');
const {
    getRestaurants,
    getRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getAverageRating,
    getNumberOfReviews
} = require('../controllers/restaurantController');


router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.get('/:id/avRating', getAverageRating);
router.get('/:id/numberOfReviews', getNumberOfReviews);

router.post('/', verifyToken, verifyRole(2), addRestaurant);
router.put('/:id', verifyToken, verifyAdminOrRestaurantAdmin, updateRestaurant);
router.delete('/:id', verifyToken, verifyAdminOrRestaurantAdmin, deleteRestaurant);


module.exports = router;
