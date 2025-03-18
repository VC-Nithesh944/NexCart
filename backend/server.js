const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

//Middleware

const app = express();
app.use(cors());
app.use(express.json());

//Routes here

app.get("/", (req, res) => {
    res.send("Backend is Running!!");
})



app.listen( PORT , () => console.log(`App running on backend ${PORT}`));