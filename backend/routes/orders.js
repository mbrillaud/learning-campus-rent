const express = require('express');
const auth = require('../middlewares/auth');
const ordersCtrl = require('../controllers/orders');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         type: string
 *         required: true
 *         description: Bearer token for authentication
 *       - in: body
 *         name: order
 *         description: The order object to add
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Order'
 *     responses:
 *       200:
 *         description: Order saved
 *       400:
 *         description: Bad request
 */
router.post('/', auth, ordersCtrl.addOrder);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the order to get
 *     responses:
 *       200:
 *         description: A single order object
 *         schema:
 *           $ref: '#/definitions/Order'
 *       404:
 *         description: Order not found
 */
router.get('/:id', auth, ordersCtrl.getOrder);

/**
 * @swagger
 * /orders/product/{productId}:
 *   get:
 *     summary: Get orders by product ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: productId
 *         type: string
 *         required: true
 *         description: ID of the product to get orders for
 *     responses:
 *       200:
 *         description: An array of orders
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Order'
 *       404:
 *         description: Orders not found
 */
router.get('/product/:productId', ordersCtrl.getOrdersByProductId);

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: string
 *         required: true
 *         description: ID of the user to get orders for
 *     responses:
 *       200:
 *         description: An array of orders
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Order'
 *       404:
 *         description: Orders not found
 */
router.get('/user/:userId', auth, ordersCtrl.getOrderByUserId);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the order to update
 *       - in: body
 *         name: order
 *         description: The order object to update
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Order'
 *     responses:
 *       200:
 *         description: Order updated
 *       400:
 *         description: Bad request
 */
router.put('/:id', auth, ordersCtrl.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete('/:id', auth, ordersCtrl.deleteOrder);

module.exports = router;
