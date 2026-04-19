const express = require("express");
const userRoutes = require("./routes/userRoute");
const bookRoutes = require("./routes/bookRoute");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/courts", bookRoutes);
module.exports = app;
