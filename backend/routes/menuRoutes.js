const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdminOrRestaurantAdmin} = require('../middlewares/authMiddleware');

const{
    addMenuCategory,
    addMenuItem,
    getMenuCategories,
    getItemsByCategory,
    updateMenuCategory,
    deleteMenuCategory,
    updateMenuItem,
    deleteMenuItem,
    getItem
} = require('../controllers/menuController');


router.get('/categories/:id', getMenuCategories);
router.post('/categories/:id', verifyToken, verifyAdminOrRestaurantAdmin, addMenuCategory);
router.put('/categories/edit', verifyToken, verifyAdminOrRestaurantAdmin, updateMenuCategory);
router.delete('/categories/:id',verifyToken, verifyAdminOrRestaurantAdmin, deleteMenuCategory);


router.get('/items/:id', getItemsByCategory);
router.get('/items/item/:id', getItem);
router.post('/items', verifyToken, verifyAdminOrRestaurantAdmin, addMenuItem);
router.put('/items/:id', verifyToken, verifyAdminOrRestaurantAdmin, updateMenuItem);
router.delete('/items/:id', verifyToken, verifyAdminOrRestaurantAdmin, deleteMenuItem);


module.exports = router;