const express = require('express');
const router = express.Router();
const hootsCtrl = require('../controllers/hoots');

// All paths start with '/api/hoots'

// POST /api/hoots create functionality
router.post('/', hootsCtrl.create);

// GET /api/hoots index functionality
router.get('/', hootsCtrl.index);

// GET /api/hoots/:hootId show functionality
router.get('/:hootId', hootsCtrl.show);

// GET /api/hoots/:hootId update functionality
router.put('/:hootId', hootsCtrl.update);

// GET /api/hoots/:hootId delete functionality
router.delete('/:hootId', hootsCtrl.deleteHoot);

//router.use('/:hootId/comments', require('./comments'));

module.exports = router;