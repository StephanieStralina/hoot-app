const Post = require('../models/post');

module.exports = {
  create
};

async function create(req, res) {
  try {
    req.body.user = req.user._id;
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create Post Failed' });
  }
}