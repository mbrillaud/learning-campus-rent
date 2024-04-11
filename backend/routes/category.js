const express = require('express');
const auth = require('../middlewares/auth');
const categoryCtrl = require('../controllers/category');
const router = express.Router();


router.post('/', categoryCtrl.addCategory)
router.get('/', auth, categoryCtrl.getCategories);
router.get('/:id', categoryCtrl.getCategory);
router.delete('/:id', categoryCtrl.deleteCategory);
router.put('/:id', categoryCtrl.updateCategory);

module.exports = router;