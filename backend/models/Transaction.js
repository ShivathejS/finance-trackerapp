const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  type: { type: String, enum: ["income", "expense"] },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  note: String,
  date: Date
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);