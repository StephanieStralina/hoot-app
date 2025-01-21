const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

// All paths start with '/api/posts'

// POST /api/posts
router.post('/', postsCtrl.create);
// // POST /api/auth/login
// router.post('/login', authCtrl.logIn);

module.exports = router;