const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const{
    addMenuCategory,
    addMenuItem,
    getMenuCategories,
    getItemsByCategory
} = require('../controllers/menuController');


router.post('/categories/:id', addMenuCategory);
router.post('/items', addMenuItem);
router.get('/categories/:id', getMenuCategories);
router.get('/items/:id', getItemsByCategory);

module.exports = router;