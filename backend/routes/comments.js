const express = require('express');
const auth = require('../middlewares/auth');
const commentsCtrl = require('../controllers/comments');
const router = express.Router();


router.post('/', auth, commentsCtrl.addComment)
router.get('/:productId', commentsCtrl.getCommentsByProductId);
router.delete('/:id', auth, commentsCtrl.deleteComment);
router.put('/:id', auth, commentsCtrl.updateComment);

module.exports = router;