const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// All paths start with '/api/hoots/:hootId/comments'

// POST /api/hoots/:hootId/comments create functionality
router.post('/:hootId/comments', commentsCtrl.create);

// GET /api/hoots/:hootId index functionality
router.get('/:hootId', commentsCtrl.index);

// PUT /api/hoots/:hootId/comments/:commentId update functionality
router.put('/:hootId/comments/:commentId', commentsCtrl.update);

// DELETE /api/hoots/:hootId/comments/:commentId update functionality
router.delete('/:hootId/comments/:commentId', commentsCtrl.deleteComment);



module.exports = router;