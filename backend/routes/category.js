const router = require("express").Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth");


// ✅ GET all categories (everyone logged in can access)
router.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔥 CREATE category (ADMIN ONLY)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create categories" });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }

    const category = new Category({ name });

    await category.save();
    res.json(category);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔥 UPDATE category (ADMIN ONLY)
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can update categories" });
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔥 DELETE category (ADMIN ONLY)
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete categories" });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ msg: "Category deleted" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;