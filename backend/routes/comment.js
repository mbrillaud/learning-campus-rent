const express = require('express');
const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment');
const router = express.Router();


router.post('/', auth, commentCtrl.addComment)
router.get('/:productId', commentCtrl.getCommentsByProductId);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.put('/:id', auth, commentCtrl.updateComment);

module.exports = router;