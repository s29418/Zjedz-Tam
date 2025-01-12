const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole, verifyAdminOrRestaurantAdmin} = require('../middlewares/authMiddleware');
const {
    getRestaurants,
    getRestaurant,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getAccessForRestaurant,
    revokeAccess,
    grantAccess,
    updateOpeningHours
} = require('../controllers/restaurantController');


router.get('/', getRestaurants);
router.get('/:id', getRestaurant);

router.get('/:id/access', getAccessForRestaurant, verifyAdminOrRestaurantAdmin, revokeAccess);
router.delete('/:id/access', verifyToken, verifyAdminOrRestaurantAdmin, revokeAccess);
router.post('/:id/access', verifyToken, verifyAdminOrRestaurantAdmin, grantAccess);

router.post('/', verifyToken, verifyRole(2), addRestaurant);
router.put('/:id', verifyToken, verifyAdminOrRestaurantAdmin, updateRestaurant);
router.delete('/:id', verifyToken, verifyAdminOrRestaurantAdmin, deleteRestaurant);

router.put('/:id/opening-hours', updateOpeningHours);


module.exports = router;
