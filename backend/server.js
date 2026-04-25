//g7zVP4KNazArihHa  tejj69_db_user  mongodb+srv://tejj69_db_user:g7zVP4KNazArihHa@cluster0.9da6efr.mongodb.net/?appName=Cluster0
//finance_app_secure_2026_secret

console.log("SERVER STARTING...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  console.log("Route hit");
  res.send("API is running...");
});

// routes (IMPORTANT: before listen)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/transactions", require("./routes/transaction"));

// database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌:", err));

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});