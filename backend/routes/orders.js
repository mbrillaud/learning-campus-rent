const express = require('express');
const auth = require('../middlewares/auth');
const ordersCtrl = require('../controllers/orders');
const router = express.Router();

router.post('/', auth, ordersCtrl.addOrder);
router.get('/:id', auth, ordersCtrl.getOrder);
router.get('/product/:productId', ordersCtrl.getOrdersByProductId);
router.get('/user/:userId', ordersCtrl.getOrderByUserId);
router.put('/:id', auth, ordersCtrl.updateOrder);
router.delete('/:id', auth, ordersCtrl.deleteOrder);

module.exports = router;