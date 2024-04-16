const express = require('express');
const auth = require('../middlewares/auth');
const productsCtrl = require('../controllers/products');
const router = express.Router();


router.post('/', auth, productsCtrl.addProduct)
router.get('/', productsCtrl.getProducts);
router.get('/:id', productsCtrl.getProduct);
router.delete('/:id', auth, productsCtrl.deleteProduct);
router.put('/:id', auth, productsCtrl.updateProduct);

module.exports = router;