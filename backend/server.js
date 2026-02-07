const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/api", taskRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
