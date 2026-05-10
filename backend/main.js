const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");



const authRoute = require("./routes/AuthRoute");
const categoryRoute= require('./routes/categoryRoute');
const productRoute = require("./routes/productRoute")

const app = express();

// env
const PORT = process.env.PORT || 4000;
const dbURL = process.env.MONGO_URL;

// middleware
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true,                // allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


// routes
app.use("/user", authRoute);
app.use("/category",categoryRoute);
app.use("/product",productRoute)

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
