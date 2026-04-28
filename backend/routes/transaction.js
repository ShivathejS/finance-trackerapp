const router = require("express").Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

// 🔥 CREATE transaction (all users)
router.post("/", auth, async (req, res) => {
  try {
    const tx = await Transaction.create({
      ...req.body,
      userId: req.user.id // 🔥 attach owner
    });

    res.json(tx);

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🔥 GET transactions (RBAC applied)
router.get("/", auth, async (req, res) => {
  try {
    let txs;

    if (req.user.role === "admin") {
      // 👑 admin sees ALL users
      txs = await Transaction.find();
    } else {
      // 👤 users see only their own
      txs = await Transaction.find({ userId: req.user.id });
    }

    res.json(txs);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 UPDATE transaction
router.put("/:id", auth, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);

    if (!tx) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    // 👤 user can edit only their own
    if (req.user.role !== "admin" && tx.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔥 DELETE transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);

    if (!tx) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    // 👑 admin OR owner
    if (req.user.role !== "admin" && tx.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Access denied" });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ msg: "Transaction deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;