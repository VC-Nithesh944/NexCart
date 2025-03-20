const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db.js");
const session = require('express-session');
require("dotenv").config();
require("./config/passport.js");
const PORT = process.env.PORT || 5000;

const app = express();
const authRoutes = require("./routes/auth.js");

connectDB();

//Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).send("Something went wrong");
});

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

//Routes here
app.use("/auth", authRoutes);

const productRouter = require("./routes/product.js");
app.use("/", productRouter);

const cartRouter = require("./routes/cart.js");
app.use("/", cartRouter);

app.get("/", (req, res) => {
  res.send("Backend is Running!!");
});

app.listen(PORT, () => console.log(`App running on backend ${PORT}`));
