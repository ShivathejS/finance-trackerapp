console.log("SERVER STARTING...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
//g7zVP4KNazArihHa  tejj69_db_user  mongodb+srv://tejj69_db_user:g7zVP4KNazArihHa@cluster0.9da6efr.mongodb.net/?appName=Cluster0

app.get("/", (req, res) => {
  console.log("Route hit");
  res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/transactions", require("./routes/transaction"));
//const test = require("./routes/auth");
//console.log(test);
//app.use("/api/auth", test);