const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["income", "expense"] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);