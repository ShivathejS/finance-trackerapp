const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

// CREATE transaction
router.post("/", auth, async (req, res) => {
  try {
    const tx = await Transaction.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(tx);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET only YOUR transactions
router.get("/", auth, async (req, res) => {
  const txs = await Transaction.find({ userId: req.user.id });
  res.json(txs);
});

module.exports = router;