const express = require('express');
const categoriesCtrl = require('../controllers/categories');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: New Category
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 */
router.post('/', categoriesCtrl.addCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: A list of categories
 *       '404':
 *         description: Categories not found
 */
router.get('/', categoriesCtrl.getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A single category object
 *       '404':
 *         description: Category not found
 */
router.get('/:id', categoriesCtrl.getCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No content
 *       '404':
 *         description: Category not found
 */
router.delete('/:id', categoriesCtrl.deleteCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
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
 *             example:
 *               name: Updated Category
 *     responses:
 *       '200':
 *         description: A successful response
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Category not found
 */
router.put('/:id', categoriesCtrl.updateCategory);

module.exports = router;
