const express = require('express');
const router = express.Router();
const { getTable, addTable, updateTable, deleteTable, getTablesForRestaurant} = require('../controllers/tableController');

router.get('/', getTablesForRestaurant);
router.get('/:id', getTable);
router.post('/', addTable);
router.put('/:id', updateTable);
router.delete('/:id', deleteTable);

module.exports = router;