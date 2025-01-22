const express = require("express");
const Hoot = require('../models/hoot');

module.exports = {
  create,
  index,
  show,
  update,
  deleteHoot
};

async function index(req, res) {
  const hoots = await Hoot.find({}).populate('author').sort({ createdAt: "desc" });
  res.status(200).json(hoots);
}

async function create(req, res) {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    hoot._doc.author = req.user;
    res.status(201).json(hoot);
  } catch (e) {
    console.log(e)
    res.status(400).json({ message: 'Create Hoot Failed' });
  }
}

async function show(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate('author');
    res.status(200).json(hoot);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
}

async function update(req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that! >:[ ")
    };

    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );

    updatedHoot._doc.author = req.user;
    res.status(200).json(updatedHoot);
  } catch (e) {
    console.log(e);
    res.status.json({ e: e.message })
  }
}

async function deleteHoot (req, res) {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.status(200).json(deletedHoot);
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e.message });
  }
}