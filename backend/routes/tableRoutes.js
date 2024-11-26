const express = require('express');
const router = express.Router();
const { getTables, getTable, addTable, updateTable, deleteTable} = require('../controllers/tableController');

router.get('/', getTables);
router.get('/:id', getTable);
router.post('/', addTable);
router.put('/', updateTable);
router.delete('/', deleteTable);

module.exports = router;