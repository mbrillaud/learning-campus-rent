const express = require('express');
const categoriesCtrl = require('../controllers/categories');
const router = express.Router();

router.post('/', categoriesCtrl.addCategory)
router.get('/', categoriesCtrl.getCategories);
router.get('/:id', categoriesCtrl.getCategory);
router.delete('/:id', categoriesCtrl.deleteCategory);
router.put('/:id', categoriesCtrl.updateCategory);

module.exports = router;