const express = require('express');
const auth = require('../middlewares/auth');
const commentsCtrl = require('../controllers/comments');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               posterId:
 *                 type: string
 *               comment:
 *                 type: string
 *             example:
 *               productId: "product_id"
 *               posterId: "poster_id"
 *               comment: "This is a comment"
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */

router.post('/', auth, commentsCtrl.addComment);

/**
 * @swagger
 * /api/comments/{productId}:
 *   get:
 *     summary: Get comments by product ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to get comments for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of comments
 *       '404':
 *         description: Comments not found
 */
router.get('/:productId', commentsCtrl.getCommentsByProductId);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No content
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Comment not found
 */
router.delete('/:id', auth, commentsCtrl.deleteComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             example:
 *               content: "Updated comment"
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Comment not found
 */
router.put('/:id', auth, commentsCtrl.updateComment);

module.exports = router;
