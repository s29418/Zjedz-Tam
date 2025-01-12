const express = require('express');
const router = express.Router();
const { verifyToken, verifyRole, verifyAdminOrRestaurantAdmin} = require('../middlewares/authMiddleware');
const { getTable, addTable, updateTable, deleteTable, getTablesForRestaurant} = require('../controllers/tableController');

router.get('/', getTablesForRestaurant);
router.get('/:id', getTable);

router.post('/', verifyToken, verifyAdminOrRestaurantAdmin, addTable);
router.put('/:id', verifyToken, verifyAdminOrRestaurantAdmin, updateTable);
router.delete('/:id', verifyToken, verifyAdminOrRestaurantAdmin, deleteTable);

module.exports = router;