const express = require('express');
const categoryCtrl = require('../controllers/category');
const router = express.Router();


router.post('/', categoryCtrl.addCategory)
router.get('/', categoryCtrl.getCategories);
router.get('/:id', categoryCtrl.getCategory);
router.delete('/:id', categoryCtrl.deleteCategory);
router.put('/:id', categoryCtrl.updateCategory);

module.exports = router;