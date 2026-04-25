const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth");

// GET all categories
router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// CREATE category
router.post("/", auth, async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 debug

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }

    const category = new Category({ name });
    await category.save();

    res.json(category);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;