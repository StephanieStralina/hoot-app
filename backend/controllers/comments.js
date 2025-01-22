const express = require("express");
const Hoot = require('../models/hoot');

module.exports = {
  create,
  index,
  update,
  deleteComment
};

async function create(req, res) {
    try {
        req.body.author = req.user._id;
        const hoot = await Hoot.findById(req.params.hootId);
        hoot.comments.push(req.body);
        await hoot.save();

        const newComment = hoot.comments[hoot.comments.length - 1];
        newComment._doc.author = req.user;

        res.status(201).json(newComment);
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
}

async function index(req, res) {
    try {
        const hoot = await Hoot.findById(req.params.hootId). populate([
            'author',
            'comments.author',
        ]);
        res.status(200).json(hoot);
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
}

async function update(req, res) {
    try {
        const hoot = await Hoot.findById(req.params.hootId);
        const comment = hoot.comments.id(req.params.commentId);

        if (comment.author.toString() !== req.user._id) {
            return res.status(403)
            .json({ message: "You are not authorized to do this! >:["});
        }

        comment.text = req.body.text;
        await hoot.save();
        res.status(200).json({ message: "Comment updated successfully "});
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
}

async function deleteComment(req, res) {
    try {
        const hoot = await Hoot.findById(req.params.hootId);
        const comment = hoot.comments.id(req.params.commentId);
        
        if (comment.author.toString() !== req.user._id) {
            return res
              .status(403)
              .json({ message: "You're not authorized to do that! >:["});
          }
      
          hoot.comments.remove({ _id: req.params.commentId });
          await hoot.save();
          res.status(200).json({ message: "Comment succesfully deleted"})
    } catch (e) {
        res.status(500).json({ e: e.message });
    }
}