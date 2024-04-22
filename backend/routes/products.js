const express = require('express');
const auth = require('../middlewares/auth');
const productsCtrl = require('../controllers/products');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *             example:
 *               name: New Product
 *               price: 20.99
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */
router.post('/', auth, productsCtrl.addProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *       '404':
 *         description: Products not found
 */
router.get('/', productsCtrl.getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single product object
 *       '404':
 *         description: Product not found
 */
router.get('/:id', productsCtrl.getProduct);

/**
 * @swagger
 * /api/products/categories/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to filter products
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of products belonging to the specified category
 *       '404':
 *         description: No products found for the specified category
 */

router.get('/categories/:categoryId', productsCtrl.getProductsByCategory);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No content
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Product not found
 */
router.delete('/:id', auth, productsCtrl.deleteProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *             example:
 *               name: Updated Product
 *               price: 25.99
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Product not found
 */
router.put('/:id', auth, productsCtrl.updateProduct);

module.exports = router;
