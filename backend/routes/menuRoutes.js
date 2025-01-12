const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
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
router.post('/categories/:id', addMenuCategory);
router.put('/categories/edit', updateMenuCategory);
router.delete('/categories/:id', deleteMenuCategory);


router.get('/items/:id', getItemsByCategory);
router.get('/items/item/:id', getItem);
router.post('/items', addMenuItem);
router.put('/items/:id', updateMenuItem);
router.delete('/items/:id', deleteMenuItem);


module.exports = router;