console.log("SERVER STARTING...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// ✅ FIXED CORS (supports all your frontend URLs)
app.use(cors({
  origin: [
    "https://finance-trackerapp-blue.vercel.app",
    "https://finance-trackerapp-shivathejs-projects.vercel.app",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  console.log("Route hit");
  res.send("API is running...");
});

// routes
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