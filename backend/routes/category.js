const router = require("express").Router();
const Category = require("../models/Category");

const auth = require("../middleware/auth");
const role = require("../middleware/role");

// CREATE CATEGORY (ADMIN ONLY)
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CATEGORIES (ALL LOGGED USERS)
router.get("/", auth, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

module.exports = router;