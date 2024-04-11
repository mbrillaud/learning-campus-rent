const express = require('express');
const auth = require('../middlewares/auth');
const productCtrl = require('../controllers/product');
const router = express.Router();


router.post('/', auth, productCtrl.addProduct)
router.get('/', productCtrl.getProducts);
router.get('/:id', productCtrl.getProduct);
router.delete('/:id', auth, productCtrl.deleteProduct);
router.put('/:id', auth, productCtrl.updateProduct);

module.exports = router;